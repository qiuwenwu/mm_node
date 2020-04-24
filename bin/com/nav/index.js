const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * Nav导航类
 * @extends {Index}
 * @class
 */
class Nav extends Index {
	/**
	 * 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "nav";
		this.title = title;
	}
}

/**
 * 执行导航
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object|String}
 */
Nav.prototype.run = async function(name, type) {
	var obj = new this.Drive();
	var lt = this.list;
	if (name) {
		for (var i = 0, o; o = lt[i++];) {
			var cg = o.config;
			if (cg.name === name) {
				obj.merge(cg);
			}
		}
	} else {
		for (var i = 0, o; o = lt[i++];) {
			obj.merge(o.config);
		}
	}

	obj.sort();
	var cg = obj.config;
	if (cg.name) {
		if (type) {
			return cg[type];
		} else {
			return cg;
		}
	}
	return null;
};

/**
 * 执行导航
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object|String}
 */
Nav.prototype.sort = async function() {
	var lt = this.list;
	for (var i = 0, o; o = lt[i++];) {
		o.sort();
	}
	lt.sort(function(o1, o2) {
		var p1 = o1.config.sort;
		var p2 = o2.config.sort;
		return p2 - p1;
	});
};

/**
 * 加载
 * @param {String} path 加载的路径
 */
Nav.prototype.load = function(path) {
	if (!path) {
		path = "/app/";
	}
	// 获取所有配置文件
	var list_file = $.file.getAll(path, "*" + this.scope + "." + this.type + ".json");
	this.load_list(list_file);
};

/**
 * 加载列表
 * @param {Array} list 文件列表
 */
Nav.prototype.load_list = function(list) {
	var _this = this;
	// 遍历文件路径
	list.map(function(file) {
		var dir = file.dirname();
		// 载入文件
		var obj = file.loadJson(dir);
		var drive = new _this.Drive(dir, this.scope);
		drive.load(file);
		_this.list.push(drive);
	});
};


/**
 * 更新路由vue文件
 * @name {Object} param 参数
 * @property {String} name 要更新的配置名
 * @property {Boolean} cover 是否覆盖文件
 * @property {String} route_name 路由名称
 * @property {String} route_path 路由路径
 * @return {String} 更新成功返回null, 失败返回错误提示
 */
Nav.prototype.update_vue = async function(param) {
	var {
		name,
		cover,
		route_name,
		route_path
	} = param;

	if (name) {
		var o = this.get(name);
		if (o) {
			await o.update_vue(route_path, cover);
		} else {
			return "该配置不存在";
		}
	} else if (route_name) {
		var len = this.list.length;
		for (var i = 0; i < len; i++) {
			var o = this.list[i];
			if (o.config.name === route_name) {
				o.update_vue(route_path, cover);
			}
		}
	} else {
		var len = this.list.length;
		for (var i = 0; i < len; i++) {
			var o = this.list[i];
			o.update_vue(route_path, cover);
		}
	}
	return null;
};

exports.Nav = Nav;


/**
 * 创建全局管理器
 */
if (!$.pool.nav) {
	$.pool.nav = {};
}

/**
 * nav管理器,用于创建缓存
 * @param {string} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function nav_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.nav[scope];
	if (!obj) {
		$.pool.nav[scope] = new Nav(scope, title);
		obj = $.pool.nav[scope];
	}
	return obj;
}

/**
 * @module 导出nav管理器
 */
exports.nav_admin = nav_admin;