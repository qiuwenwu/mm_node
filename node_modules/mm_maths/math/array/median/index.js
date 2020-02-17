/**
 * 取中位数
 * @param {Array} arr 数组
 * @return {Number} 返回中位数
 */
module.exports = function median(arr) {
	// 先排序
	var ar = arr;
	ar.sort(function(x, y) {
		if (x < y) {
			return -1;
		} else if (x > y) {
			return 1;
		} else {
			return 0;
		}
	});
	var len = ar.length;

	var index = len / 2;
	var mid;
	
	// 判断数值个数是否能被2整除, 如果能则取中间两个数的平均值
	if (index === parseInt(index)) {
		var left = ar[index - 1];
		var right = ar[index];
		mid = (left + right) / 2
	}
	else {
		 // 如果数值个数不能被2整除, 则直接取中间值
		mid = ar[Math.ceil(index) - 1]
	}
	return mid;
};
