
/**
 * 执行前, 用于过滤参数
 * @param {Object} params 参数对象，包含query和body 如：{ query: {} body: {} }
 * @return {Object} 过滤后的参数
 */
function before(params) {
	return params;
};

/**
 * 验证, 用于判断是否执行
 * @param {Object} params 参数对象，包含query和body 如：{ query: {} body: {} }
 * @return {Boolean} 验证通过返回true, 失败返回false
 */
function check(params) {
	return true;
};

/**
 * 执行后 可用于附加执行
 * @param {Object} params 参数对象，包含query和body 如：{ query: {} body: {} }
 * @param {Object} sql SQL模板对象
 * @param {Object} ret 最终执行结果
 */
function after(params, sql, ret) {
	return ret;
};

/**
 * 执行主函数
 * @param {Object} params 参数对象，包含query和body 如：{ query: {} body: {} }
 * @return {Object} 返回执行结果
 */
function main(params) {
	var sql = "";
	var ret = null;

	return {
		sql,
		ret
	}
};

exports.before = before;
exports.main = mian;
exports.after = after;
exports.check = check;
