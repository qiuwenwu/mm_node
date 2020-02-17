/**
 * 判断是否十字星
 * @param {Number} open 开盘价
 * @param {Number} close 收盘价
 * @param {Number} heig 最高价
 * @param {Number} low 最低价
 * @param {Number} n 幅度
 * @return {Number} 判断正确返回1,否则返回0
 */
module.exports = function STAR(open, close, heig, low, n = 0.02) {
	if (heig > open && heig > close) {
		if (low < open && low < close) {
			if (close <= open * (1 + n) && close >= open * (1 - n)) {
				return 1;
			}
		}
	}
	return 0;
}
