/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// $.log.debug('验证，可以验证是否有权限调用');
	// return $.ret.error(30000, "身份验证失败");
	return null;
};

exports.main = main;