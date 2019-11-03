/**
 * @fileOverview sql语句帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
require('mm_expand');

/**
 * @class 数据库语法通用类
 * @property {Function} filter 设置并过滤参数
 */
class Sql {
	/**
	 * @description 数据库管理器
	 * @param {Function} run 查询函数
	 * @param {Function} exec 更改函数
	 */
	constructor(run, exec) {
		/**
		 * 查询函数
		 */
		this.run = run;
		/**
		 * 更改函数 用于增删改
		 */
		this.exec = exec;

		/**
		 * sql语句
		 */
		this.sql = "";
		/**
		 * 错误提示
		 */
		this.error;
		/**
		 * 查询结果
		 */
		this.results = [];

		/**
		 * 表名
		 */
		this.table = "";
		/**
		 * 显示页
		 */
		this.page = 0;
		/**
		 * 显示条数
		 */
		this.size = 30;
		/**
		 * 请求方式 add、del、set、get、import、export等，跟函数名一致
		 */
		this.method = "";

		/**
		 * 显示的字段
		 */
		this.field = "";

		/**
		 * 排序方式
		 */
		this.orderby = "";

		/**
		 * 是否统计查询结果数
		 */
		this.count_ret = "false";

		/**
		 * 过滤查询参数字典
		 */
		this.config = {
			/**
			 * 分隔符 用于查询时的多条件处理
			 */
			"separator": "|",
			/**
			 * 过滤
			 */
			"filter": {
				/**
				 * 表名
				 */
				"table": "table",
				/**
				 * 查询的页码
				 */
				"page": "page",
				/**
				 * 查询每页条数
				 */
				"size": "size",
				/**
				 * 操作方式: 传入参数method=add, 支持参数 add增、del删、set改、get查，为空则为get
				 */
				"method": "method",
				/**
				 * 排序
				 */
				"orderby": "orderby",
				/**
				 * 查询显示的字段
				 */
				"field": "field",
				/**
				 * 统计结果: 统计符合条件的结果数，只有当page等于1或0时才会统计
				 */
				"count_ret": "count_ret"
			}
		};
	}
}

/**
 * @description 清理存储的数据
 */
Sql.prototype.clear = async function() {
	this.run = run;
	this.exec = exec;
	this.sql = "";
	this.error;
	this.results = [];
	this.table = "";
	this.page = 0;
	this.size = 30;
	this.method = "";
	this.field = "";
	this.orderby = "";
	this.count_ret = "false";
};

/**
 * @description 过滤查询参数
 * @param {Object} query 查询参数
 */
Sql.prototype.filter = function(query) {
	var m = this.config.filter;
	for (var k in m) {
		var key = m[k];
		if (query[key]) {
			this[k] = query[key];
			delete query[key];
		}
	}
};

/**
 * @description 查询条件拼接
 * @param {String} where 查询条件
 * @param {String} sort 排序
 * @param {String} view 返回的字段
 * @return {String} 返回查询条件语句
 */
Sql.prototype.toQuery = function(where, sort, view) {
	var sql = "SELECT {1} FROM `{0}`";
	if (!view) {
		view = "*";
	}
	if (where) {
		sql += " WHERE " + where;
	}
	if (sort) {
		sql += " ORDER BY " + sort;
	}
	sql = sql.replace("{0}", this.table).replace("{1}", view);
	if (this.size && this.page) {
		var start = this.size * (this.page - 1);
		sql += " limit " + start + ',' + this.size;
	}
	return sql;
};
/* ===  传字符串参数  === */
/**
 * @description 增加数据
 * @param {String} key 用作增加的键集合
 * @param {String} val 用作增加的值集合
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.addSql = function(key, val) {
	var sql = "INSERT INTO `{0}` ({1}) VALUES ({2});";
	sql = sql.replace("{0}", this.table).replace("{1}", key).replace("{2}", val);
	return this.exec(sql);
};
/**
 * @description 删除数据
 * @param {String} where  删除条件
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.delSql = function(where) {
	var sql = "DELETE FROM `{0}` WHERE {1};";
	sql = sql.replace("{0}", this.table).replace("{1}", where);
	return this.exec(sql);
};
/**
 * 修改数据
 * @param {String} where 查询条件
 * @param {String} set 修改的键值
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.setSql = function(where, set) {
	var sql = "UPDATE `{0}` SET {1} WHERE {2};";
	sql = sql.replace("{0}", this.table).replace("{1}", set).replace("{2}", where);
	return this.exec(sql);
};
/**
 * @description 查询数据
 * @param {String} where 查询条件
 * @param {String} sort 排序
 * @param {String} view 显示的字段
 * @return {Promise|Array} 查询结果数组
 */
