/**
 * 下降趋势
 * @param {Object} arr 数值组
 * @param {Numbeer} extent 幅度
 * @return {Number} 下降返回1, 否则返回0
 */
module.exports = function DOWN(arr, extent = 0) {
	var num = 1 - extent;
	var len = arr.length;
	if (len > 2) {
		var v1 = arr[len - 3];
		var v2 = arr[len - 2];
		var v3 = arr[len - 1];
		if (v3 <= v2 * num && v2 <= v1 * num) {
			return 1
		}
	}
	return 0;
};
