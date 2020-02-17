const max = require('../array/max');
const min = require('../array/min');

module.exports = function STOCHRSI(instruments, rsiperiod) {
	var stochrsi = [],
		rsiarray, rsimin, rsimax, i, arr;
	for (i = rsiperiod - 1; i >= 0; i--) {
		arr = instruments.slice(i);
		rsiarray = RSI(arr, rsiperiod);
		rsimin = min(rsiarray);
		rsimax = max(rsiarray);
		if (rsimax - rsimin == 0) {
			stochrsi[i] = 100;
		} else {
			stochrsi[i] = 100 * (rsiarray[0] - rsimin) / (rsimax - rsimin);
		}
	}
	return stochrsi;
}