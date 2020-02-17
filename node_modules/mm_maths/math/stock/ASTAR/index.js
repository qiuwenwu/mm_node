const REF = require('../REF');
const STAR = require('../STAR');

/**
 * 判断是否十字星
 * @param {Array} arr_open 开盘价数组
 * @param {Array} arr_close 收盘价数组
 * @param {Array} arr_heig 最高价数组
 * @param {Array} arr_low 最低价数组
 * @param {Number} idx 索引
 * @param {Number} n 幅度
 * @return {Number} 判断正确返回1,否则返回0
 */
module.exports = function ASTAR(arr_open, arr_close, arr_heig, arr_low, idx, n) {
	var open = REF(arr_open, idx);
	var close = REF(arr_close, idx);
	var heig = REF(arr_heig, idx);
	var low = REF(arr_low, idx);
	return STAR(open, close, heig, low, n);
}
