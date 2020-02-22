const dev = require('../com.js').dev;

var dev_class = new dev('api');

/**
 * @description 设置参数
 * @param {Object} req
 * @param {Object} db
 */
dev_class.clear_cache = async function(req, db) {
	$.cache.clear('api:*');
};

/**
 * @description 设置参数
 * @param {Object} req
 * @param {Object} db
 */
dev_class.set_param = async function(req, db) {
	var {
		scope,
		name
	} = req.query;
	
	var api = $.pool.api[scope];
	if (!api) {
		return $.ret.error(10000, '作用域不存在');
	}
	
	var obj = api.get(name);
	if (!obj) {
		return $.ret.error(10000, '接口不存在！');
	}
	
	if(!obj.param)
	{
		return $.ret.error(10000, '没有参数配置！');
	}
	
	$.push(obj.param.config, req.body);
	obj.param.save();
	return $.ret.bl('false', '修改成功');
};

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
exports.main = async function(ctx, db) {
	this.type = "api";
	return await dev_class.main(ctx, db);
};
