const fs = require('fs');
const iconv = require('iconv-lite');

var sql = $.mysql_admin('sys', __dirname);
sql.setConfig($.config.mysql);
sql.open();

var db = sql.db();
db.table = "stock_info";

var list_db = {
	"0": [],
	"3": [],
	"6": []
};

function add_db() {
	list_db['0'] = [];
	list_db['3'] = [];
	list_db['6'] = [];
	for (var i = 0; i < 10; i++) {
		var db3 = sql.db();
		db3.table = "stock_market_0_" + i;
		list_db["0"].push(db3);

		var db0 = sql.db();
		db0.table = "stock_market_3_" + i;
		list_db["3"].push(db0);

		var db6 = sql.db();
		db6.table = "stock_market_6_" + i;
		list_db["6"].push(db6);
	}
}

function del_db() {
	db_list = null;
}

/**
 * 获取今日数据
 * @param {Array} list
 */
async function today(list) {
	var url = 'http://hq.sinajs.cn/list=';
	var query = "";
	var len = list.length;
	for (var i = 0; i < len; i++) {
		var o = list[i];
		query += ',sh' + o.code;
	}
	var hp = new $.Http();
	var str = await hp.get_fast(url + query.substring(0)).body;
	if (str) {
		str = str.replace(/var hq_str_sh/g, '[').replace(/="/g, ',').replace(/;/g, ',');
		var arr = ('[' + str + ']').toJson();
		var num = arr.length;
		for (var i = 0; i < num; i++) {
			var m = model(arr[i]);
		}
	}
}

function model(o) {
	return {
		code: o[1],
		HIGH: Number(o[4]),
		LOW: Number(o[5]),
		OPEN: Number(o[6]),
		CLOSE: Number(o[3]),
		LCLOSE: Number(o[8]),
		VOL: Number(o[9]),
		CHG: Number(o[7]),
		TOTAL: Number(o[10]),
		DATETIME: o[0].replace(/\//g, '-')
	}
}


/*
"2020-04-10,
5.57,
5.33,
5.57,
5.32,
37364,
20195922.00,
4.48"
*/

// function model(o) {
// 	return {
// 		code: o[1],
// 		HIGH: Number(o[4]),
// 		LOW: Number(o[5]),
// 		OPEN: Number(o[6]),
// 		CLOSE: Number(o[3]),
// 		LCLOSE: Number(o[8]),
// 		VOL: Number(o[9]),
// 		CHG: Number(o[7]),
// 		TOTAL: Number(o[10]),
// 		DATETIME: o[0]
// 	}
// }

/**
 * @param {String} code 股票代码
 * @param {Date} date 最后截至日期
 * @param {Number} num
 */
async function history(code, date, num) {
	var end = date.toStr('yyyyMMdd');
	var start = date.addDays(-num).toStr('yyyyMMdd');
	var codeH = code.indexOf('6') !== -1 ? 0 : 1;

	// 昨日收盘价LCLOSE;
	// http://quotes.money.163.com/service/chddata.html?code=1300344&start=20120720&end=20191225&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP
	var url =
		`http://quotes.money.163.com/service/chddata.html?code=${codeH}${code}&start=${start}&end=${end}&fields=TCLOSE;HIGH;LOW;TOPEN;PCHG;LCLOSE;VOTURNOVER;VATURNOVER`

	var hp = new $.Http();
	// await hp.get('http://quotes.money.163.com/');
	var res = await hp.get(url);
	var list = [];
	if (res.body) {
		var body = iconv.decode(res.binary, 'GBK').replace(/'/g, '');
		var arr = body.split('\r\n');
		if (arr.length > 2) {
			var len = arr.length - 1;
			for (var i = 1; i < len; i++) {
				var o = arr[i].split(',');
				var m = model(o);
				list.push(m);
			}
		}
	}
	return list;
}
/**
 * 添加或修改到数据库修改365 * 2 =  
 */
async function set(code, num = 730) {
	var date = new Date();
	var list = await history(code, date, num, 0);

	var key = "0";
	if (code.indexOf('3') === 0) {
		key = "3"
	} else if (code.indexOf('6') === 0) {
		key = "6"
	} else {
		key = "0"
	}
	var db = list_db[key][code.substr(code.length - 1, 1)];
	// console.log(db.table);
	var len = list.length;
	// console.log(code, list);
	for (var i = 0; i < len; i++) {
		var o = list[i];
		db.addOrSet({
			code: o.code,
			DATETIME: o.DATETIME
		}, o);
		// console.log(db.error, db.sql);
	}
	// $.log.info(code);
}

// SELECT * FROM `stock_market` where `close` > 1000 GROUP BY `code`;
// history('600004', new Date(), 100);

async function get_stock_code() {
	// var arr = await db.getSql('`pe` > 0 && `pb` > 0', '', 'code');
	// return arr;
	return await db.get();
	// history(arr[i], date, num);
}

/**
 * 获取行情
 */
async function get_market(sql) {
	var arr = await get_stock_code();
	var len = arr.length;
	$.log.info(`共${len}个股票`);
	for (var i = 0; i < len; i++) {
		await set(arr[i].code);
	}
}


// SELECT * FROM `stock_market` where `close` > 1000 GROUP BY `code`;

/**
 * 获取行情(B类) , B类的网易检索代码为1开头
 */
async function get_marketB() {
	var arr = await db.run('SELECT `code` FROM `stock_market` where `close` > 1000 GROUP BY `code`;');
	await db.exec('DELETE from `stock_market` where `close` > 1000;');
	var len = arr.length;
	$.log.info(`共${len}个股票`);
	for (var i = 0; i < len; i++) {
		set(arr[i].code, 730);
	}
}

add_db()

module.exports = {
	history,
	get_stock_code,
	get_market,
	get_marketB
};

// http://money.stock.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sh000001&scale=60&ma=1&datalen=1023
// http://q.stock.sohu.com/hisHq?code=cn_${code}&start=20130930&end=${today}&stat=1&order=D&period=d&callback=historySearchHandler&rt=jsonp
