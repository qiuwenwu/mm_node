import Vue from 'Vue';
import VueRouter from 'VueRouter';
import index from './pages/index.vue';

// 定义返回上一页方法
VueRouter.prototype.goBack = function() {
	this.isBack = true;
	window.history.go(-1);
};

// 引用vuex插件
Vue.use(VueRouter);

// 定义路由根路径
var routePath = "/ui";
// 定义文件根路径
var filePath = "/ui";


// 添加路由
var routes = [{
		// 首页
		path: "/",
		component: function(resolve) {
			return require(['vue!./pages/index.vue'], resolve);
		}
	},
	{
		// 按钮
		path: "/content/btn",
		component: function(resolve) {
			return require(['vue!./pages/content/btn.vue'], resolve);
		}
	},
	{
		// 图标
		path: "/content/icon",
		component: function(resolve) {
			return require(['vue!./pages/content/icon.vue'], resolve);
		}
	},
	{
		// 加载
		path: "/content/loading",
		component: function(resolve) {
			return require(['vue!./pages/content/loading.vue'], resolve);
		}
	},
	{
		// 源代码
		path: "/content/pre",
		component: function(resolve) {
			return require(['vue!./pages/content/pre.vue'], resolve);
		}
	},
	{
		// 块
		path: "/layout/div",
		component: function(resolve) {
			return require(['vue!./pages/layout/div.vue'], resolve);
		}
	},
	{
		// 栅格
		path: "/layout/grid",
		component: function(resolve) {
			return require(['vue!./pages/layout/grid.vue'], resolve);
		}
	},
	{
		// 组合框
		path: "/layout/group",
		component: function(resolve) {
			return require(['vue!./pages/layout/group.vue'], resolve);
		}
	},
	{
		// 列表
		path: "/layout/list",
		component: function(resolve) {
			return require(['vue!./pages/layout/list.vue'], resolve);
		}
	},
	{
		// 模态窗
		path: "/layout/modal",
		component: function(resolve) {
			return require(['vue!./pages/layout/modal.vue'], resolve);
		}
	},
	{
		// 表格
		path: "/layout/table",
		component: function(resolve) {
			return require(['vue!./pages/layout/table.vue'], resolve);
		}
	},
	{
		// 复选框
		path: "/form/checkbox",
		component: function(resolve) {
			return require(['vue!./pages/form/checkbox.vue'], resolve);
		}
	},
	{
		// 输入框
		path: "/form/input",
		component: function(resolve) {
			return require(['vue!./pages/form/input.vue'], resolve);
		}
	},
	{
		// 数字框
		path: "/form/number",
		component: function(resolve) {
			return require(['vue!./pages/form/number.vue'], resolve);
		}
	},
	{
		// 分页器
		path: "/form/pager",
		component: function(resolve) {
			return require(['vue!./pages/form/pager.vue'], resolve);
		}
	},
	{
		// 单选框
		path: "/form/radio",
		component: function(resolve) {
			return require(['vue!./pages/form/radio.vue'], resolve);
		}
	},
	{
		// 反转器
		path: "/form/reverse",
		component: function(resolve) {
			return require(['vue!./pages/form/reverse.vue'], resolve);
		}
	},
	{
		// 选择框
		path: "/form/select",
		component: function(resolve) {
			return require(['vue!./pages/form/select.vue'], resolve);
		}
	},
	{
		// 滑块
		path: "/form/slider",
		component: function(resolve) {
			return require(['vue!./pages/form/slider.vue'], resolve);
		}
	},
	{
		// 按钮
		path: "/form/switch",
		component: function(resolve) {
			return require(['vue!./pages/form/switch.vue'], resolve);
		}
	},
	{
		// 错误404
		path: "*",
		redirect: "/err404"
	}
];

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
});

// 返回缓存器
export default router;
