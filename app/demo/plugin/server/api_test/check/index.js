/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// console.log($.api.list);
	// console.log($.api.get('param'));
	return "参数验证: 通过";
};

exports.main = main;
