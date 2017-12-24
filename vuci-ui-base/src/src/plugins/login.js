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

import * as ubus from './ubus.js'

const login = {}

login.install  = function (Vue, options) {
	if (login.installed)
		return;

	Vue.prototype.$login = function(username, password) {
		return new Promise(function(resolve, reject) {
			ubus.call('session', 'login', {username, password}).then((r) => {
				if (r && r.ubus_rpc_session) {
					sessionStorage.setItem("_ubus_rpc_session", r.ubus_rpc_session);
					resolve(r);
				}
			});
		});
	}

	login.installed = true;
}

export default login