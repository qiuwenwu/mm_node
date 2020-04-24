const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * 数据库帮助类
 * @extends {Index}
 * @class
 */
class DB extends Index {
	/**
	 * 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "db";
		this.title = title;
	}
}

/**
 * 加载配置
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
 * 获取驱动项
 * @param {String} table 表
 */
DB.prototype.getObj = function(table) {
	var obj;
	var list = this.list;
	for (var i = 0, o; o = list[i++];) {
		if (o.config.table === table) {
			obj = o;
			break;
		}
	}
	return obj;
};

/**
 * 通过数据库更新配置
 * @param {Object} db 数据库管理器
 * @param {String} name 要更新的配置名
 * @param {String} table 表名关键词, 支持*table后缀匹配、table*前缀匹配、*table*包含匹配
 * @param {Boolean} cover 是否覆盖文件
 * @return {String} 更新成功返回null, 失败返回错误提示
 */
DB.prototype.update_config = async function(db, name, table, cover = true) {
	if (name) {
		var o = this.get(name);
		if (o) {
			await o.update_config(db, cover);
		} else {
			return "该配置不存在";
		}
	} else {
		var list = await db.tables(table);
		var len = list.length;
		if (len > 0) {
			var lt = [];
			var len = list.length;
			for (var i = 0; i < len; i++) {
				var te = list[i];
				var obj = this.getObj(te);
				if (obj) {
					obj.update_config(db, cover);
				} else {
					var drive = new Drive();
					drive.config.table = te;
					drive.update_config(db, cover);
					this.list.push(drive);
				}
			}
		}
	}
	return null;
};

/**
 * 通过配置修改数据库
 * @param {Object} db 数据库管理器
 * @param {String} name 要更新的配置名
 * @param {String} table 表名关键词, 支持*table后缀匹配、table*前缀匹配、*table*包含匹配
 * @param {Boolean} all 是否更新全部表，true为是，false为否
 * @return {String} 更新成功返回null, 失败返回错误提示
 */
DB.prototype.update_db = async function(db, name, table, all) {
	var ret;
	if (name) {
		var o = this.get(name);
		if (o) {
			ret = await o.update_db(db);
		} else {
			ret = "该配置不存在";
		}
	} else {
		var list = this.list;
		var len = list.length;
		if (len > 0) {
			if (table) {
				for (var i = 0, o; o = list[i++];) {
					if (o.config.table === table) {
						ret = await o.update_db(db);
						break;
					}
				}
			} else if (all) {
				for (var i = 0, o; o = list[i++];) {
					await o.update_db(db);
				}
			}
		}
	}
	return ret;
};

exports.DB = DB;

/**
 * DB数据库池
 */
if (!$.pool.db) {
	$.pool.db = {};
}

/**
 * DB数据库管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function db_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.db[scope];
	if (!obj) {
		$.pool.db[scope] = new DB(scope, title);
		obj = $.pool.db[scope];
	}
	return obj;
}

/**
 * @module 导出db管理器
 */
exports.db_admin = db_admin;
