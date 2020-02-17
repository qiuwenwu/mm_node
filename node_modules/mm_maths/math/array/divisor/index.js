const min = require('../min');
const max_divisor = require('../../base/max_divisor');

/**
 * 取最大公因数
 * @param {Array} arr
 * @return {Number} 返回最大公因数
 */
module.exports = function multiple(arr) {
	// 获取最小值
	var m = min(arr);
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		m = max_divisor(m, arr[i]);
	}
	return m;
};
