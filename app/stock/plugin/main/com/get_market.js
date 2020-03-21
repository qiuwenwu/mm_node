const fs = require('fs');
const iconv = require('iconv-lite');

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
		VOL: Number(o[8]),
		CHG: Number(o[7]),
		TOTAL: Number(o[9]),
		DATETIME: o[0].replace(/\//g, '-')
	}
}

/**
 * @param {String} code 股票代码
 * @param {Date} date 最后截至日期
 * @param {Number} num
 */
async function history(code, date, num, codeH = 0) {
	var end = date.toStr('yyyyMMdd');
	var start = date.addDays(-num).toStr('yyyyMMdd');
	// 昨日收盘价LCLOSE;
	var url =
		`http://quotes.money.163.com/service/chddata.html?code=${codeH}${code}&start=${start}&end=${end}&fields=TCLOSE;HIGH;LOW;TOPEN;PCHG;VOTURNOVER;VATURNOVER`
	var hp = new $.Http();
	var res = await hp.get(url);
	var list = [];
	if (res.body) {
		var body = iconv.decode(res.binary, 'GBK').replace(/'/g, '');
		var arr = body.split('\r\n');
		if (arr.length > 2) {
			var len = arr.length - 1;
			for (var i = 1; i < len; i++) {
				var o = arr[i].split(',');
				if (Number(o[3]) > 1000 && codeH === 0) {
					list = await history(code, date, num, 1);
					break;
				} else {
					var m = model(o);
					list.push(m);
				}
			}
		} else if (codeH === 0) {
			list = await history(code, date, num, 1);
		}
	}
	return list;
}
// http://quotes.money.163.com/service/chddata.html?code=1300344&start=20120720&end=20191225&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP

/**
 * 添加或修改到数据库修改724
 */
async function set(code, db, num = 724) {
	var date = new Date();
	var list = await history(code, date, num);
	db.table = "stock_stock_market";
	var len = list.length;
	for (var i = 0; i < len; i++) {
		var o = list[i];
		await db.addOrSet({
			code: o.code,
			DATETIME: o.DATETIME
		}, o);
	}
}

// SELECT * FROM `stock_stock_market` where `close` > 1000 GROUP BY `code`;
// history('600004', new Date(), 100);

async function get_stock_code(db) {
	db.table = "stock_stock";
	var arr = await db.getSql('`pe` > 0 && `pb` > 0', '', 'code');
	return arr;
	// history(arr[i], date, num);
}

/**
 * 获取行情
 */
async function get_market(db) {
	var arr = await get_stock_code(db);
	var len = arr.length;
	$.log.debug(`共${len}个股票`);
	for (var i = 0; i < len; i++) {
		await set(arr[i].code, db);
	}
}


// SELECT * FROM `stock_stock_market` where `close` > 1000 GROUP BY `code`;

/**
 * 获取行情(B类) , B类的网易检索代码为1开头
 */
async function get_marketB(db) {
	var arr = await db.run('SELECT `code` FROM `stock_stock_market` where `close` > 1000 GROUP BY `code`;');
	await db.exec('DELETE from `stock_stock_market` where `close` > 1000;');
	var len = arr.length;
	$.log.debug(`共${len}个股票`);
	for (var i = 0; i < len; i++) {
		await set(arr[i].code, db, 723);
	}
}

exports.get_stock_history = history;
exports.get_stock_code = get_stock_code;
exports.get_market = get_market;
exports.get_marketB = get_marketB;

// http://money.stock.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sh000001&scale=60&ma=1&datalen=1023
// http://q.stock.sohu.com/hisHq?code=cn_${code}&start=20130930&end=${today}&stat=1&order=D&period=d&callback=historySearchHandler&rt=jsonp
