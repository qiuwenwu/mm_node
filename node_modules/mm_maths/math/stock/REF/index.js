/**
 * 过去某刻值
 * @param {Array} arr 数组
 * @param {Number} n 前N刻
 * @return {Array} 返回平均值数组
 */
module.exports = function REF(arr, n = 1) {
	var len = arr.length;
	if (len <= n) {
		return 0;
	}
	else {
		return arr[len - n - 1];
	}
}
