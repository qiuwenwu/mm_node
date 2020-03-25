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
		var form = this.view(msg);
		if (db.msg.stage === 1) {
			var title = "您看填写的信息对吗?\r\n\r\n";
			ret = title + form;
			// 到确认表单阶段
			db.msg.stage = 2;
		} else if (db.msg.stage === 2) {
			var keyword = msg.content.matchs("{不对}");
			if (keyword) {
				ret = "哪里不对?";
			} else {
				var keyword = msg.content.matchs("*没*");
				if (keyword) {
					var title = "已为您找到以下工作:\r\n";
					ret = title + "xxxxxxxxxxx\r\nxxxxxxxxxx";
					db.msg.stage = 3;
				} else {
					var title = "已为您修正:\r\n";
					ret = title + form + "\r\n\r\n还有问题吗?";
				}
			}
		} else {
			// 当状态等于3,直接请求这个
			var title = "已为您找到以下工作:\r\n";
			ret = title + "xxxxxxxxxxx\r\nxxxxxxxxxx";
			db.msg.stage = 3;
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
		db.table = "wechat_message";
		var query = {
			from_user: msg.from_user,
			to_user: msg.to_user,
			group: msg.group,
			type: msg.type,
			end: 1,
			cmd: "job"
		};
		db.size = 10;
		var list = await db.get();

		if (list.length > 0) {
			var obj;
			for (var i = 0, o; o = list[i++];) {
				if (o.form) {
					if (o.stage === 2 || o.stage === 3) {
						obj = o;
						break;
					}
				}
			}
			if (obj) {
				db.msg.form = obj.form;
				db.msg.stage = 2;
			}
		}

		return null;
	}
};
