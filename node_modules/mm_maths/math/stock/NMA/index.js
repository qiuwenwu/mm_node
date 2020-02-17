/**
 * 纯真移动平均值(历史加量平均线)
 * @param {Array} arr_p 价格
 * @param {Array} arr_v 数组
 * @return {Array} 返回平均值数组
 */
module.exports = function NMA(arr_p, arr_v) {
	if (arr_p.length !== arr_v.length) {
		console.log("The number of array members is not equal!");
		return [];
	}

	var arr = [arr_p[0]];
	var vol = arr_v[0];
	
	for (var i = 1; i < arr_p.length; i++) {
		// 求出总值
		var price = arr_p[i] * arr_v[i] + arr[arr.length - 1] * vol;
		vol += arr_v[i];
		arr.push(price / vol);
	}
	return arr;
}
