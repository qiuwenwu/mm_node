/**
 * @fileOverview 微信机器人指令(源自微信对话开放平台)
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
var http = new $.Http();
const nJwt = require('njwt');
const config = require('../../core/common.js').config;
const {
	APPID, TOKEN, EncodingAESKey
} = config.talk;

module.exports = {
	/**
	 * @description 指令行为主函数
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async main(msg, db) {
		var { from_user, to_user, group, content, type, msg_type } = msg;
		var ret = "";
		var claims = {
			"username": from_user,
			"msg": content
		};
		
		var jwt = nJwt.create(claims, EncodingAESKey, "HS256");
		var token = jwt.compact();
		
		var res = await http.post('https://openai.weixin.qq.com/openapi/message/' + TOKEN, {
			query: token
		});
		
		if(res.body)
		{
			var answer = res.body.toJson().answer;
			if(answer && answer.indexOf('请问有什么可以帮助您的') === -1)
			{
				ret = answer;
			}
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
