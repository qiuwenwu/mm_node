/**
 * 二维数组取列值
 * @param {Array} arr 二维数组
 * @param {Number} y 列
 * @return {Array} 返回列值集合
 */
module.exports = function col(arr, y) {
	var arr_new = [];
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var arr_sub = arr[i];
		if (arr_sub.length >= y) {
			arr_new.push(arr_sub[y - 1]);
		}
	}
	return arr_new;
};
