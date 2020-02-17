/**
 * @param {Object} higharray
 * @param {Object} lowarray
 * @param {Object} closearray
 * @param {Object} volarray
 * @param {Object} period
 */
module.exports = function MFI(higharray, lowarray, closearray, volarray, period) {
	var harr = higharray.slice(0, period).reverse(),
		larr = lowarray.slice(0, period).reverse(),
		clarr = closearray.slice(0, period).reverse(),
		vlarr = volarray.slice(0, period).reverse(),
		lasttp = 0,
		first = true,
		posmf = 0,
		negmf = 0,
		i, tp;
	for (i = 0; i < closearray.length; i++) {
		if (first) {
			lasttp = (harr[i] + larr[i] + clarr[i]) / 3;
			first = false;
		} else {
			tp = (harr[i] + larr[i] + clarr[i]) / 3;
			if (tp > lasttp) {
				posmf += (tp * vlarr[0]);
			} else if (tp < lasttp) {
				negmf += (tp * vlarr[0]);
			}
			lasttp = tp;
		}
	}
	return (100 - (100 / (1 + (posmf / negmf))));
}
