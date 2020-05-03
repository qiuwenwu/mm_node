const Energy = require('../../com/energy/index.js');

var energy = new Energy();


/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var qy = ctx.request.query;
	var num = qy["num"];
	return energy.run(num);
};

exports.main = main;
