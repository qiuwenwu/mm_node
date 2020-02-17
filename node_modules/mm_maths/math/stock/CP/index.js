/**
 * 比较大小
 * @param {Array} arr1 数组1
 * @param {String} symbol 比较符号 >大于 <小于 =等于 <=大于等于, >=小于等于 
 * @param {Array} arr2 数组2
 * @param {Number} idx 倒数第N个进行比较
 * @return {Number} 返回整数 比较正确返回1, 否则返回0
 */
module.exports = function CP(arr1, symbol, arr2, idx = 1) {
	var v1 = arr1[arr1.length - idx];
	var v2 = arr2[arr2.length - idx];
	var bl = false;
	switch (symbol) {
		case ">":
			bl = v1 > v2;
			break;
		case "<":
			bl = v1 < v2;
			break;
		case ">=":
			bl = v1 >= v2;
			break;
		case "<=":
			bl = v1 <= v2;
			break;
		case "=":
		case "==":
			bl = v1 == v2;
			break;
		case "~=":
			bl = (v1 == v2) || (Math.round(v1 * 10) == Math.round(v2 * 10));
			break;
	}
	return bl ? 1 : 0;
};
