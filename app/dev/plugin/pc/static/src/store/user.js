define(function() {
	"use strict";

	return {
		state: function state() {
			return {
				username: "",
				avatar: "<i class=\"fa fa-user\"></i>",
				name: "",
				nickName: "",
				gm: 0,
				vip: 0,
				token: "",
				level: 1,
				user_id: 0,
				state: 0
			};
		},
		mutations: {
			set_user: function set_user(state, obj) {
				$.push(state, obj);
			},
			login: function login(state, token) {
				$.db.set("token", token, 120);
			},
			logout: function logout(state, data) {
				$.clear(state);
				$.db.del("token");
			}
		}
	};
});
