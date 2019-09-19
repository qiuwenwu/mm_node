/**
 * @description Admin管理帮助类
 * @class 
 */
function admin(type, funcs) {
	/**
	 * @description 查询
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回查询结果
	 */
	function get(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var name = q["name"];
			var cs = $.pool[type][scope];
			if (cs) {
				if (name) {
					var config = cs.get(name);
					if (config) {
						return $.ret.body(config);
					} else {
						return $.ret.error(10002, "配置" + name + "不存在");
					}
				} else {
					var lt = cs.list;
					var list = [];
					for (var i = 0; i < lt.length; i++) {
						var o = lt[i].config;
						list.push({
							name: o.name,
							title: o.title,
							description: o.description
						});
					}
					return $.ret.body({
						scope: name,
						list: list
					});
				}
			} else {
				return $.ret.error(50002, "该作用域（scope）不存在");
			}
		} else {
			var arr = Object.keys($.pool[type]);
			return $.ret.body({
				"scope": arr
			});
		}
	}

	/**
	 * @description 修改
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回修改结果
	 */
	function set(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var m = $.pool[type][scope];
			if (m) {
				var obj = req.body;
				if (m.set(obj)) {
					var bl = m.save(obj.name);
					if (bl) {
						return $.ret.bl(true, "修改成功");
					} else {
						return $.ret.bl(true, "修改成功，但文件保存失败");
					}
				} else {
					return $.ret.bl(false, "修改失败");
				}
			} else {
				return $.ret.error(30002, "错误的作用域（scope）");
			}
		} else {
			return $.ret.error(30000, "缺少作用域（scope）参数");
		}
	}

	/**
	 * @description 删除
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回查询结果
	 */
	function del(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var name = q["name"];
			var cs = $.pool[type][scope];
			if (cs) {
				if (name) {
					var file = cs.del(name, q["remove"]);
					if (file) {
						return $.ret.bl(true, "删除成功。文件路径：" + file);
					} else {
						return $.ret.bl(false, "删除失败，配置" + name + "不存在");
					}
				} else {
					return $.ret.error(30000, "该删除的名称（name）不能为空");
				}
			} else {
				return $.ret.error(50002, "该作用域（scope）不存在");
			}
		} else {
			return $.ret.error(30000, "缺少作用域（scope）参数");
		}
	}

	/**
	 * @description 添加
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回添加结果
	 */
	function add(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var m = $.pool[type][scope];
			if (m) {
				var obj = req.body;
				var msg = m.add(obj);
				if (msg) {
					return $.ret.bl(false, "添加失败" + msg);
				} else {
					return $.ret.bl(true, "添加成功");
				}
			} else {
				return $.ret.error(30002, "错误的作用域（scope）");
			}
		} else {
			return $.ret.error(30000, "缺少作用域（scope）参数");
		}
	}

	/**
	 * @description 加载配置
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回加载结果
	 */
	function load(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var cs = $.pool[type][scope];
			if (cs) {
				var file = q["file"];
				if (file) {
					var msg = load_file(file);
					if (msg) {
						return $.ret.bl(false, msg);
					} else {
						return $.ret.bl(true);
					}
				} else {
					return $.ret.error(30000, "该加载的文件（file）不能为空");
				}
			} else {
				return $.ret.error(50002, "该作用域（scope）不存在");
			}
		} else {
			return $.ret.error(30000, "缺少作用域（scope）参数");
		}
	}

	/**
	 * @description 保存配置
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回保存结果
	 */
	function save(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var name = q["name"];
			var cs = $.pool[type][scope];
			if (cs) {
				if (name) {
					var bl = cs.save(name);
					if (bl) {
						return $.ret.bl(true, "保存成功");
					} else {
						return $.ret.bl(false, name + '配置不存在');
					}
				} else {
					return $.ret.error(30000, "名称（name）不能为空");
				}
			} else {
				return $.ret.error(50002, "该作用域（scope）不存在");
			}
		} else {
			return $.ret.error(30000, "缺少作用域（scope）参数");
		}
	}

	/**
	 * @description 更新配置
	 * @param {Object} req HTTP请求上文
	 * @return {Object} 返回保存结果
	 */
	function update(req) {
		var q = req.query;
		var scope = q["scope"];
		if (scope) {
			var cs = $.pool[type][scope];
			if (cs) {
				var name = q["name"];
				if (name) {
					var file = cs.del(name);
					if (file) {
						var msg = cs.load_file(file);
						if (msg) {
							return $.ret.bl(false, msg);
						} else {
							return $.ret.bl(true, "更新成功");
						}
					} else {
						return $.ret.bl(false, '更新失败，' + name + "配置不存在");
					}
				} else {
					var dir = q["dir"];
					if (dir) {
						try{
							cs.update(dir);
							return $.ret.bl(true, '全部更新成功');
						}
						catch(e){
							
						}
						return $.ret.error(10000, '业务逻辑错误');
					} else {
						return $.ret.error(50002, "更新的名称（name）不能为空");
					}
				}
			} else {
				return $.ret.error(50002, "该作用域（scope）不存在");
			}
		} else {
			return $.ret.error(30000, "缺少作用域（scope）参数");
		}
	}

	/**
	 * @description 接口主函数
	 * @param {Object} ctx HTTP上下文
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	return async function main(ctx, db) {
		// 获取请求参数
		var req = ctx.request;
		var method = req.query["method"];
		if (!method) {
			method = "get";
		}
		var ret;
		switch (method) {
			case "get":
				ret = get(req);
				break;
			case "set":
				ret = set(req);
				break;
			case "add":
				ret = add(req);
				break;
			case "del":
				ret = del(req);
				break;
			case "load":
				ret = load(req);
				break;
			case "save":
				ret = save(req);
				break;
			case "update":
				ret = update(req);
				break;
			default:
				if (funcs) {
					var func = funcs[method];
					if (func) {
						ret = await func(ctx, db);
					} else {
						ret = $.ret.error(70001, "错误的操作方式");
					}
				} else {
					ret = $.ret.error(70001, "错误的操作方式");
				}
				break;
		}
		return ret;
	};
};

module.exports = admin;
