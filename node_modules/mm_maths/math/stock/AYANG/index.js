const YANG = require('../YANG');
const REF = require('../REF');

/**
 * 判断是否阳线
 * @param {Array} arr_open 开盘价数组
 * @param {Array} arr_close 收盘价数组
 * @param {Array} arr_chg 涨跌幅数组
 * @param {Number} idx 索引
 * @param {Number} n 幅度, 如果大阳线则设0.05
 * @return {Number} 判断正确返回1, 否则返回0
 */
module.exports = function AYANG(arr_open, arr_close, arr_chg, idx, n = 0.02) {
	var open = REF(arr_open, idx);
	var close = REF(arr_close, idx);
	var chg = REF(arr_chg, idx);
	return YANG(open, close, chg, n);
}
