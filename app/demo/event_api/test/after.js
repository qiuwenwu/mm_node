/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// $.log.debug('执行后，可以记录执行结果，下次免重新执行，还可以并发事务');
	return null;
};

exports.main = main;