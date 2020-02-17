require('mm_expand')

/**
 * 取时间
 * @param {Array} list 对象列表
 * @param {String} key 字段
 * @return {Array} 返回数值数组
 */
module.exports = function TIME(list, key = "datetime") {
	return list.map(function(o) {
		return o[key].toTime().toStr('hh:mm:ss');
	});
};

