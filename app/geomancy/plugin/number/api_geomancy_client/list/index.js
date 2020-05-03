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
		page,
		size,
		count,
		number,
		url,
		type,
		list,
		score_min,
		price,
		price_max,
		name_only,
		page_now,
		page_size,
		number_has
	} = ctx.request.query;
	url = url || "http://lianghao365.com/api/number?cityID=6&kid=1&&page={page}&pageSize={size}&number={number}";
	count = count || "count";
	number = number || "number";
	size = size || "size";
	page = page || "page";
	type = type || "jobj";
	list = list || "list";
	price = price || "price";
	score_min = score_min || 1;
	price_max = price_max || 9999999;
	page_size = page_size || 10000;
	page_now = page_now || 1;
	number_has = number_has || "";
	name_only = name_only || "天医 延年 生气 伏位 六煞 五鬼 祸害 绝命 潜藏 显露";
	var http = new $.Http();
	var u = url.replace(`{${size}}`, page_size).replace(`{${page}}`, page_now).replace(`{${number}}`, number_has);
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
					if (o[price] && o[price] <= price_max) {
						var ret = energy.run(o.number);
						if (ret.score >= score_min && only(ret.name, name_only)) {
							arr.push(Object.assign({}, o, ret));
						}
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

// http://localhost:5000/api/geomancy/list?list=data.list&score_min=40&price=maiJia&price_max=300&name_only=天医 延年 生气 伏位&page_now=1&page_size=100000&number_has=188_

exports.main = main;
