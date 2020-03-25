/**
 * @fileOverview 微信机器人指令(源自图灵)
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
var http = new $.Http();
const apikey = "4bc2898824ef60010d91c23effe5c45f";

/**
 * 获取用户ID
 * @param {Object} db 数据管理器
 * @param {String} msg 消息
 * @return {Number} 返回联系人ID
 */
async function get_user_id(db, msg) {
	var userId = 0;
	var _db = Object.assign({}, db);
	_db.table = "wechat_contact";
	_db.key = "contact_id";
	var account = msg.from_user;
	var obj = await _db.getObj({
		account
	});
	if (!obj) {
		var bl = await _db.add({
			account: msg.from_user,
			avatar: msg.avatar,
			nickname: msg.name
		});
		if (bl) {
			obj = await _db.getObj({
				account
			});
		}
	}
	if (obj) {
		userId = obj.contact_id;
	}
	return userId;
}

module.exports = {
	/**
	 * @description 指令行为主函数
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async main(msg, db) {
		var {
			from_user,
			to_user,
			group,
			content,
			type,
			msg_type
		} = msg;
		var userId = await get_user_id(db, msg);
		var pm = {
			"reqType": 0,
			"perception": {
				"inputText": {
					"text": content
				},
				"selfInfo": {
					"location": {
						"city": "深圳",
						"province": "广东",
						"street": "粤海街道"
					}
				}
			},
			"userInfo": {
				"apiKey": apikey,
				"userId": userId
			}
		};
		console.log(pm);
		var res = await http.post("http://openapi.tuling123.com/openapi/api/v2", pm, null, 'json');
		var ret;
		if (res && res.body) {
			try {
				var result = res.body.toJson().results[0].values.text;
				if (result.indexOf('次数超限') === -1) {
					ret = result;
				} else {
					console.warn(result)
				}
			} catch (e) {
				//TODO handle the exception
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
