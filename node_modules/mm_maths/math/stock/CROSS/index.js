/**
 * 交叉
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Number} 上穿返回1, 否则返回0
 */
module.exports = function CROSS(arr1, arr2) {
	if (arr1.length < 3 || arr2.length < 3) {
		return 0;
	}

	var ret = 0;

	for (var i = arr1.length - 1; i > 2; i--) {
		var x3 = arr1[i];
		var x2 = arr1[i - 1];
		var x1 = arr1[i - 2];
		
		var y3 = arr2[i];
		var y1 = arr2[i - 2];
		if(x3 > x2 && x2 > x1 && x3 > y3 && x1 < y1){
			return 1;
		}
		else if(x3 < x2 && x2 < x1 && x3 < y3 && x1 > y1){
			return -1;
		}
	}
	return ret;
};
