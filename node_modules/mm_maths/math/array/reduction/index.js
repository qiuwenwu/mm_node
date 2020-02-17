/**
 * 维度下降(基础)
 * @param {Array} arr 数组
 * @param {Number} n 下降次数
 * @return {Array} 返回下降后的数组
 */
function flatten(arr) {
	var arr_new = [];
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var val = arr[i];
		if (Array.isArray(val)) {
			var ar = flatten(val);
			ar.map(function(o) {
				arr_new.push(o);
			});
		} else {
			arr_new.push(val);
		}
	}
	return arr_new;
};

// var r = [
// 	[2, 3, 1, 3, [4, 5],
// 		[5, 9, 10], 8
// 	],
// 	[4, 7, 7, 6]
// ];
// console.log(flatten(r));

/**
 * 维度下降
 * @param {Array} arr 数组
 * @param {Number} n 下降次数
 * @return {Array} 返回下降后的数组
 */
module.exports = function reduction(arr, n) {
	if (n) {
		var depth = 0;
		var ar = arr;
		while (Array.isArray(ar) && ar.length > 0) {
			ar = ar[0];
			depth++;
		}
		var arr_new = [];
		// 循环次数
		var times = depth - n;

		if (times < 1) {
			times = 1;
		}
	}
	else {
		return flatten(arr)
	}
};
