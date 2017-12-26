/*
 * Copyright (C) 2017  Jianhui Zhao <jianhuizhao329@gmail.com>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios'

let _jsonrpc_id = 1;
let _requests = [];

let ubus_msg_status = {
	[0]: 'Success',
	[1]: 'Invalid command',
	[2]: 'Invalid argument',
	[3]: 'Method not found',
	[4]: 'Not found',
	[5]: 'No response',
	[6]: 'Permission denied',
	[7]: 'Request timed out',
	[8]: 'Operation not supported',
	[9]: 'Unknown error',
	[10]: 'Connection failed'
}

function _call_cb(msgs, resolve, reject) {
	if (!Array.isArray(msgs))
		msgs = [ msgs ];

	let data = [ ];

	for (let i = 0; i < msgs.length; i++) {
		let msg = msgs[i];
		if (typeof(msg) != 'object' || msg.jsonrpc != '2.0')
			throw 'ubus call error: Invalid msg';

		if (typeof(_requests[msg.id]) != 'object')
			throw 'No related request for JSON response';
		delete _requests[msg.id];

		let result = msg.result;
		if (!result || !Array.isArray(result) || result.length < 1)
			throw `ubus call error: ${JSON.stringify(msg.error) || 'unknown'}`

		if (result[0] == 0) {
			data.push((result.length > 1) ? result[1] : result[0]);
		} else {
			let error = {code: result[0], message: ubus_msg_status[result[0]] || ''};
			if (result[0] == 6) {
				sessionStorage.removeItem('_ubus_rpc_session');
				reject(error);
			} else {
				throw `ubus call error: ${JSON.stringify(error)}`
			}
			return;
		}
	}

	resolve(data);
}

function _call(batchs) {
	if (!Array.isArray(batchs))
		throw 'The parameter must be an array';

	let msgs = [];

	batchs.forEach((b) => {
		/* store request info */
		_requests[_jsonrpc_id] = {};
		
		/* build message object */
		let msg = {
			jsonrpc: '2.0',
			id: _jsonrpc_id++,
			method: 'call',
			params: [
				sessionStorage.getItem('_ubus_rpc_session') || '00000000000000000000000000000000',
				b.object,
				b.method,
				b.params || {}
			]
		};
		
		msgs.push(msg);
	});

	return new Promise(function(resolve, reject) {
		axios.post('/ubus', msgs).then((r) => {
			_call_cb(r.data, resolve, reject);
		});
	});
}

export function call(object, method, params) {
	return _call([{object, method, params}]);
}

export function call_batch(batchs) {
	return _call(batchs);
}

const ubus = {}

ubus.install  = function (Vue, options) {
	if (ubus.installed)
		return;

	Vue.prototype.$ubus = {
		call: call,
		call_batch: call_batch
	}

	ubus.installed = true;
}

export default ubus