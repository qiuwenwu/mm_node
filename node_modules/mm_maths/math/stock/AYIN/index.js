const YIN = require('../YIN');
const REF = require('../REF');

/**
 * 判断是否阴线
 * @param {Array} arr_open 开盘价数组
 * @param {Array} arr_close 收盘价数组
 * @param {Array} arr_chg 涨跌幅数组
 * @param {Number} idx 索引
 * @param {Number} n 幅度, 如果大阳线则设0.05
 * @return {Number} 判断正确返回1, 否则返回0
 */
module.exports = function AYIN(arr_open, arr_close, arr_chg, idx, n) {
	var open = REF(arr_open, idx);
	var close = REF(arr_close, idx);
	var chg = REF(arr_chg, idx);
	return YIN(open, close, chg, n);
}
