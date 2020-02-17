const sum = require('../sum');

/**
 * 求数组每个成员的平方
 * @param {Array} arr 数组
 * @return {Number} 返回平均值
 */
module.exports = function square(arr) {
	return arr.map(function(x) {
		return x * x;
	});
};
