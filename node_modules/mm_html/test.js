// const nJwt = require('njwt');
var Http = require('mm_https');
var Html = require('./index.js');
var fs = require("fs");

function file(html){
	return html.replace(/<[^<>]+>/g,'')
}

function model(o) {
	return {
		code: o.eq(0).text().trim(),
		name: o.eq(2).text().trim(),
		time_to_market: o.eq(3).text(),
		num: Number(o.eq(5).text()),
		per: Number(o.eq(7).text()),
		issue_price: Number(o.eq(8).text())
	}
}

/**
 * 获取股票信息
 * @param {Number} page 页码
 */
async function get_stock (page) {
	var hp = new Http();
	var url = `http://vip.stock.finance.sina.com.cn/corp/view/vRPD_NewStockIssue.php?page=${page}&cngem=0&orderBy=NetDate&orderType=desc`;
	var res = await hp.get(url);
	
	// 使用jquery读取节点内容
	var jq = Html(res.body);
	// 获取到单行数据
	var trs = jq('#NewStockTable tbody tr');
	var len = trs.length;
	var list = [];
	for(var i = 2; i < len; i++){
		var o = trs.eq(i);
		var tds = o.children('td');
		if(tds.length > 9){
			var m = model(tds);
			list.push(m);
		}
	}
	return list;
}

/**
 * 获取页数
 */
async function get_pages () {
	var hp = new Http();
	var url = `http://vip.stock.finance.sina.com.cn/corp/view/vRPD_NewStockIssue.php?page=1&cngem=0&orderBy=NetDate&orderType=desc`;
	var res = await hp.get(url);
	
	var html = res.body;
	var mh = html.match(/共[0-9]+页/);
	if(mh){
		var num = mh[0].replace('共', '').replace('页', '');
		return Number(num);
	}
	else {
		return 0;
	}
}

async function test (page) {
	var len = await get_pages();
	console.log(`共${len}页`);
	var list = [];
	for(var i = 0; i < len; i++){
		var lt = await get_stock(i + 1);
		list.addList(lt);
		// 休眠1秒
		$.sleep(1);
		break;
	}
	console.log(list);
	console.log(list.length);
}
test();
