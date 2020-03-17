/* 该文件用于引入到主进程使用 */
var init = require('./bin/common.js');

/**
 * 启动程序
 * @param {Object} config 配置参数
 */
async function startup(config){
	init(config);
	
	$.plugin_admin = require('./bin/com/plugin').plugin_admin;
	$.task_admin = require('./bin/com/task').task_admin;
	
	// 创建App管理器
	$.app = $.plugin_admin('sys');
	$.app.update('/app/');
	$.app.init();
	
	// 是否启用定时任务
	if (config.sys.task) {
		$.task = $.task_admin('sys');
		$.task.update();
		// 启动计时器
		$.timer.start();
	}
}

module.exports = startup;