define(["Vue", "VueRouter"], function(Vue, VueRouter) {
	"use strict";

	Vue.use(VueRouter);
	var routePath = "/dev";
	var filePath = "/dev";
	var routes = [{
		path: "/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/index.vue"], resolve);
		}
	}, {
		path: "/app/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/app/index.vue"], resolve);
		}
	}, {
		path: "/plugin/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/plugin/index.vue"], resolve);
		}
	}, {
		path: "/event/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/event/index.vue"], resolve);
		}
	}, {
		path: "/api/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/api/index.vue"], resolve);
		}
	}, {
		path: "/api/param/",
		meta: {
			requiresAuth: false,
			index: 2
		},
		component: function component(resolve) {
			return require(["vue!./pages/api/param.vue"], resolve);
		}
	}, {
		path: "/source/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/source/index.vue"], resolve);
		}
	}, {
		path: "/db/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/db/index.vue"], resolve);
		}
	}, {
		path: "/view/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/view/index.vue"], resolve);
		}
	}, {
		path: "/cmd/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function component(resolve) {
			return require(["vue!./pages/cmd/index.vue"], resolve);
		}
	}, {
		path: "/404",
		component: function component(resolve) {
			return require(["vue!./pages/err404.vue"], resolve);
		}
	}, {
		path: "*",
		redirect: "/404"
	}];
	
	var router = new VueRouter({
		mode: "history",
		base: routePath,
		hashbang: true,
		history: false,
		saveScrollPosition: true,
		transitionOnLoad: true,
		routes: routes
	});
	
	VueRouter.prototype.goBack = function() {
		this.isBack = true;
		window.history.go(-1);
	};
	
	router.beforeEach(function(to, from, next) {
		if (to.meta) {
			var token = $.db.get("token");
			if (to.meta.requiresAuth && !token) {
				$.url_back = to.path + "?" + $.toUrl(to.query);
				next("/login");
				return;
			}
		}
		$.route.history.push(from.path + "?" + $.toUrl(from.query));
		next();
	});
	return router;
});
