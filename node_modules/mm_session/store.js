const crypto = require('crypto');
const CacheBase = require('mm_cachebase');


if (!$.cache) {
	$.cache = new CacheBase();
}

/**
 * @class 缓存
 */
class Store {
	/**
	 * @description 构造函数
	 * @param {String} key 键
	 * @constructor
	 */
	constructor(key) {
		if (key) {
			this.key = key + "_";
		} else {
			this.key = $.dict.session_id + "_";
		}
	}
}

/**
 * @description 获取session ID
 * @param {Object} ctx HTTP上下文
 */
Store.prototype.getID = async function(ctx) {
	var hd = ctx.request.header;
	var agent = hd['user-agent'];
	if (!agent) {
		agent = "mm";
	}
	var start = agent.md5().substring(0, 32);
	var stamp = Date.parse(new Date()) / 1000;
	var uuid = (ctx.ip + '_' + stamp).aes_encode(start);
	return uuid;
};

/**
 * @description 获取session缓存
 * @param {String} uuid 客户端唯一ID
 */
Store.prototype.get = async function(uuid) {
	if (!$.cache.has(this.key + uuid)) return undefined;
	// 我们正在解码数据来自我们的srote, 我们假定它是在储存之前
	var val = await $.cache.get(this.key + uuid);
	if (val) {
		return JSON.parse(val);
	} else {
		return null;
	}
};

/**
 * @description 设置session到缓存
 * @param {Object} obj 
 * @property {String} obj.uuid 客户端唯一表示ID
 * @property {Number} obj.maxAge 最大寿命
 * @param {Object} ctx HTTP请求上下文
 */
Store.prototype.set = async function(session, {
	uuid,
	maxAge
} = {}, ctx) {
	if (!uuid) {
		uuid = await this.getID(ctx);
	}
	if (!maxAge) {
		maxAge = 7200;
	}
	try {
		$.cache.set(this.key + uuid, JSON.stringify(session), maxAge);
	} catch (err) {
		console.log('Set session error:', err);
	}
	return uuid;
};

/**
 * @description 销毁缓存
 * @param {String} uuid
 */
Store.prototype.destroy = function(uuid) {
	$.cache.del(this.key + uuid);
};

module.exports = Store;
