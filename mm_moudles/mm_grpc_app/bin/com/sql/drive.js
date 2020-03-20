const Item = require('mm_machine').Item;

/**
 * @description Sql操作驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * @description 构造函数
	 * @param {String} dir 当前路径
	 * @constructor
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./sql.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			// 名称
			"name": "",
			// 表名 {0} 代表可前端传参自定义查询的表
			"table": "{0}",
			// 主键 用于水平连表查询时 例如：id
			"key": "",
			// 排序 {0} 代表可前台传参自定义排序规则 格式: `name` asc, `id` desc
			"orderby": "{0}",
			// 默认排序 `id` desc
			"orderby_default": "",
			// 显示的字段 {0} 代表可前台传参自定义查询的字段, 例如: `id`,`username`,`name`,`email`
			"field": "{0}",
			// 默认显示字段 例如： `id`,`username`,`name`
			"field_default": "*",
			// 隐藏字段 有些字段即使前端请求也不能返回，这是通过隐藏字段将其过滤掉, 例如：password *表示包含匹配
			"field_hide": ["*password*", "*token*", "salt"],
			// 分页大小，默认一页显示条数
			"page_size": 30,
			/* 过滤参数 */
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
			},
			// 分隔符 用于查询时的多条件处理
			"separator": "|",
			// 支持的方法 add增、del删、set改、get查, 只填get表示只支持查询 // import export del_repeat",
			"method": "add del set get",
			// sql查询语句
			"query": {},
			// 默认查询, 当查询条件中不包含该项时，默认添加该项。 例如: { "age": "`age` < 20" } , 当查询参含有age，不调用该项，不存在时，sql会增加该项
			"query_default": {},
			// sql更改语句
			"update": {},
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": "",
			/* 导入导出转换 */ 
			"convert": {
				/*
				需要转换的字段名
				"city_id":
				{
					// 转换时对应的名字
					"title": "城市",
					// 转换来源 table 表示从数据表中转换、array 表示从数组中转换
					"source": "table",
					// 表名，当选择转换方式 表转换时需填写
					"table": "mm_web_region",
					// 转换值来源字段
					"field": "rid",
					// 转换时匹配的键
					"key": "name",
					// 查询条件，用于加速转换
					"select": "`group`='市'"
					// 数组转换时的对应值
					"array": ["待售中","已预约","已售出","已下架","已删除"]
				}
				*/
			},
			/* 去重 */
			"del_repeat": {
				// 判断重复的字段，例如字段名 number
				"groupBy": "",
				// 排序方式 例如： `diJia` ASC
				"orderBy": ""
			},
			/* 逻辑符 */
			"logic": {}
		};
	}
}

/**
 * @description 执行前, 可用于过滤参数
 * @param {Object} params 参数对象 (object) 包含query和body 如{ query, body }
 * @param {Object} db 数据库管理器
 * @return {Object} 过滤后的参数
 */
Drive.prototype.before = async function(params, db) {
	return params;
};
/**
 * @description 验证, 用于判断是否执行
 * @param {Object} params 参数对象 (object) 包含query和body
 * @param {Object} db 数据管理器
 * @return {Boolean} 验证通过返回true, 失败返回false
 */
Drive.prototype.check = async function(params, db) {
	return true;
};
/**
 * @return {type} 执行后 可用于附加执行
 * @param {Object} params 参数对象 (object) 包含query和body
 * @param {Object} db 数据管理器
 * @return {Object} 最终执行结果
 */
Drive.prototype.after = async function(params, db) {
	return db.ret;
};

/**
 * @description 更新缓存
 * @param {Object} sql
 */
Drive.prototype.update_cache = async function(table, sql) {

};

/**
 * @ 执行修改
 * @param {Object} query 查询url参数
 * @param {Object} body 修改时置入body的参数
 * @param {Object} db 数据库管理器
 */
