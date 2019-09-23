const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

/**
 * @description 数据库帮助类
 * @extends {Index}
 * @class
 */
class DB extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "db";
	}
}

/**
 * @description 加载配置
 * @param {String} path 加载的路径
 */
DB.prototype.load = function(path) {
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
 * @description 通过数据库更新配置
 * @param {Object} db 数据库管理器
 * @param {String} name 要更新的配置名
 * @param {String} table 表名关键词, 支持*table后缀匹配、table*前缀匹配、*table*包含匹配
 * @return {String} 更新成功返回null, 失败返回错误提示
 */
DB.prototype.update_config = async function(db, name, table) {
	if (name) {
		var o = this.get(name);
		if (o) {
			await o.update_config(db, true);
		} else {
			return "该配置不存在";
		}
	} else {
		var list = await db.tables(table);
		if (list.length > 0) {
			for (var i = 0; i < list.length; i++) {
				var te = list[i];
				var drive = new Drive();
				drive.config.table = te;
				drive.update_config(db, true);
				this.list.push(drive);
				// var arr = n.split('_');
				// var dir = "./app/" + arr[0] + "/plugin/api/";
			}
		}
	}

	return null;
};

exports.DB = DB;

/**
 * @description DB数据库池
 */
if (!$.pool.db) {
	$.pool.db = {};
}

/**
 * @description DB数据库管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {String} dir 当前路径
 * @return {Object} 返回一个缓存类
 */
function db_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.db[scope];
	if (!obj) {
		$.pool.db[scope] = new DB(scope);
		obj = $.pool.db[scope];
	}
	return obj;
}

/**
 * @module 导出db管理器
 */
exports.db_admin = db_admin;
