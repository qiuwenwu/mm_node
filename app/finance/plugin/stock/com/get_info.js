function file(html) {
	return html.replace(/<[^<>]+>/g, '')
}

/**
 * 转为模型对象
 * @param {Object} o
 */
function model(o) {
	return {
		// 股票名称
		name: o['f14'],
		// 股票代码
		code: o['f12'],
		// 市盈率
		pe: o['f9'],
		// 市净率
		pb: o['f23']
	};
}

/**
 * 获取页数
 */
async function get_page_count() {
	var hp = new $.Http();
	var res = await hp.get('http://quote.eastmoney.com');
	var url =
		"http://76.push2.eastmoney.com/api/qt/clist/get?cb=jQuery1124010691605428036999_1577075279235&pn=1&pz=100&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1577075279360";
	res = await hp.get(url, null);
	var mh = res.body.match(/"total":[0-9]+,/);
	if (mh) {
		var str = mh[0].replace('"total":', '').replace(',', '');
		var total = Number(str);
		return Math.ceil(total / 100);
	} else {
		return 0;
	}
}

/**
 * 获取股票信息
 * @param {Number} page 页码
 */
async function get_page_stock(page) {
	var hp = new $.Http();
	var url =
		`http://76.push2.eastmoney.com/api/qt/clist/get?cb=jQuery1124010691605428036999_1577075279235&pn=${page}&pz=100&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1577075279360`
	var res = await hp.get(url);

	// 使用jquery读取节点内容
	var body = res.body;
	var str = body.substring(0, body.length - 2).right('(');
	var json = str.toJson();
	if (json && json.data) {
		var lt = json.data.diff;
		var len = lt.length;
		var list = [];
		for (var i = 0; i < len; i++) {
			var m = model(lt[i]);
			list.push(m);
		}
	}

	return list;
}

async function get_stock(page) {
	var len = await get_page_count();
	var list = [];
	for (var i = 0; i < len; i++) {
		var lt = await get_page_stock(i + 1);
		list.addList(lt);
		// 休眠1秒
		$.sleep(200);
	}
	return list;
}

exports.get_page_count = get_page_count;
exports.get_page_stock = get_page_stock;
exports.get_stock = get_stock;
