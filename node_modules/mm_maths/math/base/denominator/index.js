const max_divisor = require('../max_divisor');

/**
 * 通分母
 * @param {Object} multiply
 * @param {Object} divide
 * @return {Object} 返回最小分子分母
 */
module.exports = function denominator(multiply, divide) {
	var num = max_divisor(multiply, divide);
	multiply = multiply / num;
	divide =  divide / num;
	return {
		multiply,
		divide
	}
};