Sql.prototype.getSql = function(where, sort, view) {
	var sql = this.toQuery(where, sort, view);
	return this.run(sql);
};

/**
 * @description 添加或修改
 * @param {String} where 查询条件
 * @param {String} set 修改的键值
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.addOrSetSql = async function(where, set) {
	if (!where || !set) {
		return -1;
	}
	var count = await this.countSql(where);
	if (count === 0) {
		var arr = set.split(',');
		var key = "";
		var value = "";
		arr.map(function(o) {
			var ar = o.split('=');
			if (ar.length === 2) {
				key += "," + ar[0];
				value += "," + ar[1];
			}
		});
		return await this.addSql(key.replace(',', ''), value.replace(',', ''));
	}
	return await this.setSql(where, set);
};

/**
 * @description 查询符合结果总数
 * @param {String} where 查询条件
 * @return {Promise|Number} 返回结果总数
 */
Sql.prototype.countSql = async function(where) {
	var sql = "SELECT count(*) count FROM `" + this.table + "`";
	if (where) {
		sql += ' WHERE ' + where;
	}
	var n = 0;
	var arr = await this.run(sql);
	if (arr.length) {
		n = arr[0].count;
	}
	return n;
};
/**
 * @description 查询数据并返回符合条件总数
 * @param {String} where 查询条件
 * @param {String} sort 排序
 * @param {String} view 返回的字段
 * @return {Promise|Object} 查询到的内容列表和符合条件总数
 */
Sql.prototype.getCountSql = async function(where, sort, view) {
	var list = [];
	var count = await this.countSql(where);
	if (count > 0) {
		list = await this.getSql(where, sort, view);
	}
	var ret = {
		list: list,
		count: count
	};
	return ret;
};
/* ===  sql语句拼接函数  === */
/// 
/**
 * @description 转为where语句
 * @param {Object} obj 用作拼接的对象
 * @return {String} where格式sql语句字符串
 */
Sql.prototype.toWhere = function(obj) {
	var where = "";
	for (var k in obj) {
		where += " and `" + k + "`='" + obj[k] + "'";
	}
	return where.replace(" and ", "");
};
/**
 * @description 转为set语句
 * @param {Object} obj 用作拼接的对象
 * @return {String} set格式sql语句字符串
 */
Sql.prototype.toSet = function(obj) {
	var set = "";
	for (var k in obj) {
		set += ",`" + k + "`='" + obj[k] + "'";
	}
	return set.replace(",", "");
};

/**
 * @description 转添加sql语句
 * @param {Object} item 用作添加的键值
 * @return {String} sql语句
 */
Sql.prototype.toAddSql = function(item) {
	var key = "";
	var val = "";
	for (var k in item) {
		key += ",`" + k + "`";
		val += ",'" + item[k] + "'";
	}
	var sql = "INSERT INTO `{0}` ({1}) VALUES ({2});";
	return sql.replace("{0}", this.table).replace("{1}", key.replace(",", "")).replace("{2}", val.replace(",", ""));
};

/**
 * @description 转删除sql语句
 * @param {Object} query 查询键值
 * @return {String} sql语句
 */
Sql.prototype.toDelSql = function(query) {
	var where = this.toWhere(query);
	var sql = "DELETE FROM `{0}` WHERE {1};";
	return sql.replace("{0}", this.table).replace("{1}", where);
};

/**
 * @description 转修改sql语句
 * @param {Object} query 查询的键值集合
 * @param {Object} item 修改的键值集合
 * @return {String} sql语句
 */
Sql.prototype.toSetSql = function(query, item) {
	var where = this.toWhere(query);
	var set = this.toSet(item);
	var sql = "UPDATE `{0}` SET {1} WHERE {2};";
	return sql.replace("{0}", this.table).replace("{1}", set).replace("{2}", where);
};

/**
 * @description 转查询sql语句
 * @param {Object} query 查询键值集合
 * @param {String} sort 排序规则
 * @param {String} view 显示的字段
 * @return {String} sql语句
 */
