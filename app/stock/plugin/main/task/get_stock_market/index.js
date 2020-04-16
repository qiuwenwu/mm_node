const com = require('../../com/get_market.js');

async function main() {
	// 实例化数据库操作类
	await com.get_market();
}
main();
/**
 * @description 定时任务函数
 */
exports.main = main;
