/**
 * @description 开发者通用接口函数类
 * @class
 */
class dev {
	/**
	 * @param {string} type
	 * @constructor
	 */
	constructor(type) {
		this.type = type;
	}
}

/**
 * @description 添加配置
 * @param {Object} req HTTP请求上文
 * @return {Object} 返回添加结果
 */
dev.prototype.add = async function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.add_before) {
				this.add_before(req, cs);
			}
			var obj = req.body;
			var msg = cs.add(obj);
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
	if (this.add_after) {
		this.add_after(req, body);
	}
	return body;
};

/**
 * @description 删除配置
 * @param {Object} req HTTP请求上文
 * @param {Object} db 数据管理器
 * @return {Object} 返回保存结果
 */
dev.prototype.del = async function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var name = q["name"];
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.del_before) {
				this.del_before(req, cs);
			}
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
	if (this.del_after) {
		this.del_after(req, body);
	}
	return body;
};

/**
 * @description 修改配置
 * @param {Object} req HTTP请求上文
 * @param {Object} db 数据管理器
 * @return {Object} 返回保存结果
 */
dev.prototype.set = async function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.set_before) {
				this.set_before(req, cs);
			}
			var obj = req.body;
			if (cs.set(obj)) {
				var bl = cs.save(obj.name);
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
	if (this.set_after) {
		this.set_after(req, body);
	}
	return body;
};

/**
 * @description 查询配置
 * @param {Object} req HTTP请求上文
 * @param {Object} db 数据管理器
 * @return {Object} 返回保存结果
 */
dev.prototype.get = async function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var name = q["name"];
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.get_before) {
				this.get_before(req, cs);
			}
			if (name) {
				var config = cs.get(name);
				if (config) {
					body = $.ret.body(config);
				} else {
					body = $.ret.error(10002, "配置" + name + "不存在");
				}
			} else {
				var lt = cs.list;
				var list = [];
				var len = lt.length;
				for (var i = 0; i < len; i++) {
					var cg = lt[i].config;
					list.push({
						name: cg.name,
						title: cg.title,
						description: cg.description
					});
				}
				body = $.ret.body({
					scope: name,
					list: list
				});
			}
		} else {
			body = $.ret.error(50002, "该作用域（scope）不存在");
		}
	} else {
		var dict = $.pool[this.type];
		if (dict) {
			var list = [];
			for(var k in dict){
				list.push({
					name: k,
					title: dict[k].title
				});
			}
			body = $.ret.body({
				"scope": list
			});
		} else {
			body = $.ret.error(10000, "脚本错误，不存在的作用域（scope）");
		}
	}
	if (this.get_after) {
		this.get_after(req, body);
	}
	return body;
};

/**
 * @description 更新配置
 * @param {Object} req HTTP请求上文
 * @param {Object} db 数据管理器
 * @return {Object} 返回保存结果
 */
dev.prototype.update = async function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.update_before) {
				this.update_before(req, cs);
			}
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
					try {
						cs.update(dir);
						return $.ret.bl(true, '全部更新成功');
					} catch (e) {

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
	if (this.update_after) {
		this.update_after(req, body);
	}
	return body;
};

/**
 * @description 加载配置
 * @param {Object} req HTTP请求上文
 * @param {Object} db 数据管理器
 * @return {Object} 返回加载结果
 */
dev.prototype.load = function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.load_before) {
				this.load_before(req, cs);
			}
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
	if (this.load_after) {
		this.load_after(req, body);
	}
	return body;
};

/**
 * @description 保存配置
 * @param {Object} req HTTP请求上文
 * @param {Object} db 数据管理器
 * @return {Object} 返回保存结果
 */
dev.prototype.save = async function(req, db) {
	var body = "";
	var q = req.query;
	var scope = q["scope"];
	if (scope) {
		var name = q["name"];
		var cs = $.pool[this.type][scope];
		if (cs) {
			if (this.save_before) {
				this.save_before(req, cs);
			}
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
	if (this.save_after) {
		this.save_after(req, body);
	}
	return body;
};

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器, 如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
dev.prototype.main = async function(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var method = req.query["method"];
	if (!method) {
		method = "get";
	}
	var ret;
	if (this[method]) {
		ret = await this[method](req, db);
	} else {
		ret = $.ret.error(70001, "错误的操作方式");
	}
	return ret;
};

exports.dev = dev;
