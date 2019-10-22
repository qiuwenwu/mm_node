/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	if (ctx.session.user) {
		return $.ret.error(1, "已经登录了");
	} else {
		var query = ctx.request.query;
		if (query["username"] === "admin" && query["password"] === "admin") {
			ctx.session.user = {
				"user_id": 1,
				"username": "qiuwenwu",
				"nickname": "雷帝",
				"name": "邱文武",
				// 会员级别
				"vip": 1,
				// 管理级别
				"gm": 5,
				// 商户级别
				"mc": 5,
				// 用户组
				"user_group": [],
				// 管理组
				"user_admin": ["master"]
			};
			// 自动生成的uuid是通过IP和浏览器信息加密而成，如果需要解密确认其身份，可再加上user_id加密，自行生成uuid
			return $.ret.obj(ctx.session.uuid);
		} else {
			return $.ret.error(30001, "用户名（username）或密码（password）错误");
		}
	}
};

exports.main = main;
