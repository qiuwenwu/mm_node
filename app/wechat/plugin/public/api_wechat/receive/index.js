/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var appId = "wxab1b19e19011cd8b";
	var encodingAESKey = "HrsCfFmKxvTqDooMfHOOnRhxrcHEuqEYHwoPzXxoGpW";
	var token = "e22AJDuTGcuu262AtGhA";
	var mode = 1; // 1明文模式、2兼容模式、3安全模式（推荐）

	var et = new $.Encrypt(appId, encodingAESKey, token);
	var req = ctx.request;
	var body;
	// console.log(req.query);
	if (req.method === "GET") {
		if (et.sign(req.query)) {
			body = req.query.echostr;
		}
	} else {
		if (mode === 1) {
			obj = req.body.xml;
			var ret = runPlugin(obj);
			body = $.toXml({
				xml: ret
			});
		} else {
			var obj;
			if (et.sign(req.query)) {
				if (mode === 2) {
					// 兼容模式
					obj = req.body.xml;
					delete obj.Encrypt;
				} else if (mode === 3) {
					// 安全模式
					var encrypt = req.body.xml.Encrypt;
					var ret = et.decode(encrypt);
					if (ret) {
						// console.log("原文", ret);
						obj = ret.toXml().xml;
					}
				}

				if (obj) {
					var ret = runPlugin(obj);
					var xml = $.toXml({
						xml: ret
					});
					// console.log(xml);
					encrypt = et.encodeMsg(xml);
					ctx.type = "text/xml";
					body = encrypt;
				}
			}
		}
		return body;
	}
};

exports.main = main;

/**
 * @description 执行插件
 * @param {Object} obj
 * @param {Object} db
 */
function runPlugin(obj, db) {
	var body = {};
	// 如果能取到内容则执行
	var from_user = obj.FromUserName;
	var to_user = obj.ToUserName;

	obj.FromUserName = to_user;
	obj.ToUserName = from_user;

	return obj;
}
