/**
 * Oauth身份验证驱动类
 * @class
 */
class Oauth {
	/**
	 * 构造函数
	 * @param {String} dir 当前路径
	 * @constructor
	 */
	constructor(dir) {
		// 当前路径
		this.dir = dir;
		// 当前文件
		this.filename;
		/* 通用项 */
		// 配置参数
		this.config = {
			// 是否登录
			"signIn": false,
			// 要求会员级别
			"vip": 0,
			// 要求管理级别
			"gm": 0,
			// 要求商户级别
			"mc": 0,
			// 要求用户组
			"user_group": [],
			// 要求管理组
			"user_admin": [],
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": ""
		};
	}
}

/**
 * 加载配置对象
 * @param {Object} obj 配置对象
 */
Oauth.prototype.loadObj = function(obj) {
	$.push(this.config, obj);
	var f = this.config.func_file;
	if (f) {
		var file = f.fullname(this.dir);
		if (file.hasFile()) {
			var cs = require(file);
			if (cs) {
				$.push(this, cs);
			}
		}
	}
};

/**
 * 身份验证主程序
 * @param {Object} ctx HTTP请求上下文
 */
Oauth.prototype.main = async function(ctx) {
	return null;
};

/**
 * 验证身份
 * @param {Object} ctx HTTP请求上下文
 * @return {Object} 验证失败返回错误提示，验证通过返回null
 */
Oauth.prototype.check = async function(ctx) {

	// 无需登录则不验证身份和权限
	var cg = this.config;
	if (!cg.signIn) {
		return null;
	}
	var error = await this.main(ctx);
	if (error) {
		return error;
	}
	var user;
	if (ctx.session.user) {
		user = ctx.session.user;
	} else {
		var token = ctx.headers[$.dict.token];
		if (token) {
			var u = await $.cache.get($.dict.session_id + '_' + token);
			if(u){
				var type = typeof(u);
				if (type === "string") {
					var o = u.toJson();
					user = o.user;
				} else if (type === "object") {
					if (Object.keys(u).length > 0) {
						user = u.user;
					}
				}
			}
		}
	}

	error = {
		code: 70000,
		message: "没有访问权限"
	};
	if (user) {
		// 判断特殊用户级别
		if (cg.gm !== 0 && user.gm < cg.gm) {
			return error;
		}
		if (cg.vip !== 0 && user.vip < cg.vip) {
			return error;
		}
		if (cg.mc !== 0 && user.mc < cg.mc) {
			return error;
		}

		// 判断用户组
		if (cg.user_group.length > 0) {
			// 利用filter获取数组交集
			var arr2 = user.user_group.split(',');
			var arr = cg.user_group.filter(function(v) {
				return arr2.indexOf(v) !== -1
			});
			if (arr.length === 0) {
				return error;
			}
		}

		// 判断管理组
		if (cg.user_admin.length > 0) {
			// 利用filter获取数组交集
			var arr2 = user.user_admin.split(',');
			var arr = cg.user_admin.filter(function(v) {
				return arr2.indexOf(v) !== -1
			});
			if (arr.length === 0) {
				return error;
			}
		}
	} else {
		return {
			code: 60000,
			message: "账户未登录!"
		};
	}

	return null;
};

module.exports = Oauth;
