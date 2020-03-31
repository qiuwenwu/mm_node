const table_name = "wechat_message";

/**
 * 发送消息
 * @param {String} chatId 聊天室ID
 * @param {String} message 推送的消息
 * @param {String} messageType 消息类型, TEXT = 0, IMAGE = 1, URL_LINK = 2, FILE = 3
 */
async function send(chatId, message, messageType = 0) {
	var http = new $.Http();
	var url = "https://ex-api.botorange.com/message/send";
	var param = {
		"chatId": chatId,
		"token": "5e7b7cd965b845007249092c",
		"messageType": messageType,
		"payload": {
			"text": message
		}
	};

	var res = await http.post(url, param);
	if (res.body) {
		$.log.info('send_wechat_msg', res.body);
	}
}

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	console.log(ctx.path, req.body);
	var msg = req.body.data;
	var arr = ctx.path.split('/');
	
	var content = msg.payload.text || '';
	if(content.indexOf('@AI') !== -1 || !msg.roomId)
	{
		content = content.right(' ', true);
		var message = {
			chatid: msg.chatId,
			appid: arr[arr.length - 2],
			msgid: msg.messageId,
			from_user: msg.contactId,
			to_user: "",
			group: msg.roomId || '',
			content,
			name: msg.contactName,
			avatar: msg.avatar,
			type: 1,
			msg_type: msg.type,
		};
		
		var ret = await $.cmd.run(message, db, table_name);
		if (ret) {
			// console.log(ret);
			send(msg.chatId, ret);
		}
	}
	return ret;
};

exports.main = main; 

// {
// 	messageId: '8927273312534256525',
// 	chatId: '5e7b79f8bd6faa1c4e76ac6f',
// 	avatar: 'http://wx.qlogo.cn/mmhead/ver_1/cuUnCvPkicP5lf4dPyUgSt8gg1VmSlIUgia3ia2jvXGswIa7ay893NxNaDYpK7M7AME3Fn3ibbn05dJcsoMTwx3uY9Pdr75icsvtbT9oD4UtWOSk/132',
// 	roomTopic: '',
// 	roomId: '',
// 	contactName: '邱文武',
// 	contactId: 'wxid_wg7yzezkwl1w22',
// 	payload: {
// 		text: '收到'
// 	},
// 	type: 7,
// 	timestamp: 1585151548039,
// 	token: '5e7b7cd965b845007249092c'
// }
