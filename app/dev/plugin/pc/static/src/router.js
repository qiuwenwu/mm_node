define(["Vue", "VueRouter", "mm_sdk", "nav"], function(Vue, VueRouter, mm_sdk, nav) {
	"use strict";

	Vue.use(VueRouter);
	var routes = [{
		path: "/",
		component: function component(resolve) {
			return require(["vue!./pages/index.vue"], resolve);
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
	var len = lt.length;
	for (var i = 0; i < len; i++) {
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
		base: "/dev",
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
		var path = to.path;
		var o = routes.getObj({ path });
		if (o.oauth) {
			var token = $.db.get("token");
			// console.log(token);
			if (o.oauth.signIn && !token) {
				$.route.redirect_url = to.path + "?" + $.toUrl(to.query);
				next("/sign_in");
				return;
			}
		}
		next();
	});
	
	return router;
});
