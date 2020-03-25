/**
 * @fileOverview 微信机器人指令(源自微信对话开放平台)
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
var http = new $.Http();

module.exports = {
	/**
	 * @description 指令行为主函数
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async main(msg, db) {
		var ret;
		var res = await http.post('http://127.0.0.1:5000/api/wechat/cmd/' + msg.appid, msg);
		if(res.body)
		{
			ret = res.body;
		}
		return ret;
	},

	/**
	 * 执行前
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器
	 * @return {Object} 执行结果
	 */
	async run_before(msg, db) {
		return null;
	}
};
