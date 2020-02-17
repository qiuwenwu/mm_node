/**
 * 取最大值
 * @param {Array} arr
 * @return {Number} 返回最大值
 */
module.exports = function max(arr) {
	var number = 0;
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var num = arr[i];
		if(num > number)
		{
			number = num;
		}
	}
	return number;
};
