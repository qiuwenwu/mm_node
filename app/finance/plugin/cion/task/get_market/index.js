var times = 0;

/**
 * @description 定时任务函数
 */
exports.main = async function main() {
	times++;
	console.log('股票执行次数', times);
};