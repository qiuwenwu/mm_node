import Vue from 'Vue';
import VueRouter from 'VueRouter';
import index from './pages/index.vue';
import mm_sdk from 'mm_sdk';

// 定义返回上一页方法
VueRouter.prototype.goBack = function() {
	this.isBack = true;
	window.history.go(-1);
};

// 引用vuex插件
Vue.use(VueRouter);

// 定义路由根路径
var routePath = "/admin";
// 定义文件根路径
var filePath = "/admin";

// 添加路由
var routes = [{
	// 首页
	path: "/*",
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

// 注册全局钩子用来拦截导航
router.beforeEach(function(to, from, next) {
	next();
	// $.validateUser(to, from, next, routePath + '/login'); //验证用户
});

// 返回缓存器
export default router;
