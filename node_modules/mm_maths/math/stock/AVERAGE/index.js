
/**
 * 求平均值
 * @param {Array} arr 数组
 * @return {Number} 返回平均值
 */
module.exports = function AVERAGE(arr) {
	var num = 0;
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		num += arr[i];
	}
	return num / arr.length;
};
