// var mb = $.mongoDB_admin('sys', __dirname);
// mb.setConfig();
// mb.open();

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;

	// 选择操作的数据表
	mb.table = "mm_table";

	var ret = "";
	if (Object.keys(req.body).length > 0) {
		// 修改缓存
		ret = await mb.set(req.query, req.body);
	} else {
		mb.size = 10;
		// 查询缓存
		ret = await mb.get(req.query);
	}
	return ret;
};

exports.main = main;
