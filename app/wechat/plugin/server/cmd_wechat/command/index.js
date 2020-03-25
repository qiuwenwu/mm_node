/**
 * @fileOverview 快递查询的指令
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
		var ret = "";
		ret = "指令已取消";
		console.log(db.msg);
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
