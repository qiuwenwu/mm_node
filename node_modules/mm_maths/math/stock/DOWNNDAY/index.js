/**
 * 连跌N日
 * @param {Array} arr 跌幅数组
 * @param {Number} period 周期(单位:天)
 * @return {Number} 连涨返回1, 否则返回0
 */
module.exports = function DOWNNDAY(arr, period = 3, n = 0.02) {
	if (arr.length > period) {
		var day = 0;
		var num = 1 - n;
		for (var i = arr.length - 1; i > 0; i--) {
			var bl = arr[i] < arr[i - 1] * num;
			if (bl) {
				day++;
				if (day == period) {
					break;
				}
			} else {
				break;
			}
		}
		if (day >= period) {
			return 1
		}
	}
	return 0;
};
