"use strict";

require({
	baseUrl: '/ui/src/',
	// 是否保留注释
	preserveLicenseComments: true,
	waitSeconds: 0,
	paths: {
		text: '/js/text.min',
		css: '/js/css.min',
		vue: '/js/mm-requirejs-vue',

		// 生产版||调试版
		Vue: '/js/vue',
		vuex: '/js/vuex.min',
		VueRouter: '/js/vue-router.min',
		jquery: '/js/jquery-3.4.1.min',
		clipboard: '/js/clipboard.min',
		mm_sdk: '/js/mm_sdk',
		mm_vue: '/js/mm_vue',
		ui: '/js/mm_vue_ui',
		mm_component: '/src/mm_component',
		mm_ui_expand: '/js/mm_ui_expand',
		swiper: '/js/swiper.min',
		store: './store',
		router: './router'
	},
	shim: {
		clipboard: {
			deps: ['jquery']
		},
		mm_sdk: {
			deps: ['jquery']
		},
		ui: {
			deps: ['jquery']
		},
		mm_ui_expand: {
			deps: ['jquery']
		},
		mm_vue: {
			deps: ['mm_sdk']
		},
		vuex: {
			deps: ['Vue']
		},
		VueRouter: {
			deps: ['Vue']
		}
	},
	config: {
		// vue加载配置
		'vue': {
			'css': 'inject',
			'templateVar': '__template__'
		}
	}
}, ['Vue', 'mm_sdk', 'mm_vue', 'store', 'router', 'ui', 'mm_ui_expand', 'clipboard', 'vue!./App.vue', 'mm_component'], function(Vue,
	mm_sdk,
	mm_vue, store, router,
	ui, mm_ui_expand, clipboard, app, mm_component) {
	// 开启调试模式
	Vue.config.debug = true;
	// 使用UI组件
	Vue.config.devtools = true;

	Vue.use(mm_vue);
	Vue.use(ui);
	Vue.use(mm_component);

	/**
	 * @description 初始化整个Vue应用程序
	 * 由于组件预先注册的标记名而自动放置的组件头将在应用程序模板中找到
	 */
	var vue = new Vue({
		el: '#app',
		// 引用缓存管理器
		store: store,
		// 引用路由管理器
		router: router,
		// 渲染页面
		render: function render(h) {
			return h(app);
		}
	});
});
