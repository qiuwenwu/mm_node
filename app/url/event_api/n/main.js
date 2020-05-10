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
	$.push(db, sql.db(), true);
	var req = ctx.request;
	var path = req.path;

	var arr = path.split('/');
	var key = arr[arr.length - 1];
	db.table = "url_info";
	// db.key = "url_id";
	var obj = await db.getObj({
		key
	});

	if (obj) {
		// obj.times += 1;
		db.table = "url_log";
		db.add({
			key,
			query: req.querystring,
			// 判断是否有反向代理 IP
			ip: req.ip
		});
		ctx.response.redirect(obj.url_redirect);
	}
	return null;
};
exports.main = main;
