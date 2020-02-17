/**
 * 四舍五入
 * @param {number} value 数值
 * @param {number} len 保留位数
 * @return {number} 返回数值
 */
module.exports = function round(value, len) {
	if (len) {
		var n = Math.pow(10, len);
		return Math.round(value * n) / n;
	} else {
		return Math.round(value)
	}
};
