/**
 * 取数组左边成员
 * @param {Array} arr 数组
 * @param {Number} l 取成员起始
 * @param {Number} r 取成员个数
 * @return {Array} 返回数组
 */
module.exports = function BETWEEN(arr, l, r) {
	if (l > r) {
		return [];
	}
	
	if (l < 1) {
		l > 1;
	} else if (l > arr.length) {
		l = arr.length;
	}

	if (r > arr.length) {
		r = arr.length;
	}
	
	return arr.slice(l, r);
}
