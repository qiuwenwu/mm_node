var plug = $.pool.plugin;


/**
 * @description 接口主函数
 * @param {Object} msg 消息源
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(msg, db) {
	var group = ""; // 如果用户群组为空，则表示个人消息
	var ret = await plug.wechat.chat(msg.FromUserName, msg.ToUserName, group, msg.Content, 1, msg.MsgType, db);
	return ret;
};

exports.main = main;
