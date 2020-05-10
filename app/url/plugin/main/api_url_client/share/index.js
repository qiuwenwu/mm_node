const Energy = require('../../com/energy/index.js');

var energy = new Energy();


/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var {
		url_redirect,
	} = req.query;

	db.table = "url_share";

	var obj = await db.getObj({
		url_redirect
	});
	
	var ret = "";
	if (obj) {
		ret = $.ret.obj({
			url: "/u/" + obj.key
		});
	} else {
		var url = "";
		var try_times = 5;
		for (var i = 0; i < try_times; i++) {
			var key = energy.run(url_redirect);
			var has = await db.getObj({
				key
			});
			if (!has) {
				var host = req.origin;
				var bl = await db.add({
					url_redirect,
					key
				});
				if(bl){
					url = "/u/" + key;
				}
				break;
			}
		}
		if(url){
			 ret =  $.ret.obj({
				url
			})
		}
		else {
			ret = $.ret.error(10000, "生成短域名失败！");
		}
	}
	return ret;
};

exports.main = main;
