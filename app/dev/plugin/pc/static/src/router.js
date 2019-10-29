import Vue from 'Vue';
import VueRouter from 'VueRouter';

// 引用vuex插件
Vue.use(VueRouter);

// 定义路由根路径
var routePath = "/dev";
// 定义文件根路径
var filePath = "/dev";

// console.log($.get('/dev/route'));

// 添加路由
var routes = [{
		// 首页
		path: "/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/index.vue'], resolve);
		}
	}, {
		// 应用 
		path: "/app/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/app/index.vue'], resolve);
		}
	}, {
		// 插件
		path: "/plugin/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/plugin/index.vue'], resolve);
		}
	}, {
		// 事件
		path: "/event/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/event/index.vue'], resolve);
		}
	}, {
		// 接口
		path: "/api/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/api/index.vue'], resolve);
		}
	},
	{
		// Param 参数
		path: "/api/param/",
		meta: {
			requiresAuth: false,
			index: 2
		},
		component: function(resolve) {
			return require(['vue!./pages/api/param.vue'], resolve);
		}
	}, {
		// SQL
		path: "/api/sql/",
		meta: {
			requiresAuth: false,
			index: 2
		},
		component: function(resolve) {
			return require(['vue!./pages/sql/sql.vue'], resolve);
		}
	}, {
		// 素材 
		path: "/source/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/source/index.vue'], resolve);
		}
	}, {
		// 数据库
		path: "/db/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/db/index.vue'], resolve);
		}
	}, {
		// 视图
		path: "/view/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/view/index.vue'], resolve);
		}
	}, {
		// 控制台
		path: "/console/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/console/index.vue'], resolve);
		}
	}, {
		// 帮助
		path: "/help/",
		meta: {
			requiresAuth: false,
			index: 1
		},
		component: function(resolve) {
			return require(['vue!./pages/help/index.vue'], resolve);
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
	}
];

// routes.push({
// 	path: routePath + '/login',
// 	component: function component(resolve) {
// 		return require(['./pages/login'], resolve);
// 	}
// });

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
