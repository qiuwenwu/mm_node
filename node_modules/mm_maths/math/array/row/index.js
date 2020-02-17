/**
 * 二维数组取指定行
 * @param {Array} arr
 * @return {Array} 返回数组
 */
module.exports = function row(arr, x) {
	if (arr.length >= x) {
		return arr[x - 1];
	}
	return [];
};
