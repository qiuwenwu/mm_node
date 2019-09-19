/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	if (ctx.session.user) {
		ctx.session = null;
		return $.ret.bl(true, "账户已退出");
	} else {
		var token = ctx.headers[$.dict.token];
		if (token) {
			$.cache.del($.dict.session_id + '_' + token);
			return $.ret.bl(true, "账户已退出");
		} else {
			return $.ret.bl(false, "账户未登录");
		}
	}
};

exports.main = main;
