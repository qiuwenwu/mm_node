/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 过滤静态文件
	if (ctx.path.indexOf('.') === -1) {
		var name = $.config.web.name ? $.config.web.name : "MM";
		var model = {
			title: name + "后台管理系统",
			description: name + "是一个集合门户、商城、论坛、微信公众号为一体的系统",
			keywords: name + " mm_node 高并发 异步 服务端 分布式 框架 商城 游戏 saas async",
			content: ""
		};
		var file = './../../static/index.html'.fullname(__dirname);
		var o = db.tpl.view(file, model);
		return o;
	}
	return null;
}

exports.main = main;