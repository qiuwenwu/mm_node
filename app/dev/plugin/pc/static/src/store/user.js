export default {
	state: function() {
		return {
			username: '',
			avatar: '<i class="fa fa-user"></i>',
			name: '',
			nickName: '',
			gm: 0,
			vip: 0,
			token: "",
			level: 1,
			user_id: 0,
			state: 0
		}
	},
	mutations: {
		set_user(state, obj) {
			$.push(state, obj);
		},
		login(state, token) {
			$.db.set("token", token, 120);
		},
		logout(state, data) {
			$.clear(state);
			$.db.del("token");
		}
	},
	actions: {},
	getters: {}
};
