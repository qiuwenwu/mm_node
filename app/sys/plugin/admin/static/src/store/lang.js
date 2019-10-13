export default {
	state: function() {
		return {
			now: "zh",
			zh: [],
			en: []
		}
	},
	mutations: {
		set(state, data) {
			$.push(state, data);
		}
	},
	actions: {},
	getters: {}
};
