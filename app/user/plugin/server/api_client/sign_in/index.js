/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var params = {};
	if (ctx.method === "POST") {
		params = ctx.request.body;
	} else {
		params = ctx.request.query;
	}
	var password = params['password'];
	if (ctx.session.user) {
		ctx.session.user = null;
	}
	if (!password) {
		return $.ret.error(30000, "密码(password)不能为空");
	}
	var list = [];
	// 获取登录方式
	var method = params["method"];
	// $.log.debug('登录方式', method);
	if (!method) {
		// 如果登录方式默认，则用常规登录方式
		db.table = "user_account";
	
		var username = params["username"];
		if (username) {
			// 使用用户名登录
			list = await db.get({
				username
			});
		} else {
			var email = params["email"];
			if (email) {
				// 使用邮箱登录
				list = await db.get({
					email
				});
			} else {
				var phone = params["phone"];
				if (phone) {
					// 使用手机号码登录
					list = await db.get({
						phone
					});
				} else {
					return $.ret.error(30000, '用户名(username)不能为空');
				}
			}
		}
	} else if (method === "sns") {
		// 如果登陆方式为1，则使用第三方社交账号和本站密码进行登录
		db.table = "user_sns";
		var mm = params["mm"];
		var arr = [];
		if (mm) {
			// 使用超级美眉账号登录
			arr = await db.get({
				mm
			});
		} else {
			var qq = params["qq"];
			if (qq) {
				// 使用QQ账号登录
				arr = await db.get({
					qq
				});
			} else {
				var baidu = params["baidu"];
				if (baidu) {
					// 使用百度账号登录
					arr = await db.get({
						baidu
					});
				} else {
					var taotao = params["taotao"];
					if (taotao) {
						// 使用淘宝账号登录
						arr = await db.get({
							taotao
						});
					} else {
						var wechat = params["wechat"];
						if (wechat) {
							// 使用微信账号登录
							arr = await db.get({
								wechat
							});
						} else {
							return $.ret.error(30000, '不支持的SNS账号');
						}
					}
				}
			}
		}
		if (arr.length > 0) {
			var o = arr[0];
			db.table = "user_user";
			list = await db.get({
				user_id: o.user_id
			});
		}
	}
	if (list.length === 0) {
		return $.ret.error(10000, '账号不存在');
	} else {
		var u = list[0];
	
		// 判断密码是否正确
		var pass = (password + u.salt).md5();
		if (u.password !== pass) {
			return $.ret.error(31000, '密码不正确');
		} else {
			var ip = ctx.ip.replace('::ffff:', '');
			// 记录当前登录所用的IP地址
			db.set({
				user_id: u.user_id
			}, {
				login_ip: ip
			});
	
			delete u.password;
			delete u.salt;
			delete u.create_time;
			ctx.session.user = u;
			var user = Object.assign({}, u);
			delete user.user_id;
			// 自动生成的uuid是通过IP和浏览器信息加密而成，如果需要解密确认其身份，可再加上user_id加密，自行生成uuid
			var body = $.ret.body({
				token: ctx.session.uuid,
				user: user,
				ip: ip
			});
			// $.log.debug('入场', body);
			return body
		}
	}
};

exports.main = main;
