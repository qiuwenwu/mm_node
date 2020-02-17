const fs = require("fs");
const Stock = require("./index");
const Http = require('./https.js');

var stock = new Stock();

/**
 * 执行分析
 * @param {Array} 数据数组
 * @param {Number} d 数日前
 */
function run(arr, d) {
	var now = new Date();
	var date = now.addDays(-d);
	var ar = arr.slice(0, arr.length - d).reverse();
	var vm = {
		H: 5,
		L: 6,
		O: 4,
		C: 7,
		V: 8,
		CHG: 9,
		DATETIME: 3
	};
	console.log("当前收盘价：", ar[ar.length - 1][vm.C]);
	return stock.for_run(ar, vm);
}

async function test(marketId) {
	var num = 560;
	var hp = new Http();
	// "https://www.bw.io/exchange/config/controller/website/marketcontroller/getByWebId";
	var res = await hp.get(`https://www.bw.io/api/data/v1/klines?marketId=${marketId}&type=1D&dataSize=${num}`);
	if (res.body) {
		// 13 曙光初现 11-26
		// 29 死叉
		// 43 金叉 早晨之星
		// 58 阳奉阴违 10-11
		// 116 三只乌鸦 08-16
		// 149 黄昏之星
		// 151 黄昏执行(预) 07-11
		// 153 旭日东升 07-09
		// 158 蜻蜓点水 07-04
		// 164 乌云盖顶 06-27
		// 249 旱地拔葱 04-02
		var ret = run(res.body.toJson().datas, 0);
		var file = "./log.json".fullname(__dirname);
		file.saveText($.toJson(ret, true));
		console.log(ret);
	}
}
test(281);

// 最佳时间是上午十点10:00，下午两点半14:30

// "datas": [
// [
//     "K",          //数据类型，K线数据
//     "281",        //市场id
//     "btc_usdt",   //交易对
//     "1569302520", //时间戳
//     "9741.6",     //开盘价
//     "9741.7",     //最高价
//     "9737.2",     //最低价
//     "9737.3",     //收盘价
//     "5.18",       //成交量
//     "0.0441",     //涨跌幅
//     "1M",         //K线类型，1分钟：1M
//     "50458.35"    //成交额
// ],
// ]
