/**
 * @fileOverview redis缓存帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
require('mm_expand');
const {
	createClient
} = require('redis');

var pool = {};

/* 创建Redis帮助类函数 */
/// 构造函数
class Redis {
	/**
	 * @description 创建Redis帮助类函数 (构造函数)
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
		this.config = {
			// 服务器地址
			"host": "localhost",
			// 端口号
			"port": 6379,
			// 密码
			"password": "asd123",
			/// 数据库
			"database": 0
		};
		// 唯一标识符
		this.identifier = this.config.host + "/" + this.config.database;
		// 数据库连接器
		this.conn;
	}
}


/**
 * @description 设置配置
 * @param {Object} cg 配置对象或配置路径
 */
Redis.prototype.setConfig = function(cg) {
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
 * @description 连接Redis数据库
 */
Redis.prototype.open = function() {
	if (!pool[this.host]) {
		var cg = this.config;
		pool[this.identifier] = createClient(cg.port, cg.host);
		var p = cg.password;
		if (p) {
			pool[this.identifier].auth(p);
		}
	}
	this.conn = pool[this.identifier];
};

/**
 * @description 关闭连接
 */
Redis.prototype.close = function() {
	var cg = this.config;
	if (pool[this.identifier]) {
		pool[this.identifier].quit();
		delete pool[this.identifier];
	}
};

/**
 * @description 查询或是设置缓存过期时间
 * @param {String} key 键
 * @param {Number} seconds 秒, 为空则查询有效时长
 * @return {Promise|Number|Boolean} 查询时长或设置结果, 时长为-1表示永不过期
 */
Redis.prototype.ttl = function(key, seconds) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (seconds) {
			if (seconds > 0) {
				_this.conn.expire(key, seconds, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret === 1);
					}
				});
			} else {
				_this.conn.persist(key, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret === 1);
					}
				});
			}
		} else {
			_this.conn.ttl(key, function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		}
	});
};

/**
 * @description 增加整数值(负数为减)
 * @param {String} key 键
 * @param {Number} num 数值
 * @return {Promise|Number} 计算后的结果
 */
Redis.prototype.addInt = function(key, num) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (num > 0) {
			_this.conn.incrby(key, num, function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		} else {
			_this.conn.decrby(key, -num, function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		}
	});
};

/**
 * @description 增加浮点数值(负数为减)
 * @param {String} key 键
 * @param {Number} num 数值
 * @return {Promise|Number} 计算后的结果
 */
Redis.prototype.addFloat = function(key, num) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (num > 0) {
			_this.conn.incrbyfloat(key, num, function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		} else {
			_this.conn.decrby(key, -num, function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		}
	});
};

/**
 * @description 增加字符串值到指定缓存
 * @param {String} key 键
 * @param {String} str 添加的字符串
 * @return {Promise|String} 添加后的字符串
 */
Redis.prototype.addStr = function(key, str) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.append(key, str, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 删除缓存
 * @param {String} key 键
 * @return {Promise|Boolean} 成功返回true,失败返回false
 */
Redis.prototype.del = function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.del(key, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret === "OK");
			}
		});
	});
};

/**
 * @description 修改缓存
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} seconds 秒
 * @return {Object} 值
 */
Redis.prototype.set = function(key, value, seconds) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.set(key, value, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				if (seconds) {
					_this.conn.expire(key, seconds);
				}
				resolve(ret === "OK");
			}
		});
	});
};

/**
 * @description 修改缓存
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} seconds 秒
 * @return {Promise|Object} 值
 */
Redis.prototype.add = function(key, value, seconds) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.exists(key, function(error, res) {
			if (error) {
				reject(error);
			} else {
				if (res) {
					// 已存在，不增加
					resolve(false);
				} else {
					_this.conn.set(key, value, function(err, ret) {
						if (err) {
							reject(err);
						} else {
							if (seconds) {
								_this.conn.expire(key, seconds);
							}
							resolve(ret === "OK");
						}
					});
				}
			}
		});
	});
};

/**
 * @description 查询缓存
 * @param {String} key 键
 * @return {Promise|Object} 查询值
 */
Redis.prototype.get = function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.get(key, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 判断键是否存在
 * @param {String} key 键
 * @return {Promise|Boolean} 有返回true, 没有返回false
 */
Redis.prototype.has = function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.exists(key, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret === 1);
			}
		});
	});
};

/**
 * @description 查询缓存的字符串中的一段字符串
 * @param {String} key 键
 * @param {Number} start 开始位置
 * @param {Number} end 结束位置
 * @return {Promise|String} 查询值
 */
