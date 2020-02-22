/**
 * @fileOverview 参数验证类
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');

// 语言包
var lang = {
	type: "数据类型不正确, 应为{0}型",
	notEmpty: "不能为空",
	required: "是必填字段",
	email: "需为有效的电子邮件地址",
	phone: "需为11位数的有效电话号码",
	url: "需为有效的网址",
	date: "需为有效的日期",
	dateISO: "需为有效的日期 (YYYY-MM-DD)",
	dateTime: "需为有效的日期时间",
	time: "需为有效的时间",
	number: "需为有效的数值",
	num: "只能输入数字",
	digits: "只能输入数字",
	creditcard: "需为有效的信用卡号码",
	identical: "与 {1} 不一致",
	different: "不能与 {1} 相同",
	extension: "需为有效的后缀, 仅支持 {0}",
	maxLength: "最多只能输入 {0} 个字符",
	minLength: "最少需要输入 {0} 个字符",
	rangeLength: "请输入长度在 {0} 到 {1} 之间的字符串",
	range: "请输入范围在 {0} 到 {1} 之间的数值",
	max: "请输入不大于 {0} 的数值",
	min: "请输入不小于 {0} 的数值",
	regex: "格式不正确",
	en: "只能输入英文",
	ch: "只能输入中文",
	chs: "只能输入中文",
	username: "只能由英文字母和数字组成",
	password: "不能包含特殊字符",
	arrayRange: "数组的成员数须在 {0} 到 {1} 个之间",
	arrayMax: "数组的成员数不能大于 {0} 个",
	arrayMin: "数组的成员数不小于 {0} 个"
};

/**
 * @description 参数验证函数
 * @class
 */
class Check {
	/**
	 * @description 构造函数
	 * @param {Object} param 参数验证配置
	 * @constructor
	 */
	constructor(param) {
		/**
		 * 校验参数
		 */
		// 参数名
		this.name = "";
		// 参数介绍名
		this.title = "";
		// 分隔符号, 用于查询时判断多个传参
		this.splitter = "|";
		// 参数类型 string字符串、number数字、bool布尔、dateTime时间、object对象类型、array数组类型
		this.type = "string";

		this.string = {
			// 非空
			"notEmpty": false,
			// 最小长度
			"min": 0,
			// 最大长度
			"max": 0,
			// 验证字符串范围, 传入两个成员, 最小长度和最大长度。例如：[0, 0]
			"range": [],
			// 验证正则表达式
			"regex": "",
			// 验证与某个参数值是否相同
			"identical": "",
			// 验证与某个参数值是否不同
			"different": "",
			// 后缀名, 多个后缀名用“|”分隔
			"extension": "",
			// 格式验证 email、url、date、dateISO、number、digits、phone
			"format": ""
		};

		/* 数值相关验证 */
		this.number = {
			// 最小值
			"min": 0,
			// 最大值
			"max": 0,
			// 验证字符串范围
			"range": []
		};
		/* 数组相关验证 */
		this.array = {
			// 最小成员数
			"min": 0,
			// 最大成员数
			"max": 0,
			// 验证成员范围
			"range": [],
			// 成员类型, string类型, number数值类型, object对象类型
			"type": "",
			// 字典验证
			"object": []
		};
		/* 字典相关验证 */
		this.object = [];

		if (param) {
			$.push(this, param, true);
		}
	}
}

/**
 * @description 获取或设置错误提示
 * @param {Object} obj 设置的提示,可以为空,为空表示获取
 * @return {Object} 错误提示集合
 */
Check.prototype.lang = function(obj) {
	if (obj) {
		$.push(lang, obj, true);
	} else {
		return lang;
	}
};

/**
 * @description 获取错误提示
 * @param {String} key 语言包键
 * @param {String} v1 替换的词1
 * @param {String} v2 替换的词2
 * @return {String} 返回错误语句
 */
Check.prototype.msg = function(key, v1, v2) {
	var str = lang[key];
	if (str) {
		return str.replace('{0}', v1).replace('{1}', v2);
	} else {
		return "参数不正确!";
	}
};

/**
 * @description 验证数值
 * @param {Numbr} value 被验证的值
 * @return {String} 没通过返回信息, 否则返回空
 */
Check.prototype.check_number = function(value, cg) {
	var range = cg.range;
	if (range.length === 2) {
		if (range[0] > value || range[1] < value) {
			return this.msg('range', range[0], range[1]);
		}
	} else {
		if (cg.min !== 0 && cg.min > value) {
			return this.msg('min', cg.min);
		}
		if (cg.max !== 0 && cg.max < value) {
			return this.msg('max', cg.max);
		}
	}
	return null;
};

/**
 * 验证数组
 * @param {Array} value 值
 * @return {String} 没通过返回信息, 否则返回空
 */
Check.prototype.check_array = function(value, cg) {
	var range = cg.range;
	if (range.length === 2) {
		if (range[0] > value.length || range[1] < value.length) {
			return this.msg('arrayRange', range[0], range[1]);
		}
	} else {
		if (cg.min !== 0 && cg.min > value.length) {
			return this.msg('arrayMin', cg.min);
		}
		if (cg.max !== 0 && cg.max < value.length) {
			return this.msg('arrayMax', cg.max);
		}
	}
	if (value.length == 0) {
		if (range[0] == 0 && cg.min == 0) {
			return null;
		}
	} else {
		var msg = this.run(value[0], cg);
		return msg ? "数组成员" + msg : null;
	}
};

