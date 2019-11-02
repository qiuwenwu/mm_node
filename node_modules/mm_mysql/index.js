/**
 * @fileOverview Mysql帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */

const {
	createPool
} = require('mysql');
const {
	DB
} = require('./db');

var pool = {};

/**
 * @description 数据库封装
 */
class Mysql {
	/**
	 * @description 创建Mysql帮助类函数 (构造函数)
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
		// 错误提示
		this.error;
		/**
		 * sql语句
		 */
		this.sql = "";
		// 执行结果
		this.results = [];
		// 连接器
		this.conn;

		// 数据库配置参数
		this.config = {
			// 服务器地址
			host: "localhost",
			// 端口号
			port: 3306,
			// 连接用户名
			user: "root",
			// 连接密码
			password: "asd123",
			// 数据库
			database: "mm",
			// 是否支持多个sql语句同时操作
			multipleStatements: true,
		};
		
		// 唯一标识符
		this.identifier = this.config.host + "/" + this.config.database;
		
		// 定义当前类, 用于数据库实例化访问
		var $this = this;
				
		/**
		 * @description 查询sql
		 * @param {String} sql 查询参
		 * @param {Array} val 替换值
		 * @return {Promise|Array} 异步构造器, 当await时返回执行结果
		 */
		this.run = function(sql, val) {
			var _this = this;
			this.sql = sql;
			// 返回一个 Promise
			return new Promise((resolve, reject) => {
				$this.conn.getConnection(function(err, db) {
					if (err) {
						_this.error = {
							code: 2003,
							message: $.info(err).between('Error: ', '\n')
						};
						resolve([]);
					} else {
						db.query(sql, val, (err, rows) => {
							// 结束会话
							db.release();
							if (err) {
								_this.error = {
									code: err.errno,
									message: err.sqlMessage
								};
								resolve([]);
							} else {
								_this.error = undefined;
								resolve(rows);
							}
						});
					}
				});
			});
		};
		
		/**
		 * @description 增删改sql
		 * @param {String} sql 查询参
		 * @param {Array} val 替换值
		 * @return {Promise|Array} 异步构造器, 当await时返回执行结果
		 */
		this.exec = function(sql, val) {
			var _this = this;
			this.sql = sql;
		
			// 返回一个 Promise
			return new Promise((resolve, reject) => {
				$this.conn.getConnection(function(err, db) {
					if (err) {
						_this.error = {
							code: 41000,
							message: $.info(err).between('Error: ', '\n')
						};
						resolve(-1);
					} else {
						db.query(sql, val, (err, o) => {
							if (err) {
								_this.error = {
									code: err.errno,
									message: err.sqlMessage
								};
								_this.results = [];
								resolve(-1);
							} else {
								_this.error = undefined;
								if (o.constructor == Array) {
									if (o.length > 0) {
										_this.results = o;
										var num = 0;
										o.map(function(item) {
											num += item['affectedRows'];
										});
										if (num === 0) {
											resolve(o.length);
										} else {
											resolve(num);
										}
									} else {
										_this.results = [{
											count: 1
										}];
										resolve(1);
									}
								} else {
									_this.results = [o];
									var num = o['affectedRows'];
									if (num === 0) {
										resolve(1);
									} else {
										resolve(num);
									}
								}
							}
							// 结束会话
							db.release();
						});
					}
				});
			});
		};
	
		/**
		 * @description 获取数据库管理器
		 */
		this.db = function() {
			return new DB($this.config.database, $this.run, $this.exec);
		};
	}
}

/**
 * 设置配置参数
 * @param {Object} cg 配置对象或配置路径
 */
Mysql.prototype.setConfig = function(cg) {
	var obj;
	if (typeof(cg) === "string") {
		obj = cg.loadJson(this.dir);
	} else {
		obj = cg;
	}
	$.push(this.config, obj);
	this.identifier = this.config.host + "/" + this.config.database;
};

/**
 * @description 打开数据库, 如果没有则建立数据库连接再打开
 */
Mysql.prototype.open = function() {
	if (!pool[this.identifier]) {
		pool[this.identifier] = createPool(this.config);
	}
	this.conn = pool[this.identifier];
};

/**
 * @description 关闭连接
 */
Mysql.prototype.close = function() {
	if (pool[this.identifier]) {
		pool[this.identifier] = null;
	}
};

/**
 * @description 导出Mysql帮助类
 */
exports.Mysql = Mysql;


/**
 * @description mysql连接池
 */
if (!$.pool.mysql) {
	$.pool.mysql = {};
}

/**
 * @description 缓存管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {String} dir 当前路径
 * @return {Object} 返回一个缓存类
 */
function mysql_admin(scope, dir) {
	if (!scope) {
		scope = $.val.scope
	}
	var obj = $.pool.mysql[scope];
	if (!obj) {
		$.pool.mysql[scope] = new Mysql(scope, dir);
		obj = $.pool.mysql[scope];
	}
	return obj;
}

/**
 * @description 导出Mysql管理函数
 */
exports.mysql_admin = mysql_admin;
