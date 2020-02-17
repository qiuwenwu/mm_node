require('mm_expand')

/**
 * 取日期
 * @param {Array} list 对象列表
 * @param {String} key 字段
 * @return {Array} 返回数值数组
 */
module.exports = function DATE(list, key = "datetime") {
	return list.map(function(o) {
		return o[key].toTime().toStr('yyyy-MM-dd');
	});
};

