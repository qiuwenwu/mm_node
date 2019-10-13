export default {
	state: function() {
		return {
			username: 'qiuwenwu',
			avatar: '<i class="fa fa-user"></i>',
			name: '邱文武',
			nickName: '邱文武',
			gm: 0,
			vip: 0,
			token: "123456",
			level: 1,
			user_id: 0,
			state: 0
		}
	},
	mutations: {
		set(state, data) {
			$.push(state, data);
		},
		login(state, data) {
			$.db.set("token", data.token, 120);
		},
		logout(state, data) {
			$.obj.clear(state);
			$.db.del("token");
		}
	},
	actions: {},
	getters: {}
};
