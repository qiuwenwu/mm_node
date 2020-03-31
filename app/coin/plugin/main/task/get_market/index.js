const market = require('../../com/market.js');

/**
 * 发送微信消息
 * @param {String} message
 */
async function send_wechat_msg(message) {
	// console.log('入戏', message);
	var http = new $.Http();
	var url = "https://ex-api.botorange.com/message/send";
	var param = {
		"chatId": "5e7b8497bd6faa1c4e76dee6",
		"token": "5e7b7cd965b845007249092c",
		"messageType": 0,
		"payload": {
			"text": message
		}
	};
	
	var res = await http.post(url, param);
	if (res.body) {
		$.log.info('send_wechat_msg', res.body);
	}
	param["chatId"] = "5e812c6dbd6faa1c4e9a8a47";
	await http.post(url, param);
}


async function main(){
	var msg = await market.get();
	if (msg) {
		await send_wechat_msg(msg);
	} else {
		var msg = `今日测评(${date}) ↓↓`;
		await send_wechat_msg(msg + "今日走势不明");
	}
}

/**
 * @description 定时任务函数
 */
exports.main = main;