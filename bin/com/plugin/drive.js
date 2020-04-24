const Item = require('mm_machine').Item;

/**
 * Plugin插件驱动类
 * @extends {Item}
 * @class 
 */
class Drive extends Item {
	/**
	 * 构造函数
	 * @param {String} dir 当前目录
	 * @constructor
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./plugin.json";

		/**
		 * 开关，开启可使用插件
		 */
		this.onOff = true;
		
		/**
		 * 当前语言
		 */
		this.lang_now = "zh_CN";
		/**
		 * 语言包
		 */
		this.lang = {};

		/* 通用项 */
		// 配置参数
		this.config = {
			// 标题, 介绍事件作用
			"title": "",
			// 描述, 用于描述该事件有什么用的
			"description": "",
			// 名称, 由中英文和下“_”组成, 用于卸载事件
			// 同时也是版本唯一标识，当商城有两个插件名称相同时，可以通过版本号查询和下载
			"name": "",
			// 应用域
			"app": "",
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "./index.js",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": "",
			// 版本号
			"version": "1.0",
			// 语言包路径
			"lang_path": "./lang/",
			// 插件图标
			"icon": "/img/logo.png",
			// 指令前缀
			"cmd": "",
			// 是否中断执行
			"end": true,
			// 排序
			"sort": 10
		};
	}
}

/**
 * 新建脚本
 * @param {String} 文件
 */
Drive.prototype.new_script = function(file) {
	var fl = __dirname + "/script.js";
	if (fl.hasFile()) {
		var text = fl.loadText();
		if (text) {
			var name = 'sys';
			var l = $.slash;
			if (file.indexOf('plugin' + l) !== -1) {
				name = file.between('plugin' + l, l);
				if (file.indexOf('app' + l) !== -1) {
					var app = file.between('app' + l, l);
					text = text.replaceAll('{1}', app);
				}
				text = text.replaceAll('{0}', name);
			} else if (file.indexOf('app' + l) !== -1) {
				name = file.between('app' + l, l);
				text = text.replaceAll('{0}', name)
			}
			file.saveText(text);
		}
	}
};

/**
 * 新建配置
 * @param {String} 文件
 */
Drive.prototype.new_config = function(file) {
	var fl = __dirname + "/config.tpl.json";
	if (fl.hasFile()) {
		var text = fl.loadText();
		if (text) {
			var name = 'sys';
			var l = $.slash;
			if (file.indexOf('plugin' + l) !== -1) {
				name = file.between('plugin' + l, l);
				if (file.indexOf('app' + l) !== -1) {
					var app = file.between('app' + l, l);
					text = text.replaceAll('{1}', app).replaceAll('{2}', app + '.' + name);
				}
				text = text.replaceAll('{0}', name);
			} else if (file.indexOf('app' + l) !== -1) {
				name = file.between('app' + l, l);
				text = text.replaceAll('{0}', name).replaceAll('\r\n	"app": "{1}",', '').replaceAll('插件', '应用').replaceAll('{2}', name);
			}
			file.saveText(text);
		}
	}
};

/**
 * 设置语言
 * @param {Sting} lang
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.set_lang = function(lang) {
	var msg = null;
	if (!lang) {
		lang = "zh_CN"
	}
	var file = this.config.lang_path + ".json";
	if (file.hasFile()) {
		var obj = file.loadJson();
		if (obj) {
			this.lang = obj;
		} else {
			msg = "语言包不是正确的json格式";
		}
	} else {
		msg = "语言包文件不存在";
	}
	return msg;
};

/**
 * 初始化
 * @param {Object} option 配置参数
 * @return {String} 成功返回null, 否则返回错误提示
 */
Drive.prototype.init = function(option) {
	var msg = null;
	return msg;
};

/**
 * 更新
 * @param {Object} option 配置参数
 * @return {String} 成功返回null, 否则返回错误提示
 */
Drive.prototype.update = function(option) {
	var msg = null;
	return msg;
};

/**
 * 安装
 * @param {Object} option 配置参数
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.install = function(option) {
	var msg = null;
	return msg;
};

/**
 * 卸载
 * @param {Object} option 配置参数
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.uninstall = function(option) {
	var msg = null;
	return msg;
};

/**
 * 启动
 * @param {Object} opiton 配置参数
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.start = function(opiton) {
	var msg = null;
	return msg;
};

/**
 * 暂停
 * @param {Object} opiton 配置参数
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.stop = function(opiton) {
	var msg = null;
	return msg;
};

/**
 * 结束
 * @param {Object} opiton 配置参数
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.end = function(opiton) {
	var msg = null;
	return msg;
};

/**
 * API接口（用于其他插件调用该插件时）
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Drive.prototype.api = function(ctx, db) {
	var ret = {};
	return ret;
};

/**
 * 商店（用于下载插件相关模块）
 * @param {String} item 插件项
 * @return {String} 成功返回null,否则返回错误提示
 */
Drive.prototype.store = function(item) {
	var msg = null;
	return msg;
};

/**
 * 插件
 * @param {String} item 插件项
 * @return {Object} 旗下插件和信息
 */
Drive.prototype.plugin = function(item) {

};

/**
 * 帮助（讲解插件使用方法）
 * @param {String} item 帮助项
 * @return {String} 返回使用方法明细
 */
Drive.prototype.help = function(item) {
	var body = "";
	return body;
};

/**
 * 主程序
 * @param {Object} param1 参数1
 * @param {Object} param2 参数2
 * @return {Object} 返回执行结果
 */
Drive.prototype.main = function(param1, param2) {
	return null;
};

/**
 * 执行程序
 * @param {Object} param1 参数1
 * @param {Object} param2 参数2
 * @return {Object} 返回执行结果
 */
Drive.prototype.run = function(param1, param2) {
	return this.main(param1, param2);
};

/**
 * 指令（类似命令提示符）
 * @param {String} content 指令内容
 * @return {String} 执行结果
 */
Drive.prototype.cmd = function(content) {
	var body = "";
	return body;
};

/**
 * 聊天（通过聊天的方式驱动插件, 用于机器人开发）
 * @param {String} from_user 发送消息人
 * @param {String} to_user 接收消息人
 * @param {String} content 内容
 * @param {String} group 群组 如果是个人，群组为空
 * @param {Number} type 群类型, 1永久会话/群、2临时会话/群
 * @param {String} msg_type 消息类型, event事件型、message消息型。默认消息型
 * @param {Object} 数据管理器
 * @return {String} 回复内容
 */
Drive.prototype.chat = async function(from_user, to_user, group, content, type, msg_type, db) {
	var body = "";
	return body;
};

/**
 * 指令（类似命令提示符）
 * @param {String} content 指令内容
 * @return {String} 执行结果
 */
Drive.prototype.run_cmd = async function(content) {
	if (!content) {
		content = "";
	}
	var ret = this.cmd(content);
	if (!ret) {
		ret = "";
	}
	return ret;
};

/**
 * 聊天（通过聊天的方式驱动插件, 用于机器人开发）
 * @param {String} from_user 发送消息人
 * @param {String} to_user 接收消息人
 * @param {String} content 内容
 * @param {String} group 群组 如果是个人，群组为空
 * @param {Number} type 群类型, 1永久会话/群、2临时会话/群
 * @param {String} msg_type 消息类型, event事件型、message消息型。默认消息型
 * @return {String} 回复内容
 */
Drive.prototype.run_chat = async function(from_user, to_user, content, group, type, msg_type, db) {
	if (!content) {
		content = "";
	}
	if (!msg_type) {
		msg_type = "message";
	}
	if (!group) {
		group = "";
	}
	var ret = this.chat(from_user, to_user, group, content, type, msg_type, db);
	if (!ret) {
		ret = "";
	}
	return ret;
};

/**
 * 执行程序
 * @param {Object} param1 参数1
 * @param {Object} param2 参数2
 * @return {Object} 返回执行结果
 */
Drive.prototype.exec = function(func_name, option) {
	var msg = "";
	if (this[func_name]) {
		msg = this[func_name](option);
	} else {
		msg = "错误的操作";
	}
	return msg;
};

module.exports = Drive;
