export default {
	state: function() {
		return {
			config: [],
			bottom: [],
			desktop: [],
			left: [],
			main: [],
			quick: [],
			right: []
		}
	},
	mutations: {
		set(state, data) {
			$.push(state, data);
		},
		req(state, data) {

		}
	},
	actions: {},
	getters: {}
};
