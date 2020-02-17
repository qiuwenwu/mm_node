/**
 * 取最小值
 * @param {Array} arr
 * @return {Number} 返回最小值
 */
module.exports = function max(arr) {
	var number = arr[0];
	for (var i = 1; i < arr.length; i++) {
		var num = arr[i];
		if(num < number)
		{
			number = num;
		}
	}
	return number;
};