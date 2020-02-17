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
	var scope = q['scope'];
	if(scope)
	{
		return $.pool.api[scope];
	}
	return "作用域（scope）参数不能为空";
};

exports.main = main;