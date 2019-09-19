/**
 * 配置文件
 */
require({
		baseUrl: './src/',
		// 是否保留注释
		preserveLicenseComments: true,
		waitSeconds: 0,
		paths: {
			css: '/js/css.min',
			text: '/js/text.min',
			// 生产版||调试版
			Vue: '/js/vue',
			vue: '/js/requirejs-vue',
			vuex: '/js/vuex.min',
			VueRouter: '/js/vue-router.min',
			jquery: '/js/jquery-3.4.1.min',
			swiper: "/js/swiper.min",
			clipboard: '/js/clipboard.min',
			mm_sdk: '/js/mm_sdk',
			effect: './effect',
			store: './store',
			router: './router',
			echarts: '/js/echarts',
			kindeditor: '/kindeditor/kindeditor-all-min'
		},
		shim: {
			clipboard: {
				deps: ['jquery']
			},
			kindeditor: {
				exports: 'Kindeditor',
				deps: ['jquery']
			},
			vuex: {
				deps: ['Vue']
			},
			VueRouter: {
				deps: ['Vue']
			},
			swiper: {
				deps: ['jquery']
			},
			mm_sdk: {
				deps: ['jquery']
			},
			md5: {
				deps: ['jquery']
			}
		},
		config: {
			// vue加载配置
			'vue': {
				'css': 'inject',
				'templateVar': '__template__'
			}
		}
	},
	['Vue', 'store', 'router', 'vue!./App.vue'],
	function(Vue, store, router, app) {
		// 开启调试模式
		Vue.config.debug = true;
		// 开启开发者工具
		Vue.config.devtools = true;

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
			render(h) {
				return h(app)
			}
		});
	}
);
