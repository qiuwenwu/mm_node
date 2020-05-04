const Energy = require('../../com/energy/index.js');

var energy = new Energy();

/**
 * 是否仅有
 * @param {Array} arr_name
 * @param {String} str_name
 */
function only(arr_name, str_name) {
	var bl = true;
	for (var i = 0; i < arr_name.length; i++) {
		var name = arr_name[i];
		if (str_name.indexOf(name) === -1) {
			bl = false;
			break;
		}
	}
	return bl;
}

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var {
		count,
		number,
		url,
		type,
		list,
		score_min,
		price_max,
		name_only,
		page_now,
		page_size,
		number_has,
		number_not,
		number_only,
		price
	} = ctx.request.query;
	url = url || "http://lianghao365.com/api/number?cityID=6&kid=1&&page={page_now}&pageSize={page_size}&number={number_has}&bubaohan={number_not}&max={price_max}&onlynum={number_only}";
	count = count || "count";
	number = number || "number";
	type = type || "jobj";
	list = list || "list";
	price = price || "price";
	score_min = score_min || 1;
	price_max = price_max || 9999999;
	page_size = page_size || 10000;
	page_now = page_now || 1;
	number_has = number_has || "";
	number_only = number_only || "";
	name_only = name_only || "天医 延年 生气 伏位 六煞 五鬼 祸害 绝命 潜藏 显露";
	number_not = number_not || "";
	var http = new $.Http();
	var u = url.replace(`{page_size}`, page_size).replace(`{page_now}`, page_now).replace(`{number_has}`, number_has).replace(`{number_not}`, number_not).replace(`{price_max}`, price_max).replace(`{number_only}`, number_only);
	// console.log(u);
	var {
		body
	} = await http.get(u);
	var arr = [];
	if (body) {
		var json = body.toJson();
		if (json) {
			var lt = json;
			var arr_k = list.split('.');
			if (arr_k.length === 1) {
				lt = json[list];
			} else {
				for (var i = 0; i < arr_k.length; i++) {
					var key = arr_k[i];
					lt = lt[key];
					if (!lt) {
						break;
					}
				}
			}
			if (lt) {
				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];
					var ret = energy.run(o[number]);
					if (ret.score >= score_min && only(ret.name, name_only)) {
						arr.push(Object.assign({}, o, ret));
					}
				}
			}
		}
	}
	return arr.sort(function(a, b) {
		var n = a[price] - b[price];
		if (n == 0) {
			return a.score - b.score;
		}
		return n;
	});
};

// http://localhost:5000/api/geomancy/list?list=data.list&score_min=20&price=maiJia&price_max=300&name_only=天医 延年 生气 伏位&page_now=1&page_size=100000&number_has=188_
// http://localhost:5000/api/geomancy/list?list=data.list&score_min=2&price=maiJia&price_max=1000&name_only=天医 延年 生气 伏位&page_now=1&page_size=100000&number_not=47502
exports.main = main;
