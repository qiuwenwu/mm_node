define(["Vue", "vuex", "./store/user", "./store/web"], function(Vue, vuex, user, web) {
	"use strict";

	Vue.use(vuex);
	var store = {
		state: {
			host: "/"
		},
		modules: {
			user: user,
			web: web
		},
		strict: true
	};
	return new vuex.Store(store);
});
