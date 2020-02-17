/**
 * 指数移动平均值
 * @param {ar} arr 数组
 * @param {Number} period 周期
 * @return {ar} 返回平均值数组
 */
module.exports = function EMA(arr, period = 5) {
	var ar = arr.slice().reverse(),
		iPos = 0,
		i, k, ema;
	for (iPos = 0; iPos < ar.length && isNaN(ar[iPos]); iPos++) {}
	ar = ar.slice(iPos);
	ema = [];
	k = 2 / (period + 1);
	for (i = 0; i < period - 1; i++) {
		ema[i] = NaN;
	}
	ema[period - 1] = ar.slice(0, period).reduce(function(a, b) {
		return a + b;
	}) / period;
	for (i = period; i < ar.length; i++) {
		ema[i] = ar[i] * k + ema[i - 1] * (1 - k);
	}
	for (i = 0; i < iPos; i++) {
		ema.push(NaN);
	}
	return ema;
}

//  EMA(X，2)=[2*X2+(2-1)*Y’]/(2+1)=(2/3)*X2+(1/3)X1