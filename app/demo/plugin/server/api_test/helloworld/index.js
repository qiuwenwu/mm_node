/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	// 获取请求参数
	var q = req.query;
	// $.log.debug(req.headers);
	// $.log.debug(req.body);
	return "hello world" + JSON.stringify(q);
};

exports.main = main;