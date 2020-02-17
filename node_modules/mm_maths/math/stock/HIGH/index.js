/**
 * 取最高价
 * @param {Array} list 对象列表
 * @param {String} key 字段
 * @return {Array} 返回数值数组
 */
module.exports = function HIGH(list, key = "high") {
	return list.map(function(o) {
		return o[key];
	});
}
