const square = require('../square');
const sum = require('../sum');

/**
 * 求标准差
 * @param {Array} arr 数组
 * @return {Number} 返回平均值
 */
module.exports = function stddev(arr) {
	// 先求每个数的平方
	var ar = square(arr);
	// 然后将平方相加
	var value = sum(ar);
	
	// 再除以数量开平方
	return Math.sqrt(value / (arr.length - 1));
};
