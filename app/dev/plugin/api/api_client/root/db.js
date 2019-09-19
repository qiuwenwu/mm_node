const gm = require('./com.js');

/**
 * @description 附加方法
 */
var funcs = {
	/**
	 * @description 更新
	 * @param {Object} ctx HTTP上下文
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async update_config(ctx, db) {
		var req = ctx.request;
		var q = req.query;
		var scope = q["scope"];
		if (!scope) {
			scope = "sys";
		}
		var pool = $.pool.db[scope];
		var msg = await pool.update_config(db, q["name"], q["table"]);
		if (msg) {
			return $.ret.bl(false, msg);
		} else {
			return $.ret.bl(true, '更新成功');
		}
	}
};

exports.main = gm('db', funcs);
