export default {
	state: function() {
		return {
			token: "123456",

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
