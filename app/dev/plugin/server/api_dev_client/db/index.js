const dev = require('../com.js').dev;
$.db_admin = require('../../../../../../bin/com/db/index.js').db_admin;
// 是否启用数据库管理器
if ($.config.sys.db_admin) {
	// 创建数据库管理器
	var db = $.db_admin('sys');
	db.update();
}

var dev_class = new dev('db');
/**
 * @description 更新配置文件
 * @param {Object} req HTTP上文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
dev_class.update_config = async function(req, db) {
	var q = req.query;
	var scope = q["scope"];
	if (!scope) {
		scope = "sys";
	}
	var pool = $.pool.db[scope];
	var msg = await pool.update_config(db, q["name"], q["table"], q["cover"]);
	if (msg) {
		return $.ret.bl(false, msg);
	} else {
		return $.ret.bl(true, '更新成功');
	}
};


/**
 * @description 更新数据库
 * @param {Object} req HTTP上文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
dev_class.update_db = async function(req, db) {
	var q = req.query;
	var scope = q["scope"];
	if (!scope) {
		scope = "sys";
	}
	var pool = $.pool.db[scope];
	var msg = await pool.update_db(db, q["name"], q["table"], q["all"]);
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
	return await dev_class.main(ctx, db);
};
