/**
 * 推前N个成员
 * @param {Array} arr 数组
 * @param {Number} n 推前成员数
 * @return {Array} 返回数组
 */
module.exports = function ARR(arr, n = 0) {
	var ar = arr.slice(0, arr.length - n - 1);
	return ar;
}
