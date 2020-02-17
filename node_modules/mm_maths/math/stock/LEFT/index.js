/**
 * 取数组左边成员
 * @param {Array} arr 数组
 * @param {Number} n 取成员个数
 * @return {Array} 返回数组
 */
module.exports = function LEFT(arr, n) {
	if(n > arr.length)
	{
		n = arr.length;
	}
	return arr.slice(0, n);
}
