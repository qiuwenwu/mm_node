/**
 * 取成交量
 * @param {Array} list 对象列表
 * @param {String} key 字段
 * @return {Array} 返回数值数组
 */
module.exports = function VOL(list, key = "vol") {
	return list.map(function(o) {
		return o[key];
	});
}