/**
 * 验证字典
 * @param {Object} value 值
 * @return {String} 没通过返回信息, 否则返回空
 */
Check.prototype.check_object = function(value, cg) {
	var msg = null;
	var len = cg.length;
	for (var i = 0; i < len; i++) {
		var cg_sub = cg[i];
		msg = this.run(value[cg_sub.name], cg_sub);
		if (msg) {
			break;
		}
	}
	return msg ? "属性 -> " + msg : null;
};

/**
 * @description 验证字符串范围
 * @param {String} value 被验证的值
 * @return {String} 没通过返回信息,否则返回空
 */
Check.prototype.check_string_range = function(value, cg) {
	if(!cg){
		return null;
	}
	var len = value.length;
	var range = cg.range;
	if (range.length === 2) {
		if (range[0] > len || range[1] < len) {
			return this.msg('rangeLength', range[0], range[1]);
		}
	} else {
		if (cg.min !== 0 && cg.min > len) {
			return this.msg('minLength', cg.min);
		}
		if (cg.max !== 0 && cg.max < len) {
			return this.msg('maxLength', cg.max);
		}
	}
	return null;
};

/**
 * @description 验证拓展名
 * @param {String} value 被验证的值
 * @return {String} 没通过返回信息,否则返回空
 */
Check.prototype.check_extension = function(value, cg) {
	if(!cg){
		return null;
	}
	var ex = cg.extension;
	if (ex) {
		var arr = ex.split('|');
		var bl = false;
		var val = value.toLowerCase();
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			if (val.endWith(arr[i])) {
				bl = true;
				break;
			}
		}
		if (!bl) {
			return this.msg('extension', ex);
		}
	}
	return null;
};

/**
 * @description 正则验证字符串
 * @param {String} value 被验证的值
 * @return {String} 没通过返回信息,否则返回空
 */
Check.prototype.check_string_regex = function(value, cg) {
	if(!cg){
		return null;
	}
	var rx = cg.regex;
	if (rx && !value.regex(rx)) {
		return this.msg('regex', rx);
	}
	return null;
};

/**
 * @description 验证字符串格式
 * @param {String} value 被验证的值
 * @return {String} 没通过返回信息, 否则返回空
 */
Check.prototype.check_string_format = function(value, cg) {
	if(!cg){
		return null;
	}
	var fmt = cg.format;
	if (fmt) {
		var bl = value.checkFormat(fmt);
		if (!bl) {
			return this.msg(fmt);
		}
	}
	return null;
};

/**
 * @description 验证字符串
 * @param {String} value 被验证的值
 * @return {String} 没通过返回信息,否则返回空
 */
Check.prototype.check_string = function(value, cg) {
	if (value === '' && cg.notEmpty) {
		return this.msg('notEmpty');
	} else {
		var msg = this.check_string_range(value, cg);
		if (!msg) {
			msg = this.check_string_format(value, cg);
		}
		if (!msg) {
			msg = this.check_extension(value, cg);
		}
		if (!msg) {
			msg = this.check_string_regex(value, cg);
		}
		return msg;
	}
};

/**
 * 创建消息头
 * @param {Object} cg 配置
 */
Check.prototype.msg_head = function(cg) {
	var head = cg.title ? cg.title : '';
	head += cg.name ? `(${cg.name}) ` : '';
	return head;
};

/**
 * @description 验证值是否正确
 * @param {Object} value
 * @return {String} 没通过返回信息,否则返回空
 */
Check.prototype.run = function(value, cg) {
	if (!cg) {
		cg = this;
	}
	var msg = null;
	
	var type = cg.type;
	if (value && type) {
		var p = typeof(value);
		if (type !== p) {
			if (type === 'number') {
				if (p === 'string') {
					if (cg.splitter) {
						var arr = value.split(cg.splitter);
						var len = arr.length;
						var g = cg.number;
						for (var i = 0; i < len; i++) {
							var val = arr[i];
							if (isNaN(val)) {
								msg = this.msg('number');
							} else {
								msg = this.check_number(Number(val), g);
							}
							if (msg) {
								break;
							}
						}
					} else {
						if (isNaN(value)) {
							msg = this.msg('number');
						} else {
							msg = this.check_number(Number(value), cg.number);
						}
					}
				} else {
					msg = this.check_number(value, cg.number);
				}
			} else if (type === 'bool') {
				if (value !== 'true' && value !== 'false' && value !== '1' && value !== '0') {
					msg = this.msg('type', type);
				}
			} else if (type === 'array') {
				if (Array.isArray(value)) {
					msg = this.check_array(value, cg.array);
				} else {
					msg = this.msg('type', type);
				}
			} else {
				msg = this.msg('type', type);
			}
		} else if (type === 'string') {
			if (cg.splitter) {
				var arr = value.split(cg.splitter);
				var len = arr.length;
				var g = cg.string;
				for (var i = 0; i < len; i++) {
					msg = this.check_string(arr[i], g);
					if (msg) {
						break;
					}
				}
			} else {
				msg = this.check_string(value, cg.string);
			}
		} else if (type === 'number') {
			msg = this.check_number(value, cg.number);
		} else if (type === 'object') {
			if (Array.isArray(value)) {
				msg = this.msg('type', type);
			} else {
				msg = this.check_object(value, cg.object);
			}
		}
	}
	return msg ? this.msg_head(cg) + msg : null;
};

if (global.$) {
	$.Check = Check;
}

module.exports = Check;
