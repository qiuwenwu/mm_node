define(["Vue", "vuex"], function(Vue, vuex) {
	"use strict";

	Vue.use(vuex);
	var store = {
		state: {
			host: "/"
		},
		strict: true
	};
	return new vuex.Store(store);
});
