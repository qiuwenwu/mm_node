/**
 * 取收盘价
 * @param {Array} list 对象列表
 * @param {String} key 字段
 * @return {Array} 返回数值数组
 */
module.exports = function CLOSE(list, key = "close") {
	return list.map(function(o) {
		return o[key];
	});
}
