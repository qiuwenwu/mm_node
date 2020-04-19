const file =  '../../static/index.html'.fullname(__dirname);

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var path = ctx.path;
	if (path.indexOf('.') === -1) {
		$.globalBag.congfig = $.config;
		var model = {
			os: "mm",
			app: "admin",
			plugin: "pc",
			title: $.config.sys.title + "后台管理系统",
			keywords: "mm admin pc",
			description: "",
			content: ""
		};
		return db.tpl.view(file, model);
	}
	return null;
}

exports.main = main;
