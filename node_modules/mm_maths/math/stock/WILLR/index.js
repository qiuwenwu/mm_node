const max = require('../array/max');
const min = require('../array/min');

module.exports = function WILLR(highs, lows, closes, lookback) {
	var willr = [],
		highest_high, lowest_low, curr_close, i;
	// computing only if highs and lows arrays are of equal length
	if (highs.length == lows.length && highs.length >= lookback) {
		/*
		 * Willams %R exists only for the values which have atleast "lookback" values
		 * so we iterate till ((length )-lookback)to calculate Willams %R
		 */
		var limit = highs.length - lookback;
		for (i = limit; i >= 0; i--) {
			highest_high = max(highs.slice(i, i + lookback));
			lowest_low = min(lows.slice(i, i + lookback));
			curr_close = closes[i];
			willr[i] = (highest_high - curr_close) / (highest_high - lowest_low) * -100;
		}
	}
	return willr;
}