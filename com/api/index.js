const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

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
		
		/// 接口排序
		Api.prototype.sort = function() {
			this.list.sort(function(o1, o2) {
				var p1 = o1.config.path;
				var p2 = o2.config.path;
				return p2.length - p1.length;
			});
		};
		
		/// 执行Api
		/// ctx: 请求上下文 (object)
		/// db: 数据管理器 (object)
		/// 返回: 执行结果 (object|string)
		Api.prototype.run = async function(ctx, db) {
			if (!db) {
				db = {
					ret: null
				};
			}
			const path = ctx.request.path;
			var lt = this.list;
			for (var i = 0; i < lt.length; i++) {
				var o = lt[i];
				if (path.has(o.config.path)) {
					var ret = await o.run(ctx, db);
					if (ret) {
						db.ret = ret;
						break;
					}
				}
			}
			return db.ret;
		};
	}
}
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
