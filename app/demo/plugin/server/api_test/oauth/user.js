/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var user_info = ctx.session.user;
	if (user_info) {
		return $.ret.obj(user_info);
	} else {
		return $.ret.error(30002, "用户未登录");
	}
};

exports.main = main;
