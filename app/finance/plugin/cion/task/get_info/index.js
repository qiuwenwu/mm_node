var times = 0;

/**
 * @description 定时任务函数
 */
exports.main = async function main() {
	times++;
	console.log('数字货币执行次数', times);
};