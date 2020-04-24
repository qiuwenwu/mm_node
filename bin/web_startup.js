const init = require('./common.js');
const web = require('./web.js');
const web_waf = require('./web_waf.js');

/**
 * 引用服务
 * @param {Object} app http服务 
 */
function use(config) {
	var app = web();
	
	web_waf(app);
	
	// 初始化函数写在这里，建议引入初始化文件，可以引入多个初始化文件
	const server = config.server;
	// 使用多路径静态文件处理器
	if (server.static) {
		const Static = require('./com/static').Static;
		$.static = new Static();
		$.static.update();
		app.use($.static.run);
	}

	//使用 websocket 服务
	if (server.websocket) {
		const Socket = require('./com/socket').Socket;
		$.socket = new Socket();
		$.socket.update();
		app.ws.use($.socket.run);
	}

	// 创建一个API事件
	var event_api = $.event_admin('api', 'API事件');
	event_api.update();
	
	app.use(async function(ctx, next) {
		var db = {
			next: next,
			ret: null
		};
		var ret = await event_api.run(ctx.path, ctx, db);
		if (ret) {
			ctx.body = ret;
			ctx.status = ctx.status == 404 ? 200 : ctx.status;
		}
		await next();
	});

	return app;
};

/**
 * 启动程序
 * @param {Object} config
 */
function startup(config) {
	init(config);
	
	$.event_admin = require('./com/event').event_admin;
	$.api_admin = require('./com/api').api_admin;
	$.nav_admin = require('./com/nav').nav_admin;
	$.cmd_admin = require('./com/cmd').cmd_admin;
	
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
	
	return use(config);
}

module.exports = startup;
