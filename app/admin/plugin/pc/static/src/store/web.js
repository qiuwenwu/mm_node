define(["nav"], function(nav) {
	"use strict";

	var web = {
		state: function state() {
			var n = Object.assign({}, nav);
			delete n.routes;
			return {
				config: [],
				nav: Object.assign({
					cache: [{
						title: "首页",
						name: "index",
						url: "/"
					}]
				}, n),
				lang_now: "",
				lang: []
			};
		},
		mutations: {
			set_web: function set_web(state, obj) {
				$.push(state, obj);
			},
			set_config: function set_config(state, arr) {
				state.config.clear();
				state.config.addList(arr);
			},
			set_nav: function set_nav(state, obj) {
				$.push(state.nav, obj);
			},
			set_nav_cache: function set_nav_cache(state, o) {
				var list = state.nav.cache;
				var bl = list.has({
					url: o.url
				});
				if (!bl) {
					list.push(o);
				}
			},
			del_nav_cache: function del_nav_cache(state, o) {
				var list = state.nav.cache;
				list.del({
					url: o.url
				});
			}
		}
	};
	return web;
});
