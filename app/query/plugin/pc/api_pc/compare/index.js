const file = __dirname + '/index.html';

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var query = req.query;
	var filename = query["filename"];
	var html = "内容错误";
	var o;
	if(filename){
		html = filename.loadText(__dirname);
	}
	else {
		var article_id = query["article_id"];
		if(article_id){
			db.table = "query_article";
			var list = await db.get({article_id});
			if(list.length){
				o = list[0];
				filename = o.filename;
				if(filename){
					html = filename.loadText(__dirname);
				}
				else if(o.html) {
					html = o.html;
				}
			}
		}
	}
	var model = { content: html, engine: "ydian" };
	
	if(html && o) {
		db.table = "query_result";
		list = await db.get({result_id: o.result_id});
		if(list.length){
			$.push(model, list[0], true);
		}
	}
	return db.tpl.view(file, model);
}

exports.main = main;