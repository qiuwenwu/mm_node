/**
 * 取数组右边成员
 * @param {Array} arr 数组
 * @param {Number} n 取成员个数
 * @return {Array} 返回数组
 */
module.exports = function RIGHT(arr, n) {
	if(n > arr.length)
	{
		n = arr.length;
	}
	return arr.slice(arr.length - n, arr.length);
}
