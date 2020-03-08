define(["Vue", "VueRouter"], function(Vue, VueRouter) {
	"use strict";

	VueRouter.prototype.goBack = function() {
		this.isBack = true;
		window.history.go(-1);
	};
	Vue.use(VueRouter);
	var routes = [{
			// 首页
			path: "/",
			component: function(resolve) {
				return require(['vue!./pages/index.vue'], resolve);
			}
		},
		{
			// 设计规范
			path: "/design",
			component: function(resolve) {
				return require(['vue!./pages/design.vue'], resolve);
			}
		},
		/* 内容 */
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
			// 颜色
			path: "/content/color",
			component: function(resolve) {
				return require(['vue!./pages/content/color.vue'], resolve);
			}
		},
		/* 布局 */
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
		/* 表单 */
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
			// 开关
			path: "/form/switch",
			component: function(resolve) {
				return require(['vue!./pages/form/switch.vue'], resolve);
			}
		},
		/* 栏目 */
		{
			// 标题栏
			path: "/bar/title",
			component: function(resolve) {
				return require(['vue!./pages/bar/title.vue'], resolve);
			}
		},
		{
			// 搜索栏
			path: "/bar/search",
			component: function(resolve) {
				return require(['vue!./pages/bar/search.vue'], resolve);
			}
		},
		{
			// 筛选栏
			path: "/bar/filter",
			component: function(resolve) {
				return require(['vue!./pages/bar/filter.vue'], resolve);
			}
		},
		{
			// 选项卡栏
			path: "/bar/tabs",
			component: function(resolve) {
				return require(['vue!./pages/bar/tabs.vue'], resolve);
			}
		},
		{
			// 标签栏
			path: "/bar/tag",
			component: function(resolve) {
				return require(['vue!./pages/bar/tag.vue'], resolve);
			}
		},
		{
			// 排序栏
			path: "/bar/sort",
			component: function(resolve) {
				return require(['vue!./pages/bar/sort.vue'], resolve);
			}
		},
		{
			// 统计栏
			path: "/bar/count",
			component: function(resolve) {
				return require(['vue!./pages/bar/count.vue'], resolve);
			}
		},
		{
			// 购买栏
			path: "/bar/buy",
			component: function(resolve) {
				return require(['vue!./pages/bar/buy.vue'], resolve);
			}
		},
		{
			// 操作栏
			path: "/bar/action",
			component: function(resolve) {
				return require(['vue!./pages/bar/action.vue'], resolve);
			}
		},
		{
			// 聊天栏
			path: "/bar/chat",
			component: function(resolve) {
				return require(['vue!./pages/bar/chat.vue'], resolve);
			}
		},
		/* 列表元素 */
		{
			// 图片列表项
			path: "/list/img",
			component: function(resolve) {
				return require(['vue!./pages/list/img.vue'], resolve);
			}
		},
		{
			// 文章列表
			path: "/list/article",
			component: function(resolve) {
				return require(['vue!./pages/list/article.vue'], resolve);
			}
		},
		{
			// 联系人列表项
			path: "/list/contact",
			component: function(resolve) {
				return require(['vue!./pages/list/contact.vue'], resolve);
			}
		},
		{
			// 消息列表项
			path: "/list/message",
			component: function(resolve) {
				return require(['vue!./pages/list/message.vue'], resolve);
			}
		},
		{
			// 新闻列表项
			path: "/list/news",
			component: function(resolve) {
				return require(['vue!./pages/list/news.vue'], resolve);
			}
		},
		{
			// 号码列表项
			path: "/list/number",
			component: function(resolve) {
				return require(['vue!./pages/list/number.vue'], resolve);
			}
		},
		{
			// 商品列表项
			path: "/list/goods",
			component: function(resolve) {
				return require(['vue!./pages/list/goods.vue'], resolve);
			}
		},
		{
			// 问答列表项
			path: "/list/question",
			component: function(resolve) {
				return require(['vue!./pages/list/question.vue'], resolve);
			}
		},
		{
			// 用户列表项
			path: "/list/user",
			component: function(resolve) {
				return require(['vue!./pages/list/user.vue'], resolve);
			}
		},
		{
			// 视频列表项
			path: "/list/video",
			component: function(resolve) {
				return require(['vue!./pages/list/video.vue'], resolve);
			}
		},
		{
			// 音乐列表项
			path: "/list/music",
			component: function(resolve) {
				return require(['vue!./pages/list/music.vue'], resolve);
			}
		},
		/* slide */
		{
			// 卡片轮播
			path: "/slide/card",
			component: function(resolve) {
				return require(['vue!./pages/slide/card.vue'], resolve);
			}
		},
		{
			// 图片轮播
			path: "/slide/img",
			component: function(resolve) {
				return require(['vue!./pages/slide/img.vue'], resolve);
			}
		},
		{
			// 文本轮播
			path: "/slide/text",
			component: function(resolve) {
				return require(['vue!./pages/slide/text.vue'], resolve);
			}
		},
		{
			// 页面轮播
			path: "/slide/page",
			component: function(resolve) {
				return require(['vue!./pages/slide/page.vue'], resolve);
			}
		},
		{
			// 菜单轮播
			path: "/slide/menu",
			component: function(resolve) {
				return require(['vue!./pages/slide/menu.vue'], resolve);
			}
		},
		{
			// 错误404
			path: "*",
			redirect: "/404"
		}
	];
	var router = new VueRouter({
		mode: "history",
		base: "/ui",
		hashbang: true,
		history: false,
		saveScrollPosition: true,
		transitionOnLoad: true,
		routes: routes
	});
	router.beforeEach(function(to, from, next) {
		next();
	});
	return router;
});
