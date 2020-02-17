const AVERAGE = require('../AVERAGE');

/**
 * 判断所有值是否在返回内
 * @param {Array} arr 数组
 * @param {Number} n 倍率
 * @return {Number} 返回整数 比较正确返回1, 否则返回0
 */
module.exports = function AP(arr, n = 0) {
	var val = AVERAGE(arr);
	var t = 0;
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var v = arr[i];
		if (v <= val * (1 + n) && v >= val * (1 - n)) {
			t++;
		};
	}
	return arr.length === t
};
