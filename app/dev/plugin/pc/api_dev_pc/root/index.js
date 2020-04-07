const file = './../../static/index.html'.fullname(__dirname);

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var p = req.path;
	if (p.startWith("/dev/doc")) {
		return null;
	}
	// 过滤静态文件
	if (p.indexOf('.') === -1) {
		var model = {
			title: "超级美眉——开发者",
			description: "超级美眉mm_koa版服务端框架是一个高并发、分布式服务端框架, 适用于开发中小型商城、游戏、saas平台",
			keywords: "超级美眉 mm_koa 高并发 异步 服务端 分布式 框架 商城 游戏 saas async",
			content: ""
		};

		var o = db.tpl.view(file, model);
		return o;
	}
	return null;
}

exports.main = main;
