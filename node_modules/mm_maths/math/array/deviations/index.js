const average = require('../average');

/**
 * 求偏差
 * @param {Array} arr 数组
 * @return {Number} 返回平均值
 */
module.exports = function deviations(arr) {
	// 先求平均值
	var value = average(arr);
	// 用当前数值减去平均值,求出偏差值
	return arr.map(function(x) {
		return x - value;
	});
};
