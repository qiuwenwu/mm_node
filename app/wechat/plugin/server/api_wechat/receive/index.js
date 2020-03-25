const get_config = require('../../core/common.js').get_config;

// 创建一个wechat事件
var event_wechat = $.event_admin('wechat');
event_wechat.update('/app/wechat/');

/**
 * @description 执行事件
 * @param {Object} msg 消息
 * @param {Object} db
 */
async function run_event(msg, db) {
	var body = {};
	var ret = await event_wechat.run(msg.MsgType, msg, db);
	var xml = "";
	if (ret) {
		if (typeof(ret) === "object") {
			if (ret.MsgType) {
				delete msg.MsgType;
			}
			var model = Object.assign(ret, msg);
			xml = db.tpl.view('./' + model.MsgType + '.xml', model);
		} else if (ret.trim().indexOf("<xml>") === 0) {
			xml = ret;
		} else {
			msg.Content = ret;
			xml = db.tpl.view('./text.xml', msg);
		}
	}
	return xml;
}

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var arr = ctx.path.split('/');
	var AppId = arr[arr.length - 1];
	if (!AppId) {
		return "路径格式不正确, 应该为: /api/wechat_receive/{AppId}";
	}

	var config = await get_config(AppId, db);
	if (!config) {
		return "未注册的应用ID:" + AppId;
	}

	var {
		AppId,
		EncodingAESKey,
		Token
	} = config;

	var mode = 3; // 1明文模式、2兼容模式、3安全模式（推荐）

	var et = new $.Encrypt(AppId, EncodingAESKey, Token);
	var req = ctx.request;
	var query = req.query;
	var body;
	if (req.method === "GET") {
		if (!query['signature']) {
			body = "签名(signature) 字符串是必须的！"
		} else if (et.sign(query)) {
			if (query['echostr']) {
				body = query['echostr'];
			} else {
				body = "输出字符串(echostr) 参数是必须的！"
			}
		} else {
			body = "请用微信公众号访问"
		}
	} else {
		db.wechat_config = config;
		db.tpl.dir = "/app/wechat/static/tpl/";

		if (mode === 1) {
			var msg = req.body.xml;
			if (msg) {
				var ret = await run_event(msg, db);
				if (ret) {
					body = ret;
					ctx.type = "text/xml";
				} else {
					body = "success"
				}
			}
		} else {
			var msg;
			if (et.sign(query)) {
				if (mode === 2) {
					// 兼容模式
					msg = req.body.xml;
					delete msg.Encrypt;
				} else if (mode === 3) {
					// 安全模式
					var encrypt = req.body.xml.Encrypt;
					var ret = et.decode(encrypt);
					if (ret) {
						// console.log("原文", ret);
						msg = ret.toXml().xml;
					}
				}

				if (msg) {
					msg.appid = AppId;
					var xml = await run_event(msg, db);
					if (xml) {
						encrypt = et.encodeMsg(xml);
						ctx.type = "text/xml";
						body = encrypt;
					} else {
						body = "success"
					}
				}
			}
		}
	}
	return body;
};

exports.main = main;
