var Stock = require('mm_stock');

var dict = {
	"btc": 281,
	"eth": 280,
	"eos": 291,
	"etc": 299,
	"ltc": 290,
	"dash": 309,
	"zec": 4010,
	"bch": 3225
};

/**
 * @获取数字货币市场ID
 * @param {String} type 数字货币类型
 */
function get_marketId(type) {
	var id = dict[type];
	return id || 0;
}

/**
 * 获取行情
 * @param {String} type 数字货币类型
 * @param {String} start_time 开始时间
 * @param {String} end_time 截止时间
 * @param {Number} n 获取条数
 * @return {Array} 行情数组
 */
async function get_kline(type, start_time, end_time, n = 1) {
	if (!type) {
		return $.ret.error(30001, '类型(type)不能为空!')
	}
	var marketId = get_marketId(type);
	if (!marketId) {
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
	var num = start_time.toTime().interval(datetime, 'day') + n;
	var last = end_time.toTime().interval(datetime, 'day');
	// console.log('条数', start_time, end_time, num, last);
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

/**
 * 渲染
 * @param {Array} list 分析结果列表
 * @param {String} datetime 测评的日期时间
 * @param {Boolean} fill 是否返回不明走势
 * @return {String} 返回可读的走势
 */
function render(list, datetime, fill = true) {
	if (datetime) {
		datetime = new Date(datetime).toStr('yyyy-MM-dd');
	} else {
		datetime = new Date().toStr('yyyy-MM-dd');
	}
	var text = "";
	if(datetime == new Date().toStr('yyyy-MM-dd')){
		text = `今日测评(${datetime}) ↓↓`;
	}
	else {
		text = `${datetime}测评 ↓↓`;
	}
	
	var len = list.length;
	if (len) {
		for (var i = 0; i < len; i++) {
			var o = list[i];
			if (o.action && o.tip) {
				text += "\r\n\r\n数字货币: " + o.type;
				text += "\r\n技术分析: " + o.tip;
				text += "\r\n评定结果: " + o.predict;
				text += "\r\n建议操作: " + o.action;
			} else if (fill) {
				text += "\r\n\r\n数字货币: " + o.type;
				text += "\r\n技术分析: (走势不明)";
				text += "\r\n评定结果: (无)";
				text += "\r\n建议操作: 观察";
			}
		}
	} else {
		text = "无结果(原因: 不支持的货币类型 或 获取行情错误)";
	}
	return text;
}

async function get_sub(list, type, date, datetime){
	var lt = await get_calculate(type, null, date);
	if (lt && lt.length > 0) {
		for (var i = lt.length - 1; i > 0; i--) {
			var item = lt[i];
			if (item.datetime == datetime) {
				item.type = type;
				list.add(item);
				break;
			}
		}
	}
}

/**
 * 获取股票分析结果
 * @param {Array} arr 查询的币种
 * @param {String} datetime 查询的时间
 * @return {String} 返回分析结果
 */
async function get(arr = ["btc", "eth", "eos", "bch", "etc", "ltc", "dash", "zec"], datetime, fill) {
	var len = arr.length;
	var list = [];
	var date = datetime ? new Date(datetime).toStr('yyyy-MM-dd') : new Date().toStr('yyyy-MM-dd');
	datetime = date + ' 00:00:00';
	for (var i = 0; i < len; i++) {
		await get_sub(list, arr[i], date, datetime);
	}
	return render(list, datetime);
};

exports.get = get;
exports.get_kline = get_kline;
exports.get_calculate = get_calculate;
