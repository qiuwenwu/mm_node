/**
 * @fileOverview mongoDB帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2.1
 */
require('mm_expand');
const MongoClient = require('mongodb').MongoClient;

/**
 * @description MongoDB帮助类
 */
class MongoDB {
	/**
	 * @description 创建MongoDB帮助类函数 (构造函数)
	 * @param {String} scope 作用域
	 * @param {String} dir 当前路径
	 * @constructor
	 */
	constructor(scope, dir) {
		// 作用域
		this.scope;
		if (scope) {
			this.scope = scope;
		} else {
			this.scope = $.val.scope + '';
		}
		// 当前目录
		this.dir = __dirname;
		if (dir) {
			this.dir = dir;
		}

		// 配置参数
		MongoDB.prototype.config = {
			// 服务器地址
			host: "localhost",
			// 端口号
			port: 27017,
			// 数据库名
			database: "mm",
			// 用户名
			user: "admin",
			// 密码
			password: "",
			// 附加选项
			options: {
				// 使用新的url分析器
				useNewUrlParser: true,
				// 自动重连接
				auto_reconnect: true,
				// 连接池数
				poolSize: 10
			}
		};
		// 连接地址
		this.url;
		// 数据库连接器
		this.conn;
		// 操作的数据库
		this.db;
		// 表名
		this.table = "";
		/**
		 * 页码
		 */
		this.page = 1;
		/**
		 * 每页显示条数
		 */
		this.size = 0;

		/// 设置配置
		/// cg: 配置对象或配置路径 (object|string)
		MongoDB.prototype.setConfig = function(cg) {
			var obj;
			if (typeof(cg) === "string") {
				obj = cg.loadJson(this.dir);
			} else {
				obj = cg;
			}
			$.push(this.config, obj);
		};
		/// 设置Url
		MongoDB.prototype.setUrl = function() {
			var url = "mongodb://";
			if (this.config.password) {
				url += this.config.user + ':' + this.config.password + '@';
			}
			url += this.config.host + ":" + this.config.port + "/";
			this.url = url;
		};
		/// 连接mongoDB数据库
		/// 返回: 连接成功返回true, 失败返回false (bool)
		MongoDB.prototype.open = async function() {
			if (!this.url) {
				this.setUrl();
			}
			var _this = this;
			// 返回一个 Promise
			var p = new Promise((resolve, reject) => {
				MongoClient.connect(_this.url, _this.config.options, function(err, conn) {
					if (err) {
						reject(err);
					} else {
						resolve(conn);
					}
				});
			});
			_this.conn = await p;
			_this.db = _this.conn.db(_this.config.database);
			return _this.conn == true;
		};
		/// 创建数据表
		/// table: 表名 (string)
		/// 返回: 执行结果 (promise|object)
		MongoDB.prototype.addTable = function(table) {
			var _this = this;
			if (table) {
				this.table = table;
			} else {
				table = this.table;
			}
			return new Promise((resolve, reject) => {
				_this.db.createCollection(table, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret);
					}
				});
			});
		};
		/// 增加一条缓存
		/// obj: 对象 (object)
		/// 返回: 执行结果 (promise|object)
		MongoDB.prototype.addObj = function(obj) {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.db.collection(_this.table).insertOne(obj, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret);
					}
				});
			});
		};
		/// 增加多条缓存
		/// list: 对象数组 (array)
		/// 返回: 执行结果 (promise|object)
		MongoDB.prototype.addList = function(list) {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.db.collection(_this.table).insertMany(list, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret);
					}
				});
			});
		};
		/// 删除缓存
		/// query: 对象 (object)
		/// 返回: 执行结果 (promise|object)
		MongoDB.prototype.del = function(query) {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.db.collection(_this.table).remove(query, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret);
					}
				});
			});
		};
		/// 修改缓存
		/// query: 对象 (object)
		/// obj: 对象 (object)
		/// 返回: 执行结果 (promise|object)
		MongoDB.prototype.set = function(query, obj) {
			var _this = this;
			return new Promise((resolve, reject) => {
				_this.db.collection(_this.table).update(query, obj, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret);
					}
				});
			});
		};
		/// 查询缓存
		/// query: 对象 (object)
		/// 返回: 执行结果 (promise|array)
		MongoDB.prototype.get = function(query) {
			var _this = this;
			return new Promise((resolve, reject) => {
				if (_this.page !== 0 && _this.size !== 0) {
					_this.db.collection(_this.table).find(query).limit(_this.size).skip((_this.page - 1) * _this.size).toArray(
						function(err,
							ret) {
							if (err) {
								reject(err);
							} else {
								resolve(ret);
							}
						});
				} else {
					_this.db.collection(_this.table).find(query).toArray(function(err, ret) {
						if (err) {
							reject(err);
						} else {
							resolve(ret);
						}
					});
				}
			});
		};
	}
}
/**
 * @module 导出MongoDB帮助类
 */
exports.MongoDB = MongoDB;


/**
 * @description mongoDB连接池
 */
if (!$.pool.mongoDB) {
	$.pool.mongoDB = {};
}
/**
 * @description MongoDB管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {String} dir 当前路径
 * @return {Object} 返回一个缓存类
 */
function mongoDB_admin(scope, dir) {
	if (!scope) {
		scope = $.val.scope
	}
	var obj = $.pool.mongoDB[scope];
	if (!obj) {
		$.pool.mongoDB[scope] = new MongoDB(scope, dir);
		obj = $.pool.mongoDB[scope];
	}
	return obj;
}
/**
 * @module 导出MongoDB管理器
 */
exports.mongoDB_admin = mongoDB_admin;
