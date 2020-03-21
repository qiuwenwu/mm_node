var Stock = require('mm_stock');

/**
 * @获取数字货币市场ID
 * @param {String} type 数字货币类型
 */
function get_marketId(type) {
	var id = 0;
	switch (type) {
		case "btc":
			id = 281;
			break;
		case "eth":
			id = 280;
			break;
		case "eos":
			id = 291;
			break;
		case "etc":
			id = 299;
			break;
		case "ltc":
			id = 290;
			break;
		case "dash":
			id = 309;
			break;
		case "zec":
			id = 4010;
			break;
		case "bch":
			id = 3225;
			break;
	}
	return id;
}

/**
 * 获取行情
 * @param {String} type 数字货币类型
 * @param {String} start_time 开始时间
 * @param {String} end_time 截止时间
 * @return {Array} 行情数组
 */
async function get_kline(type, start_time, end_time, n = 1) {
	if(!type)
	{
		return $.ret.error(30001, '类型(type)不能为空!')
	}
	var marketId = get_marketId(type);
	if(!marketId)
	{
		return $.ret.error(30001, '类型(type)值不正确!')
	}
	var ret = null;
	var datetime = new Date();
	var today = datetime.toStr('yyyy-MM-dd');
	if (!end_time) {
		end_time = today;
	}
	 if (!start_time) {
		start_time = end_time.toTime().addDays(-120).toStr('yyyy-MM-dd');
	}
	var num = start_time.toTime().interval(end_time.toTime(), 'day') + n;
	var last = 0;
	if (end_time !== today) {
		last = datetime.getDay() - end_time.toTime().getDay();
		num += last;
	}
	var hp = new $.Http();
	var res = await hp.get(`https://www.bw.io/api/data/v1/klines?marketId=${marketId}&type=1D&dataSize=${num}`);
	if (res.body) {
		var arr = res.body.toJson().datas;
		return arr.slice(last, num).reverse();
	};
	return ret;
}

/**
 * 执行分析
 * @param {Array} 数据数组
 */
function run(arr) {
	var vm = {
		H: 5,
		L: 6,
		O: 4,
		C: 7,
		V: 8,
		CHG: 9,
		DATETIME: 3
	};
	var stock = new Stock();
	return stock.for_run(arr, vm);
}

/**
 * 获取数字货币分析结果
 * @param {String} type 数字货币类型
 * @param {String} start_time 开始时间
 * @param {String} end_time 截止时间
 * @return {Array} 行情数组
 */
async function get_calculate(type, start_time, end_time) {
	var arr = await get_kline(type, start_time, end_time, 60);
	return run(arr);
}

exports.get_kline = get_kline;
exports.get_calculate = get_calculate;