const EMA = require('../EMA');

/**
 * 异同移动平均线
 * @param {Array} arr
 * @param {Number} i12
 * @param {Number} i26 
 * @param {Number} i9 DIF周期时长
 * @return {type}
 */
module.exports = function MACD(arr, i12 = 12, i26 = 26, i9 = 9) {
	var ema12 = EMA(arr, i12);
	var ema26 = EMA(arr, i26);
	var DIF = [];
	for(var i = 0; i < ema26.length; i++){
		DIF.push(ema26[i] - ema12[i]);
	}
	DEA = EMA(DIF, i9);
	var MACD = [];
	for(var i = 0; i < DEA.length; i++){
		var val = ema26[i] - DEA[i];
		MACD.push(val * 2);
	}
	return {
		DEA,
		DIF,
		MACD
	};
}