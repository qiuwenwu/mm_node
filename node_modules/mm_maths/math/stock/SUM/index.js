/**
 * 周期性求和
 * @param {Object} arr 数组
 * @param {Number} period 周期
 * @return {Number} 返回求和
 */
module.exports = function SUM(arr, period) {
	var sum = 0;
	var ar = arr.slice().reverse();
	if (!period) {
		period = ar.length;
	} else if (period > ar.length) {
		period = ar.length;
	}
	for (var i = 0; i < period; i++) {
		sum += ar[i];
	}
	return sum;
}
