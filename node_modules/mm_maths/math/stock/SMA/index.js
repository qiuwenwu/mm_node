
module.exports = function SMA(arr, smaLength) {
	var array, sma = [],
		i;
	for (i = smaLength - 1; i >= 0; i--) {
		array = arr.slice(i, i + smaLength);
		sma[i] = array.reduce(function(a, b) {
			return a + b;
		}) / array.length;
	}
	return sma;
}