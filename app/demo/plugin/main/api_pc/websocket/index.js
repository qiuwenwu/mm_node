const file = __dirname + '/index.html';

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 给前端传一个apikey, 表示请求连接是从该处来的, 确保请求的安全
	var apikey = new Date().toISOString().md5();
	var model = { apikey: apikey };
	return db.tpl.view(file, model);
}

exports.main = main;