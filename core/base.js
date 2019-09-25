$.api_admin = require('../com/api').api_admin;
$.sql_admin = require('../com/sql').sql_admin;
$.plugin_admin = require('../com/plugin').plugin_admin;
$.param_admin = require('../com/param').param_admin;
$.event_admin = require('../com/event').event_admin;
$.task_admin = require('../com/task').task_admin;
$.db_admin = require('../com/db').db_admin;
const Static = require('../com/static').Static;

// 加载全局配置
$.config = "./config.json".loadJson(__dirname);

// 定义全局函数
$.static = new Static();
$.static.update();

// 创建一个API事件
var event_api = $.event_admin('api');
event_api.update();

// 定义模板引擎全局数据模型
var tpl = new $.Tpl('sys', './app/');
tpl.globalBag.server = "mm";

// 创建App管理器
var apps = $.plugin_admin('sys');
apps.update('/app/');

// 创建数据库管理器
var dbs = $.db_admin('sys');
dbs.update();

/**
 * @description 处理静态文件请求
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前, 然后继续执行函数
 */
module.exports.static = $.static.run;

/**
 * @description 处理接口请求
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前, 然后继续执行函数
 */
module.exports.api = async function(ctx, next) {
	var db = {
		next: next,
		ret: null,
		tpl: tpl
	};
	var p = ctx.request.path;
	var ret = await event_api.run(p, ctx, db);
	if (ret) {
		ctx.response.body = ret;
	}
};

/**
 * @description 跨域spa应用
 * @param {String} host SPA应用地址
 * @param {String} server 服务器地址
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据取管理器
 * @return {type}
 */
$.core_spa = async function(host, server, ctx, db){
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