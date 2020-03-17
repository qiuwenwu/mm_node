define(["Vue", "VueRouter", "mm_sdk", "nav"], function(Vue, VueRouter, mm_sdk, nav) {
	"use strict";

	Vue.use(VueRouter);
	var routePath = "/admin";
	var filePath = "/admin";
	var routes = [{
		path: "/",
		component: function component(resolve) {
			return require(["vue!./pages/index.vue"], resolve);
		}
	}, {
		path: "/not_power",
		component: function component(resolve) {
			return require(["vue!./pages/not_power.vue"], resolve);
		}
	}, {
		path: "/404",
		component: function component(resolve) {
			return require(["vue!./pages/404.vue"], resolve);
		}
	}, {
		path: "*",
		redirect: "/404"
	}];

	function new_route(o, com) {
		var obj = Object.assign({}, o);
		obj.component = function(resolve) {
			return require(["vue!" + com], resolve);
		};
		return obj;
	}
	var lt = nav.routes;
	for (var i = 0; i < lt.length; i++) {
		var o = lt[i];
		var com = o.component;
		if (com) {
			var obj = new_route(o, com);
			routes.push(obj);
		} else if (o.redirect) {
			routes.push(o);
		}
	}

	var router = new VueRouter({
		mode: "history",
		base: routePath,
		hashbang: true,
		history: false,
		saveScrollPosition: true,
		transitionOnLoad: true,
		routes: routes
	});

	VueRouter.prototype.goBack = function(url) {
		this.isBack = true;
		if (window.history.length > 1) {
			window.history.go(-1);
		} else if (url) {
			this.push(url);
		}
	};

	router.beforeEach(function(to, from, next) {
		if (to.oauth) {
			var token = $.db.get("token");
			if (to.oauth.signIn && !token) {
				$.url_back = to.path + "?" + $.toUrl(to.query);
				next("/login");
				return;
			}
		}
		next();
	});
	return router;
});
