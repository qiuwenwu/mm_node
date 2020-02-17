
function add(arr, i, period) {
	var num = 0.0000;
	for (var n = 0; n < period; n++) {
		num += arr[i - n] + 0.0;
	}
	return num / period;
}

/**
 * 末日加权移动平均值
 * @param {Array} arr 数组
 * @param {Number} i 当前索引
 * @param {Number} period 周期
 * @return {Array} 返回平均值数组
 */
module.exports = function MA(arr, period = 5) {
	if (arr.length < period) {
		return;
	}
	var ma = [];
	
	for (var i = 0; i < period - 1; i++) {
		ma.push(NaN);
	}
	for (var i = period - 1; i < arr.length; i++) {
		ma.push(add(arr, i, period));
	}
	return ma;
}
