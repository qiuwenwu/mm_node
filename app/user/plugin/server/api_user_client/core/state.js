/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	if (ctx.session.user) {
		var user = Object.assign({}, ctx.session.user);
		delete user.user_id;
		return $.ret.body(user);
	} else {
		var token = ctx.headers[$.dict.token];
		if (token) {
			var u = await $.cache.get($.dict.session_id + '_' + token);
			if (u) {
				var type = typeof(u);
				if (type === "string") {
					var o = u.toJson();
					delete o.user.user_id;
					return $.ret.body(o.user);
				} else if (type === "object") {
					if (Object.keys(u).length > 0) {
						var o = Object.assign({}, u);
						delete o.user.user_id;
						return $.ret.body(o.user);
					}
				}
			}
			return $.ret.error(50000, '非法访问');
		}
		return $.ret.error(40000, '用户未登录');
	}
};

exports.main = main;
