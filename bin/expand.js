/* 该文件用于引入到主进程使用 */
require('./common.js');

async function init(){
	$.plugin_admin = require('./com/plugin').plugin_admin;
	$.db_admin = require('./com/db').db_admin;
	$.task_admin = require('./com/task').task_admin;
}

function use(config){
	$.config = config;
	const sys = config.sys;
	
	// 选择缓存方式,默认memory缓存
	if (sys.redis == 'redis') {
		// 将Api的缓存改为redis方式，如果不用redis可以将以下4行注释掉
		var redis = $.redis_admin($.dict.server);
		redis.setConfig(config.redis);
		redis.open();
		$.cache = redis;
	} else if (sys.redis == 'cache') {
		// 将Api的缓存改为cache方式, 本地缓存方式
		$.cache = $.cache_admin();
	}
	
	// 创建App管理器
	var app = $.plugin_admin('sys');
	app.update('/app/');
	app.init();
	
	// 是否启用定时任务
	if (sys.task) {
		$.task = $.task_admin('sys');
		$.task.update();
		// 启动计时器
		$.timer.start();
	}
	
	// 是否启用数据库管理器
	if (sys.db_admin) {
		// 创建数据库管理器
		var db = $.db_admin('sys');
		db.update();
	}
}

/**
 * 初始化配置
 * @param {Object} config 配置参数
 */
module.exports = async function(config){
	init();
	return use(config);
}