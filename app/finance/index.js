/**
 * @fileOverview stock
 * @author <a href="作者主页地址">应用作者</a>
 * @version 1.0
 */

// 创建插件功能
var plugins = $.plugin_admin('stock');
plugins.update(__dirname);

/**
 * @description 应用对象
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
	 * @description 应用
	 * @param {String} item 应用项
	 * @return {Object} 旗下应用和信息
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
	}
};
