define(["Vue", "vuex", "./store/user", "./store/web"], function(Vue, vuex, user, web) {
	"use strict";

	Vue.use(vuex);
	var store = {
		modules: {
			user: user,
			web: web
		},
		// 严格模式，生产时改为false，避免性能损失
		strict: true
	};
	return new vuex.Store(store);
});
