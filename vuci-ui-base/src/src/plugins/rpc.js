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

var rpc = {
	_id: 1,
	sid: '00000000000000000000000000000000',
	_requests: { },

	_call_cb: function(msg) {
		var data = [ ];
		var type = Object.prototype.toString;
		
		var _rpc = this;

		/* fetch related request info */
		var req = _rpc._requests[msg.id];
		if (typeof(req) != 'object')
			throw 'No related request for JSON response';

		/* fetch response attribute and verify returned type */
		var ret = undefined;

		/* verify message frame */
		if (typeof(msg) == 'object' && msg.jsonrpc == '2.0') {
			if (Array.isArray(msg.result) && msg.result[0] == 0)
				ret = (msg.result.length > 1) ? msg.result[1] : msg.result[0];
		}

		if (req.expect) {
			for (var key in req.expect) {
				if (typeof(ret) != 'undefined' && key != '')
					ret = ret[key];

				if (typeof(ret) == 'undefined' || type.call(ret) != type.call(req.expect[key]))
					ret = req.expect[key];

				break;
			}
		}

		/* apply filter */
		if (typeof(req.filter) == 'function') {
			req.priv[0] = ret;
			req.priv[1] = req.params;
			ret = req.filter.apply(_rpc, req.priv);
		}

		/* store response data */
		if (typeof(req.index) == 'number')
			data[req.index] = ret;
		else
			data = ret;

		/* delete request object */
		delete _rpc._requests[msg.id];

		return new Promise(function(resolve, reject) {
			resolve(data);
		});
	},

	declare: function(options) {
		var _rpc = this;

		return function() {
			/* build parameter object */
			var p_off = 0;
			var params = { };
			if (Array.isArray(options.params)) {
				for (p_off = 0; p_off < options.params.length; p_off++) {
					params[options.params[p_off]] = arguments[p_off];
				}
			}

			/* all remaining arguments are private args */
			var priv = [ undefined, undefined ];
			for (; p_off < arguments.length; p_off++) {
				priv.push(arguments[p_off]);
			}

			/* store request info */
			var req = _rpc._requests[_rpc._id] = {
				expect: options.expect,
				filter: options.filter,
				params: params,
				priv:   priv
			};

			/* build message object */
			var msg = {
				jsonrpc: '2.0',
				id:      _rpc._id++,
				method:  'call',
				params:  [
					_rpc.sid,
					options.object,
					options.method,
					params
				]
			};

			/* request */
			return axios.post('/ubus', msg).then(function(r) {
				return _rpc._call_cb(r.data);
			}).catch(function(r) {
				return _rpc._call_cb(r.data);
			});
		};
	}
}

export default rpc