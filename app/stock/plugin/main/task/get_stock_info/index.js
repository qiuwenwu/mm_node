const com = require('../../com/get_info.js');

var sql = $.mysql_admin('sys', __dirname);
sql.setConfig($.config.mysql);
sql.open();

async function update_stock() {
	// 获取所有股票代码和名称
	var list = await com.get_stock_list();
	// 实例一个数据操作器
	var db = sql.db();
	// 选择要操作的数据表
	db.table = "stock_info";
	// 获取数据表中所有数据, 即获取现有的股票代码和名称;
	var lt = await db.get();
	var len = 0;
	for (var i = 0, o; o = list[i++];) {
		var m = com.model(o);
		var query = {
			code: m.code
		};
		db.addOrSet(query, m);
	}
}

/**
 * @description 定时任务函数
 */
exports.main = async function main() {
	update_stock();
	$.log.info('更新股票列表');
};
