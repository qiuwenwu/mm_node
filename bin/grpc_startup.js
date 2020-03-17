var init = require('./common.js');
const grpc = require('./grpc.js');


/**
 * 引用
 * @param {Object} config 配置
 */
function use(config){
	var app = grpc();
	
	return app;
}


/**
 * 启动程序
 * @param {Object} config
 */
function startup(config) {
	init(config);
	$.api_admin = require('./com/api').api_admin;
	return use(config);
}

module.exports = startup;
