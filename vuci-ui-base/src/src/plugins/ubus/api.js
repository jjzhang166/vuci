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

	if (sessionStorage.getItem('session'))
		_ubus_rpc_session = sessionStorage.getItem('session');

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

/**
 * Returns a new transforms menu definition from the flat path like object returned by ubus vuci.ui to a tree like structure
 * with subnodes in a 'childs' property, for further transformation to ordered array children
 *
 * @param menu
 */
function _toChildTree(menu) {
	const root = { title: 'root', index: 0, childs: {} };
	let node;

	if (!menu) return root;

	for (const key in menu) {
		if (menu.hasOwnProperty(key)) {
			const path = key.split(/\//);
			node = root;

			for (let i = 0; i < path.length; i++) {
			if (!node.childs)
				node.childs = {};

			if (!node.childs[path[i]])
				node.childs[path[i]] = {path: '/' + path.slice(0, i + 1).join('/')};
				node = node.childs[path[i]];
			}

			Object.assign(node, menu[key]);
			if (!node.title) node.title = node.path;
		}
	}

	return root;
}

/**
 * Transforms the node definition from child as objects to childs as array, mutating the original menu definition
 * Children are sorted according the 'index' property
 * @param node
 */
function _toChildArray(node) {
    const childs = [];

    if (!node.childs)
        return node;

    for (const key in node.childs) {
        if (node.childs.hasOwnProperty(key)) {
            _toChildArray(node.childs[key]);
            childs.push(node.childs[key]);
        }
    }

    childs.sort((a, b) => (a.index || 0) - (b.index || 0));

    if (childs.length) {
        node.childs = childs;
    } else {
        delete node.childs;
    }

    return node;
}

function fetch_menus(v) {
	return new Promise(function(resolve, reject) {
		call('vuci.ui', 'menu', {}).then((r) => {

			console.log('fetch_menus:' + JSON.stringify(r));

			if (r && r.menu) {
				resolve(_toChildArray(_toChildTree(r.menu)));
			} else {
				v.$router.push('/login');
			}
		});
	});
}

export {call, login, fetch_menus}