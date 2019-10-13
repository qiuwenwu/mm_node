/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var query = req.query;
	if(query['update'])
	{
		$.nav.update();
		return $.ret.bl(true, '更新成功');
	}
	else {
		var {name, app, type} = query;
		var n = app ? app :name;
		var ret = await $.nav.run(n, type);
		return $.ret.body(ret);
	}
};

exports.main = main;