const dev = require('../com.js').dev;

var dev_class = new dev('nav');

/**
 * @description 更新配置文件
 * @param {Object} req HTTP上文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
dev_class.update_vue = async function(req, db) {
	var q = req.query;
	var scope = q["scope"];
	var pool = $.pool.nav[scope];
	if(!pool)
	{
		return $.ret.error(10000, scope + '作用域(scope) 不存在！');
	}
	var msg = await pool.update_vue(q);
	if (msg) {
		return $.ret.bl(false, msg);
	} else {
		return $.ret.bl(true, '更新成功');
	}
};

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
exports.main = async function(ctx, db) {
	this.type = "nav";
	return await dev_class.main(ctx, db);
};
