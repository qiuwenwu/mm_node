module.exports = function PERCPRICEOSC(array, i12, i26, i9) {
	var ema12 = EMA(array, 12),
		ema26 = EMA(array, 26),
		ppo = [],
		i, signal, histogram;
	for (i = 0; i < ema12.length; i++) {
		ppo.push((ema12[i] - ema26[i]) / ema26[i] * 100);
	}
	signal = EMA(ppo, 9);
	histogram = [];
	for (i = 0; i < ppo.length; i++) {
		histogram.push(ppo[i] - signal[i]);
	}
	return {
		ppo: ppo,
		signal: signal,
		histogram: histogram
	};
}