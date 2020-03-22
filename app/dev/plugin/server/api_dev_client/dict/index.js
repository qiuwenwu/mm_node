var methods = {
	async get(ctx, db) {
		var dict = {};
		var dt = $.pool.api;
		for (var k in dt) {
			var lt = dt[k].list;
			for (var i = 0; i < lt.length; i++) {
				var pm = lt[i].param;
				if (pm && pm.config && pm.config.list.length > 0) {
					var list = pm.config.list;
					for (var n = 0; n < list.length; n++) {
						var o = list[n];
						dict[o.name] = o;
					}
				}
			}
		}
		return dict;
	},
	async set(ctx, db) {

	},
	async save(ctx, db) {

	},
	async update(ctx, db) {

	}
}


/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
exports.main = async function(ctx, db) {
	var req = ctx.request;
	var q = req.query;
	if (!q.method) {
		return $.ret.error(10000, "方法(method)参数不能为空");
	}
	var func = methods[q.method];
	if (!func) {
		return $.ret.error(50000, "方法不存在");
	}
	return await func(ctx, db);
};
