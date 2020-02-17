const max_divisor = require('../max_divisor');

/**
 * 最小公倍数
 * @param {number} a 值
 * @param {number} b 值
 * @return {number} 返回公倍数
 */
module.exports = function min_multiple(a, b) {
	return (a * b) / max_divisor(a, b);
};
