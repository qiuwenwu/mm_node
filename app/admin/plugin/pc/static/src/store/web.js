import nav from 'nav';

var web = {
	state: function() {
		var n = Object.assign({}, nav);
		delete n.routes;
		return {
			config: [],
			nav: Object.assign({
				cache: [
					{
						title: "首页",
						name: "index",
						url: "/"
					}
				]
			}, n),
			lang_now: "",
			lang: []
			// nav: {
			// 	top: [],
			// 	right: [],
			// 	bottom: [],
			// 	left: [],
			// 	desktop: [],
			// 	quick: [],
			// 	main: []
			// }
		}
	},
	mutations: {
		/**
		 * @description 设置站点
		 * @param {Object} state 缓存态
		 * @param {Object} obj 参数集合
		 */
		set_web(state, obj) {
			$.push(state, obj);
		},
		/**
		 * @description 设置配置
		 * @param {Object} state 缓存态
		 * @param {Array} arr 配置参数
		 */
		set_config(state, arr) {
			state.config.clear();
			state.config.addList(arr);
		},
		/**
		 * @description 设置导航
		 * @param {Object} state 缓存态
		 * @param {Object} obj 导航集合
		 */
		set_nav(state, obj) {
			$.push(state.nav, obj);
		},
		/**
		 * @description 设置导航
		 * @param {Object} state 缓存态
		 * @param {Object} obj 导航集合
		 */
		set_nav_cache(state, o) {
			var list = state.nav.cache;
			var bl = list.has({
				url: o.url
			});
			if (!bl) {
				list.push(o);
			}
		},
		del_nav_cache(state, o){
			var list = state.nav.cache;
			list.del({
				url: o.url
			});
		}
	},
	actions: {},
	getters: {}
}

export default web;