Drive.prototype.run = async function(query, body, db) {
	var params = {
		query,
		body
	};
	params = await this.before(params, db);
	if (this.check(params, db)) {
		var ret = await this.main(params, db);
		if (!ret.error) {
			db.ret = ret;
			return await this.after(params, db);
		} else {
			return ret;
		}
	}
	return null;
};

/**
 * @description 执行模板操作
 * @param {Object} params 参数对象 (object) 包含query和body
 * @param {Object} db 数据管理器
 */
Drive.prototype.main = async function(params, db) {
	var {
		query,
		body
	} = params;
	var ret;
	var cg = this.config;
	var qy = Object.assign({}, query);
	// 过滤查询参数
	var f = cg.filter;
	$.push(db.config.filter, cg.filter, true);
	db.filter(qy);
	if (!db.method) {
		db.method = "get";
	}
	if (!cg.method.has("*" + db.method + "*")) {
		return $.ret.error(50001, '不支持的操作方式')
	}
	var table = query[f.table];

	// 设置操作的数据表
	if (cg.table.has("*{0}*")) {
		if (table) {
			db.table = cg.table.replace('{0}', table);
		} else {
			return $.ret.error(70000, '表名不能为空');
		}
	} else {
		db.table = cg.table + '';
		if (table) {
			qy[f.table] = table;
		}
	}
	switch (db.method) {
		case "get":
			db.config.separator = cg.separator;
			if (!query.size && cg.page_size) {
				db.size = cg.page_size + 0;
			}
			if (db.size > 0 && db.page === 0) {
				db.page = 1;
			}
			// 设置查询字段
			var field = query[f.field];
			if (cg.field.has("*{0}*")) {
				if (field) {
					if (cg.field_hide.getMatch(field)) {
						return $.ret.error(70003, '不合法的查询参数');
					}
					db.field = cg.field.replace('{0}', field);
				} else if (cg.field_default) {
					db.field = cg.field_default + '';
				}
			} else {
				db.field = cg.field + '';
				if (field) {
					qy[f.field] = field;
				}
			}

			// 设置排序方式
			var orderby = query[f.orderby];
			if (cg.orderby.has("*{0}*")) {
				if (orderby) {
					db.orderby = cg.orderby.replace('{0}', orderby);
				} else if (cg.orderby_default) {
					db.orderby = cg.orderby_default + '';
				}
			} else {
				db.orderby = cg.orderby + '';
				if (orderby) {
					qy[f.orderby] = orderby;
				}
			}
			var query_str = db.tpl_query(qy, cg.query);
			var qt = cg.query_default;
			if (Object.keys(qt).length > 0) {
				var id = $.dict.user_id;
				var word = "{" + id + "}";
				var user_id = "0";
				if (db.user && db.user[id]) {
					user_id = db.user[id];
				}
				for (var k in qt) {
					if (!qy[k]) {
						query_str += " && " + qt[k].replace(word, user_id);
					}
				}
				if (query_str.startsWith(" && ")) {
					query_str = query_str.replace(" && ", "");
				}
			}

			// 查询
			if (db.count_ret === "true") {
				ret = $.ret.body(await db.getCountSql(query_str, db.orderby, db.field));
			} else {
				ret = $.ret.list(await db.getSql(query_str, db.orderby, db.field));
			}
			break;
		case "set":
			// 修改
			var query_str = db.tpl_query(qy, cg.query);
			var set_str = db.tpl_body(body, cg.update);
			ret = $.ret.bl(await db.setSql(query_str, set_str));
			if (ret.result.bl < 1) {
				ret.result.tip = '没有改变任何数据'
			}
			break;
		case "add":
			// 添加
			if (Object.keys(body).length > 0) {
				ret = $.ret.bl(await db.add(body));
			} else {
				ret = $.ret.error(70000, '参数不能为空');
			}
			break;
		case "del":
			// 删除
			var query_str = db.tpl_query(qy, cg.query);
			ret = $.ret.bl(await db.delSql(query_str));
			break;
		case "addOrSet":
			if (Object.keys(body).length > 0 && Object.keys(qy).length > 0) {
				ret = $.ret.bl(await db.addOrSet(qy, body));
			} else {
				ret = $.ret.error(70000, '参数不能为空');
			}
		case "import":
			// 导入
			break;
		case "export":
			// 导出
			break;
		default:
			ret = $.ret.error(50001, '不支持的操作方式');
			break;
	}
	// console.log(db.sql);
	// 				case "import": //导入
	// 					if (can.Contains("export")) {
	// 						if (paracg.TryGetValue("url", out object fileToken)) {
	// 							var url = fileToken.ToString();
	// 							var file = CacheModel.webPath + url;
	// 							var convert = false;
	// 							if (paracg.TryGetValue(cg.Convert, out object ctb)) {
	// 								paracg.Remove(cg.Convert);
	// 								convert = true;
	// 							}
	// 							var fast = false;
	// 							if (paracg.TryGetValue("fast", out object ctj)) {
	// 								fast = true;
	// 							}
	// 							var n = Import(file.Replace("/", "\\").Replace("\\\\", "\\"), cg.NoRepeat, convert, cg.Map, table, fast);
	// 							if (n > 0) {
	// 								var dt = new Dictionary < string,
	// 									object > {
	// 										{
	// 											"bl",
	// 											true
	// 										},
	// 										{
	// 											"num",
	// 											n
	// 										}
	// 									};
	// 								ret = ToRet("", dt);
	// 								if (cg.Update.ContainsKey("createtime")) {
	// 									Table = table;
	// 									SetAsync("`createtime` < '1997-01-02'", "`createtime` = now()");
	// 								}
	// 							} else if (string.IsNullOrEmpty(Ex)) {
	// 								ret = ToRet("", null, 10010);
	// 							} else {
	// 								ret = ToRet(Ex, null, 10000);
	// 							}
	// 						} else {
	// 							ret = ToRet("缺少url参数", null, 32000);
	// 						}
	// 					} else {
	// 						ret = ToRet("", null, 20000);
	// 					}
	// 					break;
	// 				case "export": //导出
	// 					if (can.Contains("export")) {
	// 						var convert = false;
	// 						if (paracg.TryGetValue(cg.Convert, out object ctb)) {
	// 							paracg.Remove(cg.Convert);
	// 							convert = true;
	// 						}
	// 						if (!paracg.TryGetValue("pagesize", out object k)) {
	// 							paracg.Add("pagesize", 30000);
	// 						}
	// 						sql = GetQuerySql(param, m, table, out string getSqlB);
	// 						var file = CacheModel.uploadPath + "file\\" + DateTime.Now.ToFileTime() + ".xlsx";
	// 
	// 						var bl = Export(sql, file, convert, cg.Map, table);
	// 						if (bl) {
	// 							var url = file.Replace(CacheModel.webPath, "/").Replace("\\", "/");
	// 							ret = ToRet("", "{ \"url\": \"" + url + "\" }");
	// 						} else if (string.IsNullOrEmpty(Ex)) {
	// 							ret = ToRet("", null, 10010);
	// 						} else {
	// 							ret = ToRet(Ex, null, 10000);
	// 						}
	// 					} else {
	// 						ret = ToRet("", null, 20000);
	// 					}
	// 					break;
	// 				case "delrepeat": //删除重复
	// 					if (cg.DelRepeat != null) {
	// 						var str = DelRepeat(cg.DelRepeat, table);
	// 						if (str === "[]") {
	// 							if (string.IsNullOrEmpty(Ex)) {
	// 								ret = ToRetBl("没有找到重复项", false);
	// 							} else {
	// 								ret = ToRetBl("去重失败,原因：" + Ex, false);
	// 							}
	// 						} else {
	// 							ret = ToRetBl("", true);
	// 							ret = ret.Replace("true }", "true, \"array\": " + str + " }");
	// 						}
	// 					} else {
	// 						ret = ToRet("", null, 20000);
	// 					}
	// 					break;
	// 				default:
	// 					ret = ToRet("", null, 10003);
	// 					break;
	// 			}
	return ret;
};

module.exports = Drive;
