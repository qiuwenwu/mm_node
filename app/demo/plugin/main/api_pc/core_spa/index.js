const send = require('koa-send');
/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// spa应用源地址
	const host = "http://localhost:8080";
	
	// 访问服务端地址 如果这个端就是服务端，那么可以设置为 server = "/";
	const server = "http://localhost:3000/";
	return await $.core_spa(host, server, ctx, db);
}

exports.main = main;
