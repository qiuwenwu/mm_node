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
				if(obj.token){
					$.db.set("token", obj.token, 120);
				}
				$.push(state, obj);
			},
			sign_in: function sign_in(state, token) {
				state.token = token;
				$.db.set("token", token, 120);
			},
			sign_out: function sign_out(state) {
				$.clear(state);
				$.db.del("token");
			}
		}
	};
});
