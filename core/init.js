const base = require('./base');
const statics = require("./static");
const api = require("./api");
const websocket = require("./websocket");

var sys = $.config.sys;

// 是否启用定时任务
if (sys.task) {
	$.task = $.task_admin('sys');
	$.task.update();
	// 启动计时器
	$.timer.start();
}

// 选择缓存方式,默认memory缓存
if (sys.redis == 'redis') {
	// 将Api的缓存改为redis方式，如果不用redis可以将以下4行注释掉
	var redis = $.redis_admin($.dict.server);
	redis.setConfig($.config.redis);
	redis.open();
	$.cache = redis;
} else if (sys.redis == 'cache') {
	// 将Api的缓存改为cache方式, 本地缓存方式
	$.cache = $.cache_admin();
}

/// 执行初始化服务
module.exports = function(app) {
	// 使用 websocket 服务
	app.ws.use(websocket);

	// 使用多路径静态文件处理器
	app.use(statics);

	// 使用MM事件 + 接口处理器, 如果不使用则可注释
	app.use(api);

	// 如果使用koa默认路由方式, 可以写在这里
	// console.log('自定义的初始化函数');
	// app.use(async function(ctx, next) {
	// 	return next();
	// });
};
