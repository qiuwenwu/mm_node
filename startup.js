require('mm_tpl');
require("mm_https");
require("mm_process");
require("mm_timer");
require('mm_crypto');
require('mm_es6_to_amd');
require('mm_matchs');

const init = require("./core/init.js");

/// 初始化
/// server: 应用服务
module.exports = function(server) {
	// 初始化函数写在这里，建议引入初始化文件，可以引入多个初始化文件
	init(server);
};
