const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

/**
 * @description Plugin插件类
 * @extends {Index}
 * @class 
 */
class Plugin extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "plugin";
	}
}

/**
 * @description 执行程序
 * @param {Object} param1 参数1
 * @param {Object} param2 参数2
 * @return {Object} 返回执行结果
 */
Plugin.prototype.run = function(param1, param2) {
	var ret;
	var lt = this.list;
	for (var i = 0; i < lt.length; i++) {
		var o = this.lt[i];
		ret = o.run(param1, param2);
		if (ret && o.end) {
			break;
		}
	}
	return ret;
};

/**
 * @description 聊天（通过聊天的方式驱动插件, 用于机器人开发）
 * @param {String} from_user 发送消息人
 * @param {String} to_user 接收消息人
 * @param {String} content 内容
 * @param {String} group 群组 如果是个人，群组为空
 * @param {Number} type 群类型, 1永久群、2临时群
 * @param {String} msg_type 消息类型, event事件型、message消息型。默认消息型
 * @return {String} 回复内容
 */
Plugin.prototype.chat = function(from_user, to_user, group, content, type, msg_type) {
	var ret = "";
	var lt = this.list;
	for (var i = 0; i < lt.length; i++) {
		var o = this.lt[i];
		ret = o.chat(from_user, to_user, group, content, type, msg_type);
		if (ret) {
			break;
		}
	}
	return ret;
};

/**
 * @description 指令（类似命令提示符）
 * @param {String} content 指令内容
 * @return {String} 执行结果
 */
Plugin.prototype.cmd = function(content) {
	var ret = "";
	var lt = this.list;
	for (var i = 0; i < lt.length; i++) {
		var o = this.lt[i];
		var cmd = o.config.cmd;
		if (cmd && content.startsWith(cmd)) {
			ret = o.cmd(content.replace(cmd, ''));
			if (ret) {
				break;
			}
		}
	}
	return ret;
};


/**
 * @description 执行插件方法
 * @param {String} name 插件名称
 * @param {String} method 方法名称
 * @param {Object} option 配置参数
 * @return {String} 执行结果
 */
Plugin.prototype.exec = function(name, method, option) {
	var ret = "";
	var lt = this.list;
	for (var i = 0; i < lt.length; i++) {
		var o = this.lt[i];
		var name = o.config.name;
		if (name === name) {
			var func = o[method];
			if (func) {
				ret = func(option);
			}
			break;
		}
	}
	return ret;
};

/**
 * @description 初始化插件
 * @param {Object} option 配置参数
 * @return {String} 执行结果
 */
Plugin.prototype.init = function(option) {
	var ret = "";
	var lt = this.list;
	for (var i = 0; i < lt.length; i++) {
		ret = this.lt[i].init(option);
	}
	return ret;
};

/**
 * @description 加载插件
 * @param {String} path 检索路径
 * @param {Boolean} isApp 是否APP
 */
Plugin.prototype.load = function(path) {
	if (!path) {
		path = '/app/' + this.scope + "/plugin";
	}
	if (path.endsWith('/app/')) {
		var list_scope = $.dir.get(path);

		// 遍历目录路径
		var _this = this;
		list_scope.map(function(o) {
			var file = './app.json'.fullname(o);
			if (file.hasFile()) {
				var obj = new Drive(o);
				obj.load(file);
				if (obj.config.name) {
					_this.list.push(obj);
				}
			}
		});
	} else {
		var list_scope = $.dir.get(path);

		// 遍历目录路径
		var _this = this;
		list_scope.map(function(o) {
			var file = './plugin.json'.fullname(o);
			if (file.hasFile()) {
				var obj = new Drive(o);
				obj.load(file);
				if (obj.config.name) {
					_this.list.push(obj);
				}
			}
		});
	}
};

exports.Plugin = Plugin;


/**
 * @description 创建全局管理器
 */
if (!$.pool.plugin) {
	$.pool.plugin = {};
}

/**
 * @description plugin管理器, 用于管理插件
 * @param {string} scope 作用域
 * @return {Object} 返回一个缓存类
 */
function plugin_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.plugin[scope];
	if (!obj) {
		$.pool.plugin[scope] = new Plugin(scope);
		obj = $.pool.plugin[scope];
	}
	return obj;
}

/**
 * @module 导出plugin管理器
 */
exports.plugin_admin = plugin_admin;
