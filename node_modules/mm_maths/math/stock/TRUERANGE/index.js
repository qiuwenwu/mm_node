const max = require('../array/max');

module.exports = function TRUERANGE(high, low, close) {
	var tr = [],
		curr_diff, curr_high_diff, curr_low_diff, i;
	if (high.length != low.length || high.length != close.length) {
		//True ranges are found only when all arrays are of equal length
		return tr;
	}
	tr[0] = high[0] - low[0];
	for (i = high.length - 1; i > 0; i--) {
		var tmp = [];
		tmp.push(high[i] - low[i]);
		tmp.push(Math.abs(low[i] - close[i + 1]));
		tmp.push(Math.abs(high[i] - close[i + 1]));
		tr[i] = max(tmp);
	}
	return tr;
}