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

const menu = {}

menu.install  = function (Vue, options) {
	if (menu.installed)
		return;

	Vue.prototype.$loadMenu = function(username, password) {
		return new Promise(function(resolve, reject) {
			ubus.call('vuci.ui', 'menu', {}).then((r) => {
				if (r && r.menu) {
					resolve(_toChildArray(_toChildTree(r.menu)));
				}
			});
		});
	}

	menu.installed = true;
}

export default menu