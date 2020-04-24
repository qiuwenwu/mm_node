const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * 参数类
 * @extends {Index}
 * @class
 */
class Param extends Index {
	/**
	 * 构造函数
	 * @param {String} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "param";
		this.title = title;
	}
}

/**
 * 加载配置
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
 * 排序
 */
Param.prototype.sort = function() {
	this.list.sortBy('asc', 'name');
};

/**
 * 配置对象或配置路径
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
 * Param参数池
 */
if (!$.pool.param) {
	$.pool.param = {};
}

/**
 * Param管理器,用于创建缓存
 * @param {string} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function param_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.param[scope];
	if (!obj) {
		$.pool.param[scope] = new Param(scope, title);
		obj = $.pool.param[scope];
	}
	return obj;
}
/**
 * @module 导出Param管理器
 */
exports.param_admin = param_admin;
