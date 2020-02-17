/**
 * 上升趋势
 * @param {Object} arr
 * @param {Number} extent 幅度 例如 0.02
 * @return {Number} 上升返回1, 否则返回0
 */
module.exports = function UP(arr, extent = 0) {
	var num = 1 + extent;
	var len = arr.length;
	if (len > 2) {
		var v1 = arr[len - 3];
		var v2 = arr[len - 2];
		var v3 = arr[len - 1];
		if (v1 * num <= v2 && v2 * num <= v3) {
			return 1
		}
	}
	return 0;
};
