const sum = require('../sum');

/**
 * 求平均值
 * @param {Array} arr 数组
 * @return {Number} 返回平均值
 */
module.exports = function average(arr) {
	return sum(arr) / arr.length;
};
