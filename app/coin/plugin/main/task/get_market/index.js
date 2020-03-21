const market = require('../../com/market.js');

/**
 * 渲染
 * @param {Array} list
 */
function render(list) {
	var date = new Date().toStr('yyyy-MM-dd');
	var text = `今日测评(${date}) ↓↓`;
	var len = list.length;
	for (var i = 0; i < len; i++) {
		var o = list[i];
		text += "\r\n\r\n数字货币: " + o.type;
		text += "\r\n技术分析: " + o.tip;
		text += "\r\n评定结果: " + o.predict;
		text += "\r\n建议操作: " + o.action;
	}
	return text;
}

/**
 * 发送微信消息
 * @param {String} message
 */
async function send_wechat_msg(message) {
	var http = new $.Http();
	var url = "https://ex-api.botorange.com/message/send";
	var param = {
		"chatId": "5e56789bbd6faa1c4e5b92fd",
		"token": "5e56789bb0f3090039a80eb5",
		"messageType": 0,
		"payload": {
			"text": message
		}
	};
	
	await http.post(url, param);
	
	param["chatId"] = "5e245b53bd6faa1c4e5cdaa0";
	http.post(url, param);
}


async function main() {
	var arr = ["btc", "eth", "eos", "bch", "etc", "ltc", "dash", "zec"];
	var len = arr.length;
	var list = [];
	var today = new Date().toStr('yyyy-MM-dd') + ' 00:00:00';
	for (var i = 0; i < len; i++) {
		var o = arr[i];
		var lt = await market.get_calculate(o);
		if (lt && lt.length > 0) {
			var item = lt[lt.length - 1];
			if(item.datetime !== today){
				break;
			}
			if (item.action && item.tip){
				item.type = o;
				list.add(item);
			}
		}
	}
	if (list.length > 0) {
		var msg = render(list);
		send_wechat_msg(msg);
	}
	else {
		var msg = `今日测评(${date}) ↓↓`;
		send_wechat_msg(msg + "今日走势不明");
	}
};

/**
 * @description 定时任务函数
 */
exports.main = main;