Sql.prototype.toGetSql = function(query, sort, view) {
	var where = this.toWhere(query);
	var sql = this.toQuery(where, sort, view);
	return sql;
};
/* ===  传入对象操作  === */
/**
 * @description 增加数据
 * @param {Object} item 添加的对象
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.add = function(item) {
	var sql = this.toAddSql(item);
	return this.exec(sql);
};
/**
 * @description 删除数据
 * @param {Object} query 查询条件集合
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.del = function(query) {
	var sql = this.toDelSql(query);
	return this.exec(sql);
};

/**
 * @description 修改数据
 * @param {Object} query 查询条件集合
 * @param {Object} item 修改的键值集合
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.set = function(query, item) {
	var sql = this.toSetSql(query, item);
	return this.exec(sql);
};

/**
 * @description 查询数据
 * @param {Object} query 查询条件
 * @param {String} sort 排序
 * @param {String} view 返回的字段
 * @return {Promise|Array} 查询结果
 */
Sql.prototype.get = function(query, sort, view) {
	var sql = this.toGetSql(query, sort, view);
	return this.run(sql);
};

/**
 * @description 添加或修改
 * @param {Object} where 查询条件集合
 * @param {Object} set 修改的键值
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.addOrSet = async function(where, set) {
	return await this.addOrSetSql(this.toWhere(where), this.toSet(set));
};

/**
 * @description 查询符合结果总数
 * @param {Object} query 查询条件集合
 * @return {Promise|Number} 查询结果
 */
Sql.prototype.count = function(query) {
	return this.countSql(this.toWhere(query));
};

/**
 * @description 查询数据并返回符合条件总数
 * @param {Object} query 查询条件
 * @param {String} sort 排序
 * @param {String} view 返回的字段
 * @return {Promise|Object} 查询到的内容列表和符合条件总数
 */
Sql.prototype.getCount = async function(query, sort, view) {
	return this.getCountSql(this.toWhere(query), sort, view);
};

/* ===  传入数组操作  === */
/**
 * @description 添加多条数据
 * @param {Array} list 对象数组
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.addList = function(list) {
	var sql = "START TRANSACTION;\n";
	for (var i = 0; i < list.length; i++) {
		sql += this.toAddSql(list[i]);
	}
	return this.exec(sql);
};
/**
 * @description 删除多条数据
 * @param {Array} list 对象数组
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.delList = function(list) {
	var sql = "";
	for (var i = 0; i < list.length; i++) {
		sql += this.toDelSql(list[i].query);
	}
	return this.exec(sql);
};
/**
 * @description 修改多条数据
 * @param {Array} list 对象数组
 * @return {Promise|Object} 执行结果
 */
Sql.prototype.setList = function(list) {
	var sql = "";
	for (var i = 0; i < list.length; i++) {
		sql += this.toSetSql(list[i].query, list[i].item);
	}
	return this.exec(sql);
};

/* 辅助类 */
/**
 * @description 判断SQL模板是否包含某些参数
 * @param {Object} paramDt 参数集合
 * @param {Object} sqlDt sql模板集合
 * @return {Bool} 有则返回true，没有则返回false
 */
Sql.prototype.has_param = function(paramDt, sqlDt) {
	var bl = false;
	for (var key in sqlDt) {
		if (paramDt[key] !== undefined && paramDt[key] !== null && paramDt[key] !== '') {
			bl = true;
			break;
		}
	}
	return bl;
};

/**
 * @description 判断某些参数是否没有SQL模板
 * @param {Object} paramDt 参数集合
 * @param {Object} sqlDt sql模板集合
 * @return {Bool} 没有模板则返回名称，都有则返回undefined
 */
Sql.prototype.not_param = function(paramDt, sqlDt) {
	var name;
	for (var key in paramDt) {
		if (!sqlDt[key]) {
			name = key;
			break;
		}
	}
	return name;
};

/**
 * @description 过滤参数，仅保留没有sql模板的参数
 * @param {Object} paramDt 参数集合
 * @param {Object} sqlDt sql模板集合
 * @return {Object} 返回过滤后的参数集合
 */
Sql.prototype.filter_param = function(paramDt, sqlDt) {
	var dt = [];
	for (var key in paramDt) {
		if (!sqlDt[key]) {
			dt.Add(key, o.Value);
		}
	}
	return dt;
};

/**
 * @description 通过模板拼接查询参数
 * @param {Object} paramDt 参数集合
 * @param {Object} sqlDt 模板集合
 * @return {String} 返回拼接的查询参数
 */
