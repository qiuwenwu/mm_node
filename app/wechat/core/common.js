const config = (__dirname + "/config.json").loadJson();
var http = new $.Http();

/**
 * @description 获取密钥
 * @param {String} AppId
 * @param {Object} db 数据库管理器
 * @return {String} 返回应用密钥AppSecret
 */
async function get_secret(AppId, db) {
	var AppSecret = "";
	var cg = await get_config(AppId, db);
	if (cg && AppId == cg.AppId) {
		AppSecret = cg.AppSecret;
	}
	return AppSecret;
}

/**
 * 获取临时访问牌
 * @param {String} AppId 应用ID
 * @param {Object} db 数据库管理器
 * @return {String} 获取到返回临时访问牌,否则返回空
 */
async function get_token(AppId, db) {
	var token = await $.cache.get('wechat_' + AppId);
	if (!token) {
		var AppSecret = await get_secret(AppId, db);
		if (!AppSecret) {
			return null;
		}
		var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&AppId=${AppId}&secret=${AppSecret}`;
		var res = await http.get(url);
		if (res.body) {
			var json = res.body.toJson();
			token = json.access_token;
			$.cache.set('wechat_' + AppId, token, json.expires_in);
		}
	}
	return token;
}

/**
 * 获取公众号配置信息, 如果是单个微信则直接返回配置文件即可
 * @param {String} AppId 应用ID
 * @param {Object} db 数据库管理器
 * @return {String} 获取到返回临时访问牌,否则返回空
 */
async function get_config(AppId, db) {
	var cg = null;
	if (config && config.public) {
		var arr = config.public;
		for (var i = 0; i < arr.length; i++) {
			var o = arr[i];
			if (AppId === o.AppId) {
				cg = o;
				break;
			}
		}
	}
	return cg;
}


/**
 * 获取微信对话开放平台应用信息
 * @param {String} AppId 应用ID
 * @param {Object} db 数据库管理器
 * @return {String} 获取到返回临时访问牌,否则返回空
 */
async function get_talk_config(AppId, db) {
	var cg = null;
	if (config && config.talk) {
		var arr = config.talk;
		for (var i = 0; i < arr.length; i++) {
			var o = arr[i];
			if (AppId === o.AppId) {
				cg = o;
				break;
			}
		}
	}
	return cg;
}

module.exports = {
	get_token,
	get_config,
	config
};
