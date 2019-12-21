class Dict {
	/**
	 * @param {Object} arg
	 */
	constructor(arg) {
		this.list = [];
	}
}

/**
 * 设置配置模型
 * @param {Object} cg 配置
 * @return {Object} 返回配置模型
 */
Dict.prototype.model = function(cg) {
	var m = {};
	return $.push(m, cg);
};

/**
 * 添加配置
 * @param {String} cg 配置参数
 * @return {Boolean} 添加成功成功返回空, 失败返回错误提示
 */
Dict.prototype.add = function(cg) {
	
};

/**
 * 删除配置
 * @param {Object} cg 配置参数
 * @return {String} 删除成功返回空, 失败返回错误提示
 */
Dict.prototype.del = function(cg) {
	
};

/**
 * 查询配置
 * @param {Object} cg 配置参数
 * @return {String} 删除成功返回空, 失败返回错误提示
 */
Dict.prototype.get = function(cg) {
	
};

/**
 * 修改配置
 * @param {Object} cg 配置参数
 * @return {String} 修改成功返回空, 失败返回错误提示
 */
Dict.prototype.set = function(cg) {
	
};

module.exports = Dict;