const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * @description  Api接口类
 * @extends {Index}
 * @class
 */
class Api extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "api";
	}
}

/**
 * @description 接口排序
 */
Api.prototype.sort = function() {
	this.list.sort(function(o1, o2) {
		var p1 = o1.config.path;
		var p2 = o2.config.path;
		var n = p2.length - p1.length;
		if(n)
		{
			return n;
		}
		else {
			return o1.config.sort - o2.config.sort;
		}
	});
};

/**
 * 执行Api
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object|String}
 */
Api.prototype.run = async function(ctx, db) {
	if (!db) {
		db = {
			ret: null
		};
	}
	const path = ctx.request.path;
	var lt = this.list;
	for (var i = 0, o; o = lt[i++];) {
		if (o.onOff && path.has(o.config.path)) {
			var ret = await o.run(ctx, db);
			if (ret) {
				db.ret = ret;
				break;
			}
		}
	}
	return db.ret;
};

/**
 * @module 导出API类
 */
exports.Api = Api;


/**
 * @description 创建全局管理器
 */
if (!$.pool.api) {
	$.pool.api = {};
}

/**
 * @description API管理器,用于创建缓存
 * @param {string} scope 作用域
 * @return {Object} 返回一个缓存类
 */
function api_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.api[scope];
	if (!obj) {
		$.pool.api[scope] = new Api(scope);
		obj = $.pool.api[scope];
	}
	return obj;
}
/**
 * @module 导出API管理器
 */
exports.api_admin = api_admin;
