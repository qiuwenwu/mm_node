var plug = $.pool.plugin;

$.cmd = $.cmd_admin('wechat');
$.cmd.update();

/**
 * @description 接口主函数
 * @param {Object} msg 消息源
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(msg, db) {
	var group = ""; // 如果用户群组为空，则表示个人消息
	console.log(msg);
	var message = {
		appid: msg.appid,
		msgid: msg.MsgId,
		from_user: msg.ToUserName,
		to_user: msg.FromUserName,
		group: msg.group || '',
		content: msg.Content, 
		type: 1,
		msg_type: msg.MsgType
	};
	var table_name = "wechat_message";
	return $.cmd.run(message, db, table_name);
};

exports.main = main;
