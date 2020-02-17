const min = require('../array/min');

module.exports = function AROON(higharray, lowarray, period) {
	var harr = higharray.slice(0, period),
		larr = lowarray.slice(0, period),
		hh = min(harr),
		hday = harr.indexOf(hh),
		ll = min(larr),
		lday = larr.indexOf(ll);
	return {
		up: ((period - hday) / period) * 100,
		down: ((period - lday) / period) * 100
	};
};