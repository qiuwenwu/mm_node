const Item = require('mm_machine').Item;
const Param = require('../param/drive.js');

/**
 * 指令驱动类
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
		this.default_file = "./cmd.json";

		// 开关 true为开启, false为关闭
		this.onOff = true;

		/* 通用项 */
		// 配置参数
		this.config = {
			// 标识名
			"name": "demo",
			// 分组名
			"title": "指令标题",
			// 描述, 用于描述该接口有什么用的
			"description": "暂无描述",
			// 文件名
			"func_file": "./index.js",
			// 加载顺序，数字越大越后面加载
			"sort": 1000,
			// 分组
			"group": "default",
			// 类型: query便民查询，action执行，game游戏，orther其他，为空表示未分类
			"type": "",
			// 匹配关键词
			"match": [],
			// 不含关键词
			"not_match": [],
			// 过滤关键词
			"filter": [],
			// 摘取
			"extract": [],
			// 验证参数集
			"param": [
				// 	{
				// 	// 参数名
				// 	"name": "name",
				// 	// 参数介绍名
				// 	"title": "名称",
				// 	// 参数格式
				// 	"format": "",
				// 	// 缺少参数提示语，传键值对，例如：{ number: "快递单号多少？" }
				// 	"not_tip": "",
				// 	// 错误提示
				// 	"error_tip": ""
				// },
			]
		}
	}
};

/**
 * 创建一个参数模型
 */
Drive.prototype.model = function() {
	return {
		// 参数名
		"name": "name",
		// 参数介绍名
		"title": "名称",
		// 参数格式
		"format": "",
		// 缺少参数提示语，传键值对，例如：{ number: "快递单号多少？" }
		"not_tip": "",
		// 错误提示
		"error_tip": ""
	};
};

/**
 * 为什么要这样做(疑问)
 * @param {Object} param 状态参数
 */
Drive.prototype.why = async function(param, db) {
	return true;
};

/**
 * 什么时候(时间)
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Boolean} 条件满足返回true, 否则返回false
 */
Drive.prototype.when = async function(param, db) {
	return true;
};

/**
 * 什么地方(地点)
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Boolean} 条件满足返回true, 否则返回false
 */
Drive.prototype.where = async function(param, db) {
	return true;
};

/**
 * 什么人(人物)
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Boolean} 条件满足返回true, 否则返回false
 */
Drive.prototype.who = async function(param, db) {
	return true;
};

/**
 * 做什么(事件)
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Boolean} 条件满足返回true, 否则返回false
 */
Drive.prototype.what = async function(param, db) {
	return true;
};

/**
 * 怎么做(方法), 对行为做决策
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {String} 返回执行函数
 */
Drive.prototype.how = async function(param, db) {
	var obj = {
		name: "main"
	};
	var cg = this.config;
	var lt = cg.condition.how;
	var content = param.content;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		var str = o.not_match;
		if (str) {
			if (str.startWith('/')) {
				try {
					var rx = eval(str);
					if (rx.test(content) === false) {
						var ct = db.msg_log.content;
						if (ct) {
							var mh = ct.match(rx);
							var txt = "";
							if (mh) {
								var value = mh[mh.length - 1];
								var keyword = db.msg_log.keyword + "\r\n" + value;
								db.msg_log.keyword = keyword.trim();
								param.content = content.trim() + "\r\n" + value;
							} else {
								obj = o;
								break;
							}
						} else {
							obj = o;
							break;
						}
					} else {
						db.msg_log.keyword = content.trim();
					}
				} catch (e) {
					$.log.debug('正则表达式错误:' + str);
				}
			} else if (!content.has(str)) {
				obj = o;
				break;
			}
		} else if (o.func_name) {
			var func = this[o.func_name];
			if (func) {
				var bl = await func(param, db);
				if (!bl) {
					obj = o;
				}
			}
		}
	}
	return obj;
};

/**
 * 做到什么程度(结束条件)
 * @param {Object} param 状态参数
 * @param {Object} ret 执行结果
 * @param {Object} db 数据管理器
 * @return {Boolean} 返回执行结果判断 true表示已完成一个行为周期,false为未完成,未完成则继续缓存
 */
Drive.prototype.how_much = async function(param, db, ret) {
	if (param.content.length > 255) {
		return true;
	}
	return false;
};

/**
 * 补全参数
 * @param {Object} content 正文
 * @param {Object} db 数据管理器
 * @return {Object} 返回参数表单
 */
Drive.prototype.supply = async function(content, db) {
	var form = {};
	if (db.msg_log.form) {
		form = db.msg_log.form.toJson();
	} else {
		var ct = content + "";
		var cg = this.config;
		var post = cg.post;
		var arr = [];
		arr.addList(post.body);
		arr.addList(post.body_required);
		var list = cg.list;
		for (var i = 0; i < arr.length; i++) {
			var k = arr[i];
			var o = list[k];
			if (o.string) {
				var str = o.string.regex;
				if (str) {
					try {
						var rx = eval(str);
						var mh = str.match(rx);
						if (mh) {
							var value = mh[0];
							form[k] = value;
							ct = ct.replace(value, '');
						}
					} catch (e) {
						$.log.debug('正则表达式错误:' + str);
					}
				} else {
					form[k] = "";
				}
			} else {
				form[k] = 0;
			}
		}
	}
	return form;
};

/**
 * 检验条件是否满足
 * @param {Object} form 表单
 * @param {Object} db 数据管理器
 * @param {Boolean} first 是否第一次验证，第一次验证时会将错误参数清空，提示填写。而非第一次验证则提示错误重填
 * @return {String} 验证失败返回错误提示
 */
Drive.prototype.check = async function(form, db, first) {
	var func = new Param();
	db.msg_log.form = JSON.stringify(form);
};

/**
 * 执行
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Drive.prototype.main = async function(param, db) {
	return "你好";
};

/**
 * 执行
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Drive.prototype.run = async function(param, db) {
	var content = await this.extract(param.content);
	content = await this.filter(content);
	param.content = content;

	var bl = true;
	bl = await this.what(param, db);
	if (!bl) {
		return null;
	}
	bl = await this.who(param, db);
	if (!bl) {
		return null;
	}
	bl = await this.where(param, db);
	if (!bl) {
		return null;
	}
	bl = await this.when(param, db);
	if (!bl) {
		return null;
	}
	var ret = "";
	var o = await this.how(param, db);
	if (o.question) {
		ret = o.question;
	} else if (o.name) {
		var func = this[o.name];
		if (func) {
			ret = await func(param, db);
			if (ret) {
				bl = this.how_much(param, db, ret);
				// if (bl && db.msg_log) {
				// 	db.msg_log.end = 1;
				// }
			}
		}
	}
	return ret;
};

/**
 * 校验是否匹配指令
 * @param {Object} content 请求的正文
 * @param {Object} db 数据管理器
 * @return {Boolean} 匹配返回true，不匹配返回false
 */
Drive.prototype.match = function(content, db) {
	var cg = this.config;
	var lt = cg.match;
	var bl = false;
	for (var i = 0, o; o = lt[i++];) {
		if (content.matchs(o)) {
			bl = true;
			break;
		}
	}
	return bl;
};

/**
 * 校验是否不含关键词
 * @param {Object} content 请求的正文
 * @param {Object} db 数据管理器
 * @return {Boolean} 不含返回true，含有返回false
 */
Drive.prototype.not_match = function(content, db) {
	var cg = this.config;
	var lt = cg.not_match;
	var bl = true;
	for (var i = 0, o; o = lt[i++];) {
		if (content.matchs(o)) {
			bl = false;
			break;
		}
	}
	return bl;
};

/**
 * 过滤正文
 * @param {String} content 正文
 * @param {Object} db 数据管理器
 * @return {Object} 返回过滤后的参数
 */
Drive.prototype.filter = async function(content, db) {
	var cg = this.config;
	var lt = cg.filter;
	var bl = false;
	for (var i = 0, str; str = lt[i++];) {
		if (str.startWith('/')) {
			try {
				var rx = eval(str);
				content = content.replace(rx, '');
			} catch (e) {
				$.log.debug('正则表达式错误:' + str);
			}
		} else {
			content = content.replace(str, '');
		}
	}
	return content;
};

/**
 * 抽取正文
 * @param {String} content 正文
 * @param {Object} db 数据管理器
 * @return {Object} 返回过滤后的参数
 */
Drive.prototype.extract = async function(content, db) {
	var cg = this.config;
	var lt = cg.extract;
	var bl = false;
	for (var i = 0, str; str = lt[i++];) {
		if (str.startWith('/')) {
			try {
				var rx = eval(str);
				var mh = content.match(rx);
				var ct = "";
				if (mh) {
					for (var n = 0; n < mh.length; n++) {
						ct += "\r\n" + mh[0];
					}
					content = ct;
				}
			} catch (e) {
				$.log.debug('正则表达式错误:' + str);
			}
		} else if (str.startWith('*')) {
			content = content.left(str.replace('*', ''), true)
		} else if (str.endWith('*')) {
			content = content.right(str.replace('*', ''), true)
		} else if (str.indexOf('*') !== -1) {
			var arr = str.split('*');
			content = content.between(arr[0], arr[1], true);
		}
	}
	return content;
};

module.exports = Drive;
