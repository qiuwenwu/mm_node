var api_test_sql = $.api_admin('test_sql');
// 首次启动更新api接口;
api_test_sql.update('demo/');

var sql = $.mysql_admin('sys', __dirname);
sql.setConfig();
sql.open();

/**
 * @description 事件主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	db.tpl = new $.Tpl();
	$.push(db, sql.db(), true);
	return api_test_sql.run(ctx, db);
};

exports.main = main;