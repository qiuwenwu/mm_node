/**
 * @fileOverview 机制构建帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */

require('mm_expand');

const fs = require('fs');

/**
 * @description 驱动基础类
 * @class
 */
class Item {
	/**
	 * @description 构造函数
	 * @param {String} dir 当前目录
	 * @param {String} dir_base 模块目录
	 * @constructor
	 */
	constructor(dir, dir_base) {
		/**
		 * @description 当前路径
		 */
		this.dir = dir;

		/**
		 * @description 默认文件
		 */
		this.default_file = "./sys.json";

		// 当前文件
		this.filename;
		/* 通用项 */
		/**
		 * 配置参数
		 */
		this.config = {
			/**
			 * 名称, 由中英文和下“_”组成, 用于卸载接口 例如: demo
			 */
			"name": "",
			/**
			 * 标题, 介绍作用
			 */
			"title": "",
			/**
			 * 描述, 用于描述该有什么用的
			 */
			"description": "",
			/**
			 * 文件路径, 当调用函数不存在时，会先从文件中加载
			 */
			"func_file": "./index.js",
			/**
			 * 回调函数名 用于决定调用脚本的哪个函数
			 */
			"func_name": "",
			/**
			 * 排序
			 */
			"sort": 10,
			/**
			 * 开关, true表示开启，false表示关闭
			 */
			"switch": true
		};

		/**
		 * 模块目录
		 */
		this.dir_base = dir_base;
	}
}

/**
 * @description 加载完成时
 */
Item.prototype.load_after = function() {

};

/**
 * @description 新建脚本
 * @param {String} file
 */
Item.prototype.new_script = function(file) {
	var fl = this.dir_base + "/script.js";
	if (fl.hasFile()) {
		fl.copyFile(file);
	}
};

/**
 * @description 移除模块
 * @param {Object} module
 */
Item.prototype.remove_module = function(module) {
	var path = require.resolve(module);
	delete require.cache[path];
	// require.cache[path] = null;
};

/**
 * @description 加载配置对象
 * @param {Object} obj 配置对象
 */
Item.prototype.loadObj = function(obj) {
	$.push(this.config, obj, true);
	var f = this.config.func_file;
	if (f) {
		var file = f.fullname(this.dir);
		if (file.hasFile()) {
			this.remove_module(file);
			var cs = require(file);
			if (cs) {
				var name = this.config.func_name;
				if (name) {
					this.main = cs[name];
				} else {
					$.push(this, cs);
				}
			}
		} else {
			this.new_script(file);
		}
	}
	this.load_after();
};

/**
 * @description 新建配置
 * @param {String} file
 */
Item.prototype.new_config = function(file) {
	var fl = this.dir_base + "/config.tpl.json";
	fl.copyFile(file);
};

/**
 * @description 加载配置文件
 * @param {String} file 文件路径
 * @return {Object} 配置对象
 */
Item.prototype.loadFile = function(file) {
	var obj;
	var f = file.fullname(this.dir);
	var text = f.loadText();
	if (text) {
		obj = text.toJson();
	} else {
		this.new_config(f);
	}
	this.filename = f;
	return obj;
};

/**
 * @description 删除脚本
 */
Item.prototype.del_script = function() {
	var f = this.config.func_file;
	if (f) {
		f.delFile(this.dir);
	}
};

/**
 * @description 删除配置和脚本文件
 * @param {Object} item 项目
 */
Item.prototype.removeFile = function() {
	var name = this.config.name;
	var file = this.filename;

	var msg = null;
	if (file.hasFile()) {
		var text = file.loadText();
		if (text) {
			var jarr = text.toJson();
			if (jarr.constructor == Array) {
				for (var i = 0; i < jarr.length; i++) {
					var o = jarr[i];
					if (name === o.name) {
						this.del_script();
						jarr.splice(i, 1);
						break;
					}
				}
				if (jarr.length) {
					file.saveText(JSON.stringify(jarr, null, 4));
				} else {
					file.delFile();
				}
			} else {
				this.del_script();
				file.delFile();
			}
		} else {
			this.del_script();
			file.delFile();
		}
	} else {
		msg = "配置文件不存在";
	}
	return msg;
};

/**
 * @description 载入配置
 * @param {Object|String} cg 配置对象或配置路径
 */
Item.prototype.load = function(cg) {
	var obj;
	if (!cg) {
		cg = this.extensions;
	}
	if (typeof(cg) === "string") {
		obj = this.loadFile(cg);
	} else {
		obj = cg;
	}
	this.loadObj(obj);
};

/**
 * @description 保存配置
 */
Item.prototype.save = function() {
	var f = this.filename.fullname(this.dir);
	var text = f.loadText();
	if (text) {
		if (text.trim().startsWith('[')) {
			var jarr = text.toJson();
			for (var i = 0; i < jarr.length; i++) {
				if (jarr[i].name === this.config.name) {
					jarr[i] = this.config;
					break;
				}
			}
			var txt = JSON.stringify(jarr, null, 4);
			f.saveText(txt);
			return;
		}
	}
	var txt = JSON.stringify(this.config, null, 4);
	f.saveText(txt);
};

/**
 * @description 主要执行函数
 * @param {Object} param1 参数一
 * @param {Object} param2 参数二
 */
Item.prototype.main = function(param1, param2) {
	return null;
};

/**
 * @module 导出Drive类
 */
exports.Item = Item;

/**
 * @class Index索引类
 */
class Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} dir_base 模块目录
	 * @constructor
	 */
	constructor(scope, dir_base) {
		// 作用域（同时作为检索的后缀名）
		this.scope;
		if (scope) {
			this.scope = scope;
		} else {
			this.scope = $.val.scope + '';
		}
		// Index接口列表
		this.list = [];

		/**
		 * 机制类型
		 */
		this.type = "";

		/**
		 * 排序项
		 */
		this.sort_key = "sort";

		/**
		 * 模块目录
		 */
		this.dir_base = dir_base;
	}
}


/// 清除接口缓存
Index.prototype.clear = function() {
	this.list = [];
};

/**
 * @description 默认驱动
 */
Index.prototype.Drive = Item;

/**
 * @description 加载项
 * @param {String} dir 文件路径
 * @param {Object} cg 配置参数
 * @param {String} file 配置文件
 */
Index.prototype.load_item = function(dir, cg, file) {
	var drive = new this.Drive(dir);
	drive.loadObj(cg);
	drive.filename = file;
	this.list.push(drive);
};

/**
 * @description 加载列表
 * @param {Array} list 文件列表
 */
Index.prototype.load_list = function(list) {
	var _this = this;
	// 遍历文件路径
	list.map(function(file) {
		var dir = file.dirname();
		// 载入文件
		var obj = file.loadJson(dir);
		if (obj) {
			if (obj.constructor == Array) {
				obj.map(function(o) {
					// 实例化一个驱动
					_this.load_item(dir, o, file);
				});
			} else {
				_this.load_item(dir, obj, file);
			}
		} else {
			var fl = _this.dir_base + "/config.tpl.json";
			if (fl.hasFile()) {
				fl.copyFile(file);
			}
		}
	});
};

/**
 * @description 加载配置
 * @param {String} path 检索路径
 */
Index.prototype.load = function(path) {
	if (path) {
		path = ('/app/' + path).fullname();
	} else {
		path = '/app/';
	}
	// 获取所有应用路径
	var search_dir;
	if (this.scope && this.scope !== $.val.scope) {
		search_dir = this.type + '_' + this.scope;
	} else {
		search_dir = this.type;
	}
	var list_scope = $.dir.getAll(path, search_dir);

	// 遍历目录路径
	var _this = this;
	list_scope.map(function(f) {
		// 获取所有配置文件
		var list_file = $.file.getAll(f, "*" + _this.type + ".json");
		_this.load_list(list_file);
	});
};

