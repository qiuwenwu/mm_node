import Vue from 'Vue';
import VueRouter from 'VueRouter';
import index from './pages/index.vue';
import mm_sdk from 'mm_sdk';
import nav from 'nav';


// 引用vuex插件
Vue.use(VueRouter);

// 定义路由根路径
var routePath = "/admin";
// 定义文件根路径
var filePath = "/admin";

// 添加路由
var routes = [{
	// 首页
	path: "/",
	component: function(resolve) {
		return require(['vue!./pages/index.vue'], resolve);
	}
}, {
	// 错误404
	path: "/404",
	component: function(resolve) {
		return require(['vue!./pages/err404.vue'], resolve);
	}
}, {
	// 错误404
	path: "*",
	redirect: "/404"
}];

function new_route(o, com) {
	var obj = Object.assign({}, o);
	obj.component = function(resolve) {
		return require(['vue!' + com], resolve);
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

// 生成路由器
var router = new VueRouter({
	mode: 'history',
	base: routePath,
	hashbang: true,
	history: false,
	saveScrollPosition: true,
	transitionOnLoad: true,
	routes: routes
});

// 定义返回上一页方法
VueRouter.prototype.goBack = function() {
	this.isBack = true;
	window.history.go(-1);
};

// 注册全局钩子用来拦截导航
router.beforeEach(function(to, from, next) {
	if (to.meta) {
		var token = $.db.get('token');
		// 验证用户
		if (to.meta.requiresAuth && !token) {
			$.url_back = to.path + '?' + $.toUrl(to.query);
			next('/login');
			return;
		}
	}
	// 添加路由记录
	$.route.history.push(from.path + '?' + $.toUrl(from.query))
	next();
});


// 返回缓存器
export default router;
