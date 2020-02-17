/**
 * 差集
 * @param {Array} arr_1
 * @param {Array} arr_2
 * @return {Array} 返回不含arr_2数值的数组
 */
module.exports = function distinct(arr_1, arr_2) {
	return arr_1.filter(function(v){ return arr_2.indexOf(v) === -1 })
};