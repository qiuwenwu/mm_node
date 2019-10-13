import Vue from 'Vue';
import vuex from 'vuex';

import user from './store/user'
import lang from './store/lang'
import web from './store/web'

// 引用vuex插件
Vue.use(vuex);

var store = {
	/**
	 * 储存的状态
	 */
	state: {
		host: "/"
	},
	getters: {},
	mutations: {},
	actions: {},
	/**
	 * 载入模块
	 */
	modules: {
		user: user,
		lang: lang,
		web: web
	},
	strict: true
};

// 生成并返回缓存器
export default new vuex.Store(store);
