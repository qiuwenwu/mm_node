/**
 * 并集
 * @param {Array} arr_1 数组1
 * @param {Array} arr_2 数组2
 * @return {Array} 返回合并后的数组
 */
module.exports = function union(arr_1, arr_2) {
	return arr_1.concat(arr_2.filter(function(v) {
		return arr_1.indexOf(v) === -1
	}));
};
