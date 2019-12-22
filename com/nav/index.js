const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * @description Nav导航类
 * @extends {Index}
 * @class
 */
class Nav extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "nav";
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
	var list = this.list;
	for (var i = 0, o; o = list[i++];) {
		if (o.name == name) {
			obj.merge(o);
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
		var p1 = o1.config.name.length;
		var p2 = o2.config.name.length;
		return p2 - p1;
	});
};

/**
 * @description 加载
 * @param {String} path 加载的路径
 */
Nav.prototype.load = function(path) {
	if (!path) {
		path = "/app/";
	}
	// 获取所有配置文件
	var list_file = $.file.getAll(path, "*" + this.type + ".json");
	this.load_list(list_file);
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
		var drive = new _this.Drive(dir);
		drive.load(file);
		_this.list.push(drive);
	});
};

exports.Nav = Nav;