Sql.prototype.tpl_query = function(paramDt, sqlDt) {
	var sql = "";
	if(sqlDt){
		var l = this.config.separator;
		if (l) {
			for (var key in paramDt) {
				var value = paramDt[key] + '';
				var arr = value.split(l);
				var tpl = sqlDt[key];
				if (tpl) {
					if (arr.length > 1) {
						// 如果数量大于0，则增加多条件
						var sl = "(";
						for (var i = 0; i < arr.length; i++) {
							sl += " || " + tpl.replaceAll("{0}", arr[i]);
						}
						sl = sl.replace(" || ", "") + ")";
						sql += " && " + sl;
					} else {
						sql += " && " + tpl.replaceAll("{0}", value);
					}
				} else {
					if (arr.length > 1) {
						// 如果数量大于0，则增加多条件
						var sl = "(";
						for (var i = 0; i < arr.length; i++) {
							sl += " || `" + key + "` = '" + arr[i] + "'";
						}
						sl = sl.replace(" || ", "") + ")";
						sql += " && " + sl;
					} else {
						sql += " && `" + key + "` = '" + value + "'";
					}
				}
			}
		} else {
			for (var key in paramDt) {
				if (sqlDt[key]) {
					sql += " && " + sqlDt[key].replaceAll("{0}", paramDt[key]);
				} else {
					sql += " && `" + key + "` = '" + paramDt[key] + "'";
				}
			}
		}
	}
	else {
		// 如果没有模板，则直接拼接参数
		var l = this.config.separator;
		if (l) {
			// 使用分隔数组拼接
			for (var key in paramDt) {
				var arr = paramDt[key].split(l);
				if (arr.length > 1) {
					// 如果数量大于0，则增加多条件
					var sl = "(";
					for (var i = 0; i < arr.length; i++) {
						sl += " || `" + key + "` = '" + arr[i] + "'";
					}
					sl = sl.replace(" || ", "") + ")";
					sql += " && " + sl;
				} else {
					sql += " && `" + key + "` = '" + paramDt[key] + "'";
				}
			}
		} else {
			// 直接拼接
			for (var key in paramDt) {
				sql += " && `" + key + "` = '" + paramDt[key] + "'";
			}
		}
	}
	return sql.replace(" && ", "");
};

/**
 * @description 通过模板拼接修改参数
 * @param {Object} paramDt 参数集合
 * @param {Object} sqlDt 模板集合
 * @return {String} 返回拼接的查询参数
 */
Sql.prototype.tpl_body = function(paramDt, sqlDt) {
	var sql = "";
	if (!sqlDt || sqlDt.length === 0) {
		for (var key in paramDt) {
			sql += " , `" + key + "` = '" + val[key];
		}
	} else {
		for (var key in paramDt) {
			if (sqlDt[key]) {
				sql += " , " + sqlDt[key].replace("{0}", paramDt[key]).replace('+ -', '- ').replace('- -', '+ ');
			} else {
				sql += " , `" + key + "` = '" + paramDt[key] + "'";
			}
		}
	}
	return sql.replace(" , ", "");
};

/**
 * @description 构建实体模型
 * @param {Object} obj 模型对象
 * @return {Object} 返回监听操作的对象
 */
Sql.prototype.model = function(model) {
	var _this = this;
	return new Proxy(model, {
		set: function(obj, prop, value) {
			if (typeof(value) === "number") {
				var n = obj[prop];
				var cha = value - n;
				if (cha > 0) {
					_this.setSql("`" + _this.key + "`=" + obj[_this.key] + "", "`" + prop + "`=`" + prop + "` + " + cha);
				} else if (cha < 0) {
					_this.setSql("`" + _this.key + "`=" + obj[_this.key] + "", "`" + prop + "`=`" + prop + "` - " + (-cha));
				} else {
					_this.setSql("`" + _this.key + "`=" + obj[_this.key] + "", "`" + prop + "`=" + value);
				}
			} else {
				var query = {};
				query[_this.key] = obj[_this.key];
				var set = {};
				set[prop] = value;
				_this.set(query, set);
			}
			obj[prop] = value;
			return obj;
		}
	});
};

/**
 * @description 查询一条数据
 * @param {Object} query 查询条件
 * @param {String} sort 排序
 * @param {String} view 返回的字段
 * @return {Promise|Array} 查询结果
 */
Sql.prototype.getObj = async function(query, sort, view) {
	this.page = 1;
	this.size = 1;
	if (this.key) {
		if (view && view.indexOf(this.key) === -1 && view.indexOf('*') === -1) {
			view += ",`" + this.key + "`";
		}
	}
	var sql = this.toGetSql(query, sort, view);
	var list = await this.run(sql);
	if (list.length > 0) {
		var obj = list[0];
		if (this.key) {
			return this.model(obj);
		} else {
			return obj;
		}
	} else {
		return null;
	}
};

module.exports = Sql;
