const dev = require('../com.js').dev;

var dev_class = new dev('sql');

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
exports.main = async function(ctx, db){
	return await dev_class.main(ctx, db);
};