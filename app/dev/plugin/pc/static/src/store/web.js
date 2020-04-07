define(["nav"], function(nav) {
	"use strict";

	var web = {
		state: function state() {
			var n = Object.assign({}, nav);
			delete n.routes;
			return {
				config: [],
				nav_cache: [{
					title: "首页",
					name: "index",
					url: "/",
				}],
				nav: n,
				lang_now: "",
				lang: []
			};
		},
		mutations: {
			set_web: function set_web(state, obj) {
				$.push(state, obj, true);
			},
			set_config: function set_config(state, arr) {
				state.config.clear();
				state.config.addList(arr);
			},
			set_nav: function set_nav(state, obj) {
				$.push(state.nav, obj, true);
			},
			set_nav_cache: function set_nav_cache(state, o) {
				var list = state.nav_cache;
				var has = false;
				for (var i = 0; i < list.length; i++) {
					if (list[i].name === o.name) {
						list[i] = o;
						has = true;
						break;
					}
				}
				if (!has) {
					list.push(o);
				}
			},
			del_nav_cache: function del_nav_cache(state, o) {
				var list = state.nav_cache;
				for (var i = 0; i < list.length; i++) {
					if (list[i].name === o.name) {
						list.splice(i, 1);
						break;
					}
				}
			}
		}
	};
	return web;
});
