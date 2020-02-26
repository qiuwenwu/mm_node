/* 用于放置程序引用到的模块和定义全局函数 */
require('mm_tpl');
require("mm_https");
require("mm_process");
require("mm_timer");
require('mm_crypto');
require('mm_es6_to_amd');
require('mm_matchs');
$.html = require('mm_html');

$.redis_admin = require("mm_redis").redis_admin;
$.mongoDB_admin = require("mm_mongodb").mongoDB_admin;
$.mysql_admin = require('mm_mysql').mysql_admin;
$.cache_admin = require('mm_cache').cache_admin;
$.api_admin = require('./com/api').api_admin;
$.sql_admin = require('./com/sql').sql_admin;
$.plugin_admin = require('./com/plugin').plugin_admin;
$.param_admin = require('./com/param').param_admin;
$.event_admin = require('./com/event').event_admin;
$.task_admin = require('./com/task').task_admin;
$.db_admin = require('./com/db').db_admin;
$.cmd_admin = require('./com/cmd').cmd_admin;
$.nav_admin = require('./com/nav').nav_admin;


// 加载全局配置
const NODE_ENV = process.env.NODE_ENV || 'local';
$.config = `../config/${NODE_ENV}.json`.loadJson(__dirname);

/**
 * @description 跨域spa应用
 * @param {String} host SPA应用地址
 * @param {String} server 服务器地址
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据取管理器
 * @return {type}
 */
$.core_spa = async function(host, server, ctx, db) {
	var http = new $.Http();
	var path = ctx.path;
	var url = host + path;

	var body;
	if (path.endWith('.js')) {
		ctx.type = "application/javascript; charset=utf-8";
		var res = await http.get(url);
		body = res.body;
	} else if (path.endWith('.css')) {
		ctx.type = "text/css";
		var res = await http.get(url);
		body = res.body;
	} else if (path.endWith('.vue')) {
		var res = await http.get(url);
		body = res.body;
	} else if (path.has('*.*')) {
		ctx.type = "image/" + path.right('.');
		http.encoding = "binary";
		var res = await http.get(url);
		ctx.body = res.binary;
	} else {
		ctx.type = "text/html";
		var res = await http.get(url);
		if (res.body) {
			body = res.body.replace(/data-server=\"\/[a-z0-9A-Z_]+\/\"/, 'data-server="' + server + '"');
		}
	}
	return body;
}