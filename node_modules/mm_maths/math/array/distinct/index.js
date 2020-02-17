/**
 * 去除重复
 * @param {Array} arr
 * @return {Number} 返回最小值
 */
module.exports = function distinct(arr) {
	var i = 0;
	var j = 0;
	var len = arr.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (arr[i] == arr[j]) {
				arr.splice(j, 1);
				len--;
				j--;
			}
		}
	}
	return arr;
};
