$.cache_admin = require('mm_cache').cache_admin;
$.mongoDB_admin = require("mm_mongodb").mongoDB_admin;
$.redis_admin = require("mm_redis").redis_admin;
$.mysql_admin = require('mm_mysql').mysql_admin;
$.Tpl = require('mm_tpl').Tpl;
$.Http = require("mm_https").Http;
$.Process = require("mm_process");
$.Timer = require("mm_timer").Timer;
$.es6_to_amd = require('mm_es6_to_amd');
require('mm_crypto');

const init = require("./core/init.js");
const api = require("./core/api.js");

/// 初始化
/// server: 应用服务
exports.init = function(server) {
	// 初始化函数写在这里，建议引入初始化文件，可以引入多个初始化文件
	init.run(server);
};

/// 返回主执行函数
/// ctx: 请求上下文
/// next: 跳过
exports.run = async function(ctx, next) {
	// 接口函数写在这里，建议引入接口文件，可以引入多个接口文件
	await api.run(ctx, next);
};
