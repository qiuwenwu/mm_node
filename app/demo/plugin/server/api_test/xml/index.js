/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	// $.log.debug(ctx.headers);
	// $.log.debug(req.body);
	// $.log.debug(req.bodyStr);
	// ctx.response.body = req.body;
	ctx.response.type = 'text/xml';
	// 获取请求参数
	var q = req.query;
	return $.toXml(req.body);
};

exports.main = main;