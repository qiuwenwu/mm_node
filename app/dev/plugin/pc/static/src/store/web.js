export default {
	state: function() {
		return {
			lang_now: "zh",
			lang: [],
			nav: {
				top: [{
						title: "应用",
						name: "app",
						url: "/app",
						message: 0
					},
					{
						title: "事件",
						name: "event",
						url: "/event",
						message: 0
					},
					{
						title: "接口",
						name: "api",
						url: "/api",
						message: 0
					},
					{
						title: "素材",
						name: "source",
						url: "/source",
						message: 0
					},
					{
						title: "视图",
						name: "view",
						url: "/view",
						message: 0
					},
					{
						title: "数据库",
						name: "db",
						url: "/db",
						message: 0
					},
					{
						title: "帮助",
						name: "help",
						url: "/help",
						message: 0
					}
				],
				side: [],
				bottom: [{
					title: "加入我们",
					name: "support",
					url: "http://dev.elins.cn/",
					message: 0
				}],
				float: []
			},
			diy: {
				head_left: [],
				foot_left: [],
				foot_right: []
			}
		}
	},
	mutations: {
		/**
		 * @description 设置语言
		 * @param {Object} state 缓存态
		 * @param {Object} obj
		 */
		set_config(state, obj) {
			$.push(state, obj);
		},
		/**
		 * @description 设置语言
		 * @param {Object} state 缓存态
		 * @param {Array} arr 
		 */
		set_lang(state, arr) {
			state.lang.clear();
			$.push(state.lang, arr);
		},
		/**
		 * @description 设置导航
		 * @param {Object} state 缓存态
		 * @param {Object} obj 导航
		 */
		set_nav(state, obj) {
			$.push(state.nav, obj);
		}
	},
	actions: {},
	getters: {}
};
