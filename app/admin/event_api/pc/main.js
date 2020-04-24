var api = $.api_admin('admin_pc', '管理后台(PC版)');
// 首次启动更新api接口;
api.update();

// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
const nav = $.nav_admin('admin_pc');
nav.update();

var sql = $.mysql_admin('sys', __dirname);
sql.setConfig($.config.mysql);
sql.open();

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	db.tpl = new $.Tpl();
	// 在这定义要访问的数据库 (分布式开发时设置不同的数据库名)
	$.push(db, sql.db(), true);
	// $.log.debug('admin_pc');
	return api.run(ctx, db);
};

exports.main = main;