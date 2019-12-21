/**
 * @fileOverview pay
 * @author <a href="作者主页地址">插件作者</a>
 * @version 1.0
 */

// 创建应用
var plugins = $.plugin_admin('pay');
plugins.update(__dirname);

/**
 * @description 插件对象
 */
module.exports = {
	/**
	 * @description 初始化
	 * @param {Object} option 配置参数
	 * @return {String} 成功返回null, 否则返回错误提示
	 */
	init(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 安装
	 * @param {Object} option 配置参数
	 * @return {String} 成功返回null,否则返回错误提示
	 */
	install(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 卸载
	 * @param {Object} option 配置参数
	 * @return {String} 成功返回null,否则返回错误提示
	 */
	uninstall(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 更新
	 * @param {Object} option 配置参数
	 * @return {String} 成功返回null, 否则返回错误提示
	 */
	update(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 启动
	 * @param {Object} opiton 配置参数
	 * @return {String} 成功返回null,否则返回错误提示
	 */
	start(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 暂停
	 * @param {Object} opiton 配置参数
	 * @return {String} 成功返回null,否则返回错误提示
	 */
	stop(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 结束
	 * @param {Object} opiton 配置参数
	 * @return {String} 成功返回null,否则返回错误提示
	 */
	end(option) {
		var msg = null;
		return msg;
	},

	/**
	 * @description 插件
	 * @param {String} item 插件项
	 * @return {Object} 旗下插件和信息
	 */
	help(item) {
		var tip = "";
		switch (item) {
			case "run":
				break;
			default:
				break;
		}
		return tip;
	},

	/**
	 * @description 主程序
	 * @param {Object} param1 参数1
	 * @param {Object} param2 参数2
	 * @return {Object} 返回执行结果
	 */
	main(param1, param2) {
		var ret = null;
		return ret;
	},

	/**
	 * @description 指令（类似命令提示符）
	 * @param {String} content 指令内容
	 * @return {String} 执行结果
	 */
	cmd(content) {
		var ret = "";
		return ret;
	},

	/**
	 * @description API接口（用于其他插件调用该插件时）
	 * @param {Object} ctx HTTP上下文
	 * @param {Object} db 数据库管理器
	 * @return {Object} 执行结果
	 */
	api(ctx, db) {
		var ret = "";
		return ret;
	},

	/**
	 * @description 聊天（通过聊天的方式驱动插件, 用于机器人开发）
	 * @param {String} from_user 发送消息人
	 * @param {String} to_user 接收消息人
	 * @param {String} content 内容
	 * @param {String} group 群组 如果是个人，群组为空
	 * @param {Number} type 群类型, 1永久会话/群、2临时会话/群
	 * @param {String} msg_type 消息类型, event事件型、message消息型。默认消息型
	 * @param {Object} 数据管理器
	 * @return {String} 回复内容
	 */
	async chat(from_user, to_user, group, content, type, msg_type, db) {
		var ret = "";
		return ret;
	}
};
