import nav from 'nav';

var web = {
	state: function() {
		var n = Object.assign({}, nav);
		delete n.routes;
		return {
			config: [],
			nav: n,
			lang_now: "",
			lang: []
			// nav: {
			// 	top: [],
			// 	right: [],
			// 	bottom: [],
			// 	left: [],
			// 	desktop: [],
			// 	quick: [],
			// 	main: []
			// }
		}
	},
	mutations: {
		set(state, data) {
			$.push(state, data);
		}
	},
	actions: {},
	getters: {}
}

export default web;

