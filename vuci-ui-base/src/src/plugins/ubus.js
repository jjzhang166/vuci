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

function _call_cb(msgs) {

	if (!Array.isArray(msgs)) {
		msgs = [ msgs ];
	}

	let data = [ ];

	msgs.forEach((msg) => {
		if (typeof(_requests[msg.id]) != 'object')
			throw 'No related request for JSON response';
		delete _requests[msg.id];

		let ret;
		/* verify message frame */
		if (typeof(msg) == 'object' && msg.jsonrpc == '2.0') {
			if (Array.isArray(msg.result) && msg.result[0] == 0)
				ret = (msg.result.length > 1) ? msg.result[1] : msg.result[0];
		}

		data.push(ret);
	});

	return new Promise(function(resolve, reject) {
		resolve(data);
	});
}

export function call(object, method, params) {
	console.log('ubus call:' + object + ' ' + method + ' ' + JSON.stringify(params));

	/* store request info */
	_requests[_jsonrpc_id] = {};
	let _ubus_rpc_session = sessionStorage.getItem('_ubus_rpc_session');

	if (_ubus_rpc_session == 'undefined' || _ubus_rpc_session == null)
		_ubus_rpc_session = '00000000000000000000000000000000';

	/* build message object */
	let msg = {
		jsonrpc: '2.0',
		id:      _jsonrpc_id++,
		method:  'call',
		params:  [
			_ubus_rpc_session,
			object,
			method,
			params
		]
	};

	return axios.post('/ubus', msg).then((r) => {
		return _call_cb(r.data);
	}).catch((r) => {
		return _call_cb(r.data);
	});
}

export function call_batch(batchs) {
	if (!Array.isArray(batchs))
		throw 'The parameter must be an array';

	let _ubus_rpc_session = sessionStorage.getItem('_ubus_rpc_session');
	if (_ubus_rpc_session == 'undefined' || _ubus_rpc_session == null)
		_ubus_rpc_session = '00000000000000000000000000000000';

	let reqs = [];

	let msgs = [];

	batchs.forEach((b) => {
		/* store request info */
		_requests[_jsonrpc_id] = {};
		
		/* build message object */
		let msg = {
			jsonrpc: '2.0',
			id:      _jsonrpc_id++,
			method:  'call',
			params:  [
				_ubus_rpc_session,
				b.object,
				b.method,
				b.params
			]
		};
		
		msgs.push(msg);
	});

	return axios.post('/ubus', msgs).then((r) => {
		return _call_cb(r.data);
	}).catch((r) => {
		return _call_cb(r.data);
	});
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