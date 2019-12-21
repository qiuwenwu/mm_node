define(function() {
	"use strict";

	return {
		state: function state() {
			return {
				"token": "",
				"username": "",
				"referee_id": 0,
				"vip": 0,
				"gm": 0,
				"mc": 0,
				"phone": "",
				"phone_state": 0,
				"email": "",
				"email_state": 0,
				"login_ip": "",
				"login_time": "",
				"user_group": "",
				"user_admin": "",
				"signature": "",
				"nickname": "",
				"avatar": "/img/avatar.png",
				"invite_code": "",
				"friends": "",
				"state": 0
			};
		},
		mutations: {
			set_user: function set_user(state, obj) {
				$.push(state, obj);
			},
			login: function login(state, token) {
				state.token = token;
				$.db.set("token", token, 120);
			},
			logout: function logout(state) {
				$.obj.clear(state);
				$.db.del("token");
			}
		}
	};
});