/**
 * @description 排序
 */
Index.prototype.sort = function() {
	var _this = this;
	this.list.sort(function(o1, o2) {
		var p1 = o1.config[_this.sort_key];
		var p2 = o2.config[_this.sort_key];
		return p2 - p1;
	});
};

/**
 * @description 更新配置
 * @param {String} dir 检索的路径
 */
Index.prototype.update = async function(dir) {
	this.clear();
	this.load(dir);
	this.sort();
};

/**
 * @description 查询配置项
 * @param {String} name 名称
 * @return {Object} 返回单项配置
 */
Index.prototype.get = function(name) {
	var obj;
	var lt = this.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (name === o.config.name) {
			obj = o;
			break;
		}
	}
	return obj;
};

/**
 * @description 查询配置项
 * @param {String} name 名称
 * @return {Object} 返回单项配置
 */
Index.prototype.set = function(cg) {
	var bl = false;
	var lt = this.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (cg.name === o.config.name) {
			$.push(lt[i].config, cg);
			bl = true;
			break;
		}
	}
	return bl;
};

/**
 * @description 保存配置
 * @param {String} name 保存的配置
 */
Index.prototype.save = function(name) {
	var item = this.get(name);
	if (item) {
		item.save();
		return true;
	} else {
		return false;
	}
};

/**
 * @description 添加
 * @param {Object} obj 配置参数
 * @return {String} 失败返回错误提示，成功返回null
 */
Index.prototype.add = function(obj) {
	var f = obj.filename;
	if (!f) {
		return "文件保存路径不能为空";
	}
	var name = obj.config.name;
	var item = this.get(name);
	if (item) {
		return "配置已存在";
	}
	if (f.hasFile()) {
		var jobj = f.loadJson(obj.dir);
		if (jobj) {
			if (jobj.constructor == Array) {
				var has = false;
				for (var i = 0; i < jobj.length; i++) {
					var o = jobj[i];
					if (o.name === name) {
						has = true;
						break;
					}
				}
				if (has) {
					return "配置文件已存在";
				} else {
					jobj.push(obj.config);
					f.saveText(JSON.stringify(jobj, null, 4));
				}
			} else {
				var list = [];
				list.push(jobj);
				list.push(obj.config);
				f.saveText(JSON.stringify(list, null, 4));
			}
		} else {
			f.saveText(JSON.stringify(obj.config, null, 4));
		}
	} else {
		this.load_item(f.dirname(), obj.config, f);
		this.save(name);
	}
	return null;
};

/**
 * @description 删除
 * @param {String} name 保存的配置名
 * @param {Boolean} remove 是否删除配置文件
 * @return {String} 失败返回null，成功返回文件路径
 */
Index.prototype.del = function(name, remove) {
	var lt = this.list;
	var file = null;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (name === o.config.name) {
			file = o.filename;
			if (remove) {
				o.removeFile();
			}
			// 删除成员
			lt.splice(i, 1);
			break;
		}
	}
	return file;
};

/**
 * @description 通过文件加载配置
 * @param {String} file 文件名
 * @return {String} 加载失败返回错误提示，加载成功返回null
 */
Index.prototype.load_file = function(file) {
	if (file.hasFile()) {
		var obj = file.loadJson();
		if (obj) {
			var dir = file.dirname();
			var _this = this;
			if (obj.constructor == Array) {
				obj.map(function(o) {
					if (!_this.get(o.name)) {
						_this.load_item(dir, o, file);
					}
				});
			} else {
				if (!_this.get(obj.name)) {
					_this.load_item(dir, obj, file);
				}
			}
		} else {
			return "配置文件格式错误";
		}
	} else {
		return file + "文件不存在";
	}
	return null;
};

/**
 * @module 导出Index类
 */
exports.Index = Index;
