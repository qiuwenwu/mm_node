require('./expand.js');

const sys = $.config.sys;

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

// 创建App管理器
var apps = $.plugin_admin('sys');

// 创建一个API事件
var event_api = $.event_admin('api');
// 更新api事件
event_api.update();
	
/**
 * 引用服务
 * @param {Object} server http服务 
 */
exports.use = function(server) {
	// 初始化函数写在这里，建议引入初始化文件，可以引入多个初始化文件
	// 使用 websocket 服务
	if (sys.websocket) {
		const Socket = require('./com/socket').Socket;
		$.socket = new Socket();
		server.ws.use($.socket.run);
	}

	// 使用多路径静态文件处理器
	if(sys.static)
	{
		const Static = require('./com/static').Static;
		$.static = new Static();
		server.use($.static.run);
	}
	
	// 使用MM事件 + 接口处理器, 如果不使用则可注释
	server.use(async function(ctx, next) {
		var db = {
			next: next,
			ret: null
		};
		var ret = await event_api.run(ctx.path, ctx, db);
		if (ret) {
			ctx.response.body = ret;
		}
	});

	// 如果使用koa默认路由方式, 可以写在这里
	// console.log('自定义的初始化函数');
	// server.use(async function(ctx, next) {
	// 	return next();
	// });
};

/**
 * 系统服务初始化
 */
exports.init = async function() {	
	// 更新websocket服务
	if ($.socket) {
		$.socket.update();
	}
	
	// 更新静态文件服务
	if($.static){
		$.static.update();
	}
	
	// 是否启用定时任务
	if (sys.task) {
		new $.Process().run('./task.js', [$.runPath])
	}
	
	// 是否启用数据库管理器
	if (sys.db_admin) {
		// 创建数据库管理器
		var dbs = $.db_admin('sys');
		dbs.update();
	}
	
	// 更新应用
	apps.update('/app/');
	apps.init();
	
	// 初始化应用程序
}