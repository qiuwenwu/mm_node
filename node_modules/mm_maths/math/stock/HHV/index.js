const max = require('../../array/max');

/**
 * 最高价(周期性) 注意, 数值是按时间倒序的
 * @param {Array} arr 数组
 * @param {Number} period 周期时长
 * @return {Number}
 */
module.exports = function HHV(arr, period = 5) {
	var len = arr.length;
	if(period > len){
		period = len
	}
	var ar = arr.slice(0, period);
	return max(ar);
}