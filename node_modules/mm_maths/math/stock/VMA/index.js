/**
 * 加权计算
 * @param {Array} arr 数组
 * @param {Number} i 当前索引
 * @param {Number} period 周期
 * @param {Array} arr_vol 成交量
 * @return {Array} 返回平均值数组
 */
function add(arr, i, period, arr_vol) {
	var num = 0.0000;
	var vol = 0;
	for (var n = 0; n < period; n++) {
		var idx = i - n;
		vol += arr_vol[idx];
		num += arr[idx] * arr_vol[idx] + 0.0;
	}
	return num / vol;
}

/**
 * 价量加权移动平均值
 * @param {Array} arr 数组
 * @param {Number} i 当前索引
 * @param {Number} period 周期
 * @param {Array} arr_vol 成交量
 * @return {Array} 返回平均值数组
 */
module.exports = function VMA(arr, period, arr_vol) {
	if (arr.length < period) {
		return;
	}
	var ma = [];

	for (var i = 0; i < period - 1; i++) {
		ma.push(NaN);
	}
	for (var i = period - 1; i < arr.length; i++) {
		ma.push(add(arr, i, period, arr_vol));
	}
	return ma;
}