Redis.prototype.getrange = function(key, start, end) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.getrange(key, start, end, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 在值的指定位置开始增加一段字符串
 * @param {String} key 键
 * @param {Number} index 开始位置
 * @param {String} value 变更的值
 * @return {Promise|Number} 字符串长度
 */
Redis.prototype.setrange = function(key, index, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.getrange(key, index, value, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 清空缓存
 * @param {String} key 键, 为空则清空所有
 * @return {Promise|Array} 执行结果
 */
Redis.prototype.clear = function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (key) {
			_this.conn.del(key, function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		} else {
			_this.conn.flushdb(function(err, ret) {
				if (err) {
					reject(err);
				} else {
					resolve(ret);
				}
			});
		}
	});
};

/**
 * @description 排序
 * @param {String} key 键
 * @param {String} way = [asc|desc]排序方式, 可以为空
 * @param {String} obj_key 排序成员的键
 * @return {Promise|Array} 排序后的数组
 */
Redis.prototype.sort = function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.sort(key, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 获取所有键名
 * @param {String} key 键 支持*号, 前面加*表示后面名称一致, 前后加*表示包含名称, 后面加*表示前面名称一致
 * @return {Promise|Array} 键数组
 */
Redis.prototype.keys = function(key) {
	var _this = this;
	if (!key) {
		key = "*";
	}
	return new Promise((resolve, reject) => {
		_this.conn.keys(key, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 修改数组缓存
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} seconds 秒
 * @return {Promise|Array} 执行结果
 */
Redis.prototype.list_set = function(key, value, seconds) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.rpush(key, value, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				if (seconds) {
					_this.conn.expire(key, seconds);
				}
				resolve(ret);
			}
		});
	});
};

/**
 * @description 数组缓存追加对象
 * @param {String} key 键
 * @param {Object} value 值
 * @return {Promise|String} 追加后的数组
 */
Redis.prototype.list_push = function(key, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		_this.conn.rpush(key, value, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 判断成员是否存在
 * @param {String} key 键
 * @param {Object} value 值
 * @return {Promise|Boolean} 存在返回true, 否则返回false
 */
Redis.prototype.list_has = function(key, value) {
	var _this = this;
	return new Promise(async (resolve, reject) => {
		if (!value) {
			reject('值不能为空');
		}
		var arr = await _this.list_get(key);
		var has = false;
		for (var i = 0; i < arr.length; i++) {
			if (value == arr[i]) {
				has = true;
				break;
			}
		}
		resolve(has);
	});
};

/**
 * @description 查询数组缓存
 * @param {String} key 键
 * @param {Number} start 起始位置
 * @param {Number} end 结束位置
 * @return {Promise|Array} 查询到的数组
 */
Redis.prototype.list_get = function(key, start, end) {
	var _this = this;
	if (start === undefined) {
		start = 0;
	}
	if (end === undefined) {
		end = -1;
	}
	return new Promise((resolve, reject) => {
		_this.conn.lrange(key, start, end, function(err, ret) {
			if (err) {
				reject(err);
			} else {
				resolve(ret);
			}
		});
	});
};

/**
 * @description 清空数组缓存
 * @param {String} key 键
 * @param {Array} value 新成员, 没有则删除数组
 * @return {Promise|Boolean} 成功返回true，是否返回false
 */
Redis.prototype.list_clear = function(key, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (key) {
			if (value) {
				// 如果有值则删除其他成员，保留新值
				_this.list_push(key, value).then(function(len) {
					_this.conn.ltrim(key, len - value.length, len - 1, function(err, ret) {
						if (err) {
							reject(err);
						} else {
							resolve(ret === "OK");
						}
					});
				}, function(er) {
					reject(er);
				});
			} else {
				// 直接删除键
				_this.conn.del(key, function(err, ret) {
					if (err) {
						reject(err);
					} else {
						resolve(ret === "OK");
					}
				});
			}
		} else {
			reject('键不能为空');
		}
	});
};
/**
 * @description 导出Redis类
 */
exports.Redis = Redis;

/**
 * @description redis连接池
 */
if (!$.pool.redis) {
	$.pool.redis = {};
}

/**
 * @description 缓存管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {String} dir 当前路径
 * @return {Object} 返回一个缓存类
 */
function redis_admin(scope, dir) {
	if (!scope) {
		scope = $.val.scope
	}
	var obj = $.pool.redis[scope];
	if (!obj) {
		$.pool.redis[scope] = new Redis(scope, dir);
		obj = $.pool.redis[scope];
	}
	return obj;
}

/**
 * @description 导出redis管理函数
 */
exports.redis_admin = redis_admin;
