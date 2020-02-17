/**
 * 微分
 * @param {Number} x 数值1
 * @param {Number} y 数值2
 * @return {Number} 返回微分后数值
 */
module.exports = function diff(x, y) {
	return ((x - y) / ((x + y) / 2)) * 100;
};
