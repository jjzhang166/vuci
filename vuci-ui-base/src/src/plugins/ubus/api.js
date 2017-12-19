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
let _ubus_rpc_session = '00000000000000000000000000000000';
let _requests = [];

function _call_cb(msg) {
	/* fetch related request info */
	let req = _requests[msg.id];
	if (typeof(req) != 'object')
		throw 'No related request for JSON response';

	let ret;
	/* verify message frame */
	if (typeof(msg) == 'object' && msg.jsonrpc == '2.0') {
		if (Array.isArray(msg.result) && msg.result[0] == 0)
			ret = (msg.result.length > 1) ? msg.result[1] : msg.result[0];
	}

	/* delete request object */
	delete _requests[msg.id];

	return new Promise(function(resolve, reject) {
		resolve(ret);
	});
}

function call(object, method, params) {
	console.log('ubus call:' + object + ' ' + method + ' ' + JSON.stringify(params));

	/* store request info */
	let req = _requests[_jsonrpc_id] = { };

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

function login(username, password) {
	return new Promise(function(resolve, reject) {
		call('session', 'login', {username, password}).then((r) => {

			console.log('login:' + JSON.stringify(r));
			if (r && r.ubus_rpc_session) {
				_ubus_rpc_session = r.ubus_rpc_session;
				sessionStorage.setItem("session", _ubus_rpc_session);
				resolve(true);
			}
		});
	});
}

export {call, login}