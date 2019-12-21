define(function() {
	"use strict";

	return {
		state: function state() {
			return {
				lang_now: "zh",
				lang: [],
				nav: {
					top: [{
						title: "应用",
						name: "app",
						url: "/app",
						message: 0
					}, {
						title: "事件",
						name: "event",
						url: "/event",
						message: 0
					}, {
						title: "接口",
						name: "api",
						url: "/api",
						message: 0
					}, {
						title: "素材",
						name: "source",
						url: "/source",
						message: 0
					}, {
						title: "数据库",
						name: "db",
						url: "/db",
						message: 0
					}, {
						title: "控制台",
						name: "cmd",
						url: "/cmd",
						message: 0
					}],
					side: [],
					bottom: [{
						title: "加入我们",
						name: "support",
						url: "http://dev.elins.cn/",
						message: 0
					}],
					float: []
				},
				diy: {
					head_left: [],
					foot_left: [],
					foot_right: []
				}
			};
		},
		mutations: {
			set_config: function set_config(state, obj) {
				$.push(state, obj);
			},
			set_lang: function set_lang(state, arr) {
				state.lang.clear();
				$.push(state.lang, arr);
			},
			set_nav: function set_nav(state, obj) {
				$.push(state.nav, obj);
			}
		}
	};
});
