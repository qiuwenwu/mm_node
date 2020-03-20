/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// $.log.debug('行动后，可以记录行动结果，下次免重新行动，还可以并发事务');
	return null;
};

exports.main = main;