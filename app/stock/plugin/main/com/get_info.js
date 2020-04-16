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

/*
f1: 2
最新价 f2: 31.16
涨跌幅 f3: 43.99
涨跌额 f4: 9.52
成交量 f5: 675
成交额 f6: 2098101
振幅 f7: 23.98
换手率 f8: 0.37
市盈率 f9: 27.25
f10: "-"
f11: 0
代码 f12: "300827"
f13: 0
名称 f14: "N上能"
最高 f15: 31.16
最低 f16: 25.97
开盘 f17: 25.97
昨收盘 f18: 21.64
f20: 2285074976
f21: 571274976
f22: 0
市净率 f23: 2.98
涨跌幅 f24: 43.99
f25: 43.99
f62: 2036554
f115: 27.25
f128: "-"
f140: "-"
f141: "-"
f136: "-"
f152: 2
*/

/**
 * 获取所有股票
 */
async function get_stock_list() {
	var hp = new $.Http();

	var url =
		"http://69.push2.eastmoney.com/api/qt/clist/get?cb=jQuery1124007023275733383882_1586573202818&pn=1&pz=100000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1586573202822";
	var res = await hp.get(url, null);
	var str = res.body.between('data":', '});');
	return str.toJson().diff;
}

// 沪市
var h_a = [600, 601, 603];
var h_b = [900];

// 深圳A股
var sz_a = [000];
var sz_b = [200];

// 创业版
var cyb = [300];


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
 * @return {Array} 返回股票信息列表
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

/**
 * 获取股票列表信息
 * @param {Number} 页码
 * @param {size} 分页大小, 默认 100条/页
 * @return {Array} 返回股票列表
 */
async function get_stock(page, size = 100) {
	var list = await get_stock_list();
	if (list.length > 0) {
		var lt = [];
		for (var i = 0; i < list.length; i++) {
			lt.push(model(list[i]));
		}
		return lt;
	}
	return list;
}

module.exports = {
	get_page_count,
	get_page_stock,
	get_stock,
	model,
	get_stock_list
}
