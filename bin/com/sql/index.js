const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * Sql语句拓展类
 * @extends {Index}
 * @class
 */
class Sql extends Index {
	/**
	 * 构造函数
	 * @param {String} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "sql";
		this.title = title;
	}
}

/**
 * 加载
 * @param {String} path 加载的路径
 */
Sql.prototype.load = function(path) {
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
			// 获取所有配置文件
			var list_file = $.file.getAll(f, "*" + _this.type + ".json");
			_this.load_list(list_file);
		});
	} else {
		// 获取所有配置文件
		var list_file = $.file.getAll(path, "*" + _this.type + ".json");
		_this.load_list(list_file);
	}
};

/**
 * 排序
 */
Sql.prototype.sort = function() {
	this.list.sortBy('asc', 'name');
};

/**
 * 执行sql
 * @param {String} name 名称
 * @param {Object} query 查询参数
 * @param {Object} body 修改参数
 * @param {Object} db 数据库管理器 (object) 只支持可用sql语句的数据库
 * @return {Object} 执行结果
 */
Sql.prototype.run = async function(name, query, body, db) {
	var obj = this.get(name);
	if (obj) {
		return await obj.run(query, body, db);
	}
	return null;
};

exports.Sql = Sql;


/**
 * Sql模板池
 */
if (!$.pool.sql) {
	$.pool.sql = {};
}

/**
 * Sql管理器,用于创建缓存
 * @sql {string} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function sql_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.sql[scope];
	if (!obj) {
		$.pool.sql[scope] = new Sql(scope, title);
		obj = $.pool.sql[scope];
	}
	return obj;
}
/**
 * @module 导出Sql管理器
 */
exports.sql_admin = sql_admin;
