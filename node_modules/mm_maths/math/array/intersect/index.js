/**
 * 交集
 * @param {Array} arr_1 数组1
 * @param {Array} arr_2 数组2
 * @return {Array} 返回两个数组公共部分
 */
module.exports = function intersect(arr_1, arr_2) {
	return arr_1.filter(function(v){ return arr_2.indexOf(v) > -1 })
};