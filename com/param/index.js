const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

/**
 * @description 参数类
 * @extends {Index}
 * @class
 */
class Param extends Index {
	/**
	 * @description 构造函数
	 * @param {String} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "param";
	}
}

/**
 * @description 加载配置
 * @param {String} path 检索路径
 */
Param.prototype.load = function(path) {
	if (!path) {
		path = "/app/";
	}
	// 获取所有应用路径
	var search_dir;
	var _this = this;
	if (this.scope && this.scope !== $.val.scope) {
		search_dir = this.type + '_' + this.scope;
		var list_scope = $.dir.getAll(path, search_dir);
		list_scope.map(function(f) {
			// 获取所有param配置文件
			var list_file = $.file.getAll(f, "*" + _this.type + ".json");
			_this.load_list(list_file);
		});
	} else {
		// 获取所有param配置文件
		var list_file = $.file.getAll(path, "*" + _this.type + ".json");
		_this.load_list(list_file);
	}
};

/**
 * @description 排序
 */
Param.prototype.sort = function() {
	this.list.sortBy('asc', 'name');
};

/**
 * @description 配置对象或配置路径
 * @param {Object} db 数据库管理器 (object) 只支持可用sql语句的数据库
 * @param {String} name 名称
 * @param {Object} query url参数
 * @param {Object} body 正文参数
 * @return {Object} 验证失败返回错误信息，成功返回null
 */
Param.prototype.run = function(db, name, query, body) {
	var obj = this.get(name);
	if (obj) {
		return obj.run(db, query, body);
	}
	return null;
};

exports.Param = Param;


/**
 * @description Param参数池
 */
if (!$.pool.param) {
	$.pool.param = {};
}

/**
 * @description Param管理器,用于创建缓存
 * @param {string} scope 作用域
 * @return {Object} 返回一个缓存类
 */
function param_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.param[scope];
	if (!obj) {
		$.pool.param[scope] = new Param(scope);
		obj = $.pool.param[scope];
	}
	return obj;
}
/**
 * @module 导出Param管理器
 */
exports.param_admin = param_admin;
