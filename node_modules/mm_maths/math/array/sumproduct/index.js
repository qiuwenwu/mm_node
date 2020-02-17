/**
 * 求数组之和
 * @param {Array} arr 数组
 * @return {Number} 返回数值
 */
module.exports = function sumproduct(arr) {
	var num = 1;
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		num *= arr[i];
	}
	return num;
};
