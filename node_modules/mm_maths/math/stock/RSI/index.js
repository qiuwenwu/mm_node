module.exports = function RSI(array, rsiperiod) {
	var rsi = [],
		i, j, loss, gain, diff, avggain, avgloss, first = true;
	for (i = rsiperiod - 1; i >= 0; i--) {
		loss = gain = 0;
		if (first) {
			for (j = i + rsiperiod - 1; j >= i; j--) {
				diff = array[j + 1] - array[j];
				if (diff > 0) {
					loss += Math.abs(diff);
				} else {
					gain += Math.abs(diff);
				}
			}
			first = false;
			avggain = gain / rsiperiod;
			avgloss = loss / rsiperiod;
		} else {
			diff = array[i + 1] - array[i];
			if (diff > 0) {
				loss += Math.abs(diff);
			} else {
				gain += Math.abs(diff);
			}
			avggain = ((avggain * (rsiperiod - 1)) + gain) / rsiperiod;
			avgloss = ((avgloss * (rsiperiod - 1)) + loss) / rsiperiod;
		}
		//console.log("g", avggain, "l", avgloss);
		if (avgloss == 0) {
			rsi[i] = 100;
		} else {
			rsi[i] = 100 - (100 / (1 + (avggain / avgloss)));
		}
	}
	return rsi;
}