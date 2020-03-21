
(function(){
	// 语言包
	var lang = {
		type: "数据类型不正确",
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
		extension: "需为有效的后缀, 仅支持 '{0}'",
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
		password: "不能包含特殊字符"
	};
	
	/**
	 * @description 参数验证函数
	 * @param {Object} config 配置
	 */
	function Check(config){
		// 分隔符号, 用于查询时判断多个传参
		this.splitter = "|";
		// 参数类型 string字符串、number数字、bool布尔、dateTime时间、array数组类型、object对象类型
		this.type = "string";
		// 字符串相关验证
		this.string = {
			// 非空
			notEmpty: false,
			// 最小长度
			min: 0,
			// 最大长度
			max: 0,
			// 验证字符串范围, 传入两个成员, 最小长度和最大长度。例如：[0, 0]
			range: [],
			// 验证正则表达式
			regex: "",
			// 验证与某个参数值是否相同
			identical: "",
			// 验证与某个参数值是否不同
			different: "",
			// 后缀名, 多个后缀名用“|”分隔
			extension: "",
			// 格式验证 email、url、date、dateISO、number、digits、phone
			format: ""
		};
		// 数值相关验证
		this.number = {
			// 最小值
			min: 0,
			// 最大值
			max: 0,
			// 验证字符串范围
			range: []
		};
		if (config) {
			$.push(this, config, true);
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
	 * @description 取错误提示
	 * @param {String} key 语言包键
	 * @param {String} v1 替换的词1
	 * @param {String} v2 替换的词2
	 * @return {String} 错误语句
	 */
	Check.prototype.msg = function(key, v1, v2) {
		var str = lang[key];
		if (str) {
			if (v2) {
				return str.replace("{0}", v1).replace('{1}', v2);
			} else {
				return str.replace("{0}", v1);
			}
		} else {
			return "参数不正确!";
		}
	};
	
	/**
	 * @description 验证数值
	 * @param {Numbr} value 被验证的值
	 * @return {String} 没通过返回信息, 否则返回空
	 */
	Check.prototype.check_number = function(value) {
		var n = this.number;
		if (n.range.length === 2) {
			if (n.range[0] > value || n.range[1] < value) {
				return this.msg('range', n.range[0], n.range[1]);
			}
		} else {
			if (n.min !== 0 && n.min > value) {
				return this.msg('min', n.min);
			}
			if (n.max !== 0 && n.max < value) {
				return this.msg('max', n.max);
			}
		}
		return null;
	};
	
	/**
	 * @description 验证字符串范围
	 * @param {String} value 被验证的值
	 * @return {String} 没通过返回信息,否则返回空
	 */
	Check.prototype.check_string_range = function(value) {
		var n = this.string;
		var len = value.length;
		if (n.range.length === 2) {
			if (n.range[0] > len || n.range[1] < len) {
				return this.msg('rangeLength', n.range[0], n.range[1]);
			}
		} else {
			if (n.min !== 0 && n.min > len) {
				return this.msg('minLength', n.min);
			}
			if (n.max !== 0 && n.max < len) {
				return this.msg('maxLength', n.max);
			}
		}
		return null;
	};
	
	/**
	 * @description 验证拓展名
	 * @param {String} value 被验证的值
	 * @return {String} 没通过返回信息,否则返回空
	 */
	Check.prototype.check_extension = function(value) {
		var n = this.string;
		if (n.extension) {
			var arr = n.extension.split('|');
			var bl = false;
			var val = value.toLowerCase();
			for (var i = 0; i < arr.length; i++) {
				if (val.endWith(arr[i])) {
					bl = true;
					break;
				}
			}
			if (!bl) {
				return this.msg('extension', n.extension);
			}
		}
		return null;
	};
	
	/**
	 * @description 正则验证字符串
	 * @param {String} value 被验证的值
	 * @return {String} 没通过返回信息,否则返回空
	 */
	Check.prototype.check_string_regex = function(value) {
		var rx = this.string.regex;
		if (rx && !value.regex(rx)) {
			return this.msg('regex');
		}
		return null;
	};
	
	/**
	 * @description 验证字符串格式
	 * @param {String} value 被验证的值
	 * @return {String} 没通过返回信息,否则返回空
	 */
	Check.prototype.check_string_format = function(value) {
		var fmt = this.string.format;
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
	Check.prototype.check_string = function(value) {
		if (value === '' && this.string.notEmpty) {
			return this.msg('notEmpty');
		} else {
			var msg = this.check_string_range(value);
			if (!msg) {
				msg = this.check_string_format(value);
			}
			if (!msg) {
				msg = this.check_extension(value);
			}
			if (!msg) {
				msg = this.check_string_regex(value);
			}
			return msg;
		}
	};
	
	/**
	 * @description 验证值是否正确
	 * @param {Object} value
	 * @return {String} 没通过返回信息,否则返回空
	 */
	Check.prototype.run = function(value) {
		var msg = null;
		if (value) {
			var type = this.type;
			var p = typeof(value);
			if (type !== p) {
				if (type === 'number') {
					if (p === 'string') {
						if (this.splitter) {
							var arr = value.split(this.splitter);
							for (var i = 0; i < arr.length; i++) {
								var val = arr[i];
								if (isNaN(val)) {
									msg = this.msg('number');
								} else {
									msg = this.check_number(Number(val));
								}
								if (msg) {
									break;
								}
							}
						} else {
							if (isNaN(value)) {
								msg = this.msg('number');
							} else {
								msg = this.check_number(Number(value));
							}
						}
					} else {
						msg = this.check_number(value);
					}
				} else if (type === 'bool') {
					if (value !== 'true' && value !== 'false' && value !== '1' && value !== '0') {
						msg = this.msg('type');
					}
				} else {
					msg = this.msg('type');
				}
			} else if (type === 'string') {
				if (this.splitter) {
					var arr = value.split(this.splitter);
					for (var i = 0; i < arr.length; i++) {
						msg = this.check_string(arr[i]);
						if (msg) {
							break;
						}
					}
				} else {
					msg = this.check_string(value);
				}
			} else if (type === 'number') {
				msg = this.check_number(value);
			}
		}
		return msg;
	};
	
	var Item = require('mm_machine').Item;
	var Check = require('mm_check');
	
	/**
	 * @description Param参数驱动类
	 * @extends {Item}
	 * @class
	 */
	function Drive(cg) {
		this.query = [];
		this.query_required = [];
		this.body = [];
		this.body_required = [];
		$.push(this, cg);
	}
	
	/**
	 * @description 验证值是否符合
	 * @param {Object} model 验证模型
	 * @param {Object} value 被验证的值
	 * @param {String} method 请求方式, post提交、get增、del删、set改、get查、import导入、export导出
	 * @return {Object} 没通过返回信息,否则返回空
	 */
	Drive.prototype.check_item = function(model, value, method) {
		var msg;
		if (value === undefined || value === null) {
			if (method.has(model.name)) {
				msg = this.title(model) + model.msg('required');
			}
		} else {
			msg = model.run(value);
			if (!msg) {
				msg = this.main(model, value);
			}
			if (msg) {
				return this.title(model) + msg;
			}
		}
		return msg;
	};
	
	/**
	 * @description 获取模型
	 * @param {String} name 名称
	 * @return {Object} 配置模型
	 */
	Drive.prototype.getModel = function(name) {
		var model;
		var lt = this.config.list;
		for (var i = 0; i < lt.length; i++) {
			var o = lt[i];
			if (o['name'] === name) {
				model = o;
				break;
			}
		}
		return model;
	};
	
	/**
	 * @description 执行验证
	 * @param {Object} params 请求参数集合
	 * @param {Array} arr 要验证的参数名数组
	 * @param {Array} required 必填项名称数组
	 * @return {String} 返回验证结果
	 */
	Drive.prototype.check_sub = function(params, arr, required) {
		var msg;
		for (var i = 0; i < arr.length; i++) {
			var k = arr[i];
			var o = this.getModel(k);
			if (o) {
				var value = params[k];
				msg = this.check_item(o, value, required);
				var s = o.string;
				if (!msg && value && s) {
					if (s.identical) {
						var val = params[s.identical];
						if (val !== value) {
							var m = this.getModel(s.identical);
							if (m) {
								msg = this.title(o) + o.msg('identical', o.title + '(' + o.name + ')', m.title + '(' + m.name +
									')');
							} else {
								msg = this.title(o) + o.msg('identical', o.title + '(' + o.name + ')', s.identical);
							}
						}
					} else if (s.different) {
						var val = params[s.different];
						if (val === value) {
							var m = this.getModel(s.different);
							if (m) {
								msg = this.title(o) + o.msg('different', o.title + '(' + o.name + ')', m.title + '(' + m.name +
									')');
							} else {
								msg = this.title(o) + o.msg('different', o.title + '(' + o.name + ')', s.different);
							}
						}
					}
				}
				if (msg) {
					break;
				}
			}
		}
		return msg;
	};
	
	/**
	 * @description 验证参数是否符合
	 * @param {Object} query url参数集合
	 * @param {Object} body 正文参数集合
	 * @param {String} method 请求方式，get增、del删、set改、get查、import导入、export导出
	 * @return {Object} 没通过返回信息,否则返回空
	 */
	Drive.prototype.check = function(query, body, method) {
		if (method !== 'GET') {
			method = method.toLowerCase();
		}
		var cg = this.config;
		var m = cg[method];
		if (!m) {
			var m_key = cg.method;
			if (m_key) {
				var md = query[m_key];
				if (md) {
					m = cg[md];
				}
			}
			if (!m) {
				m = cg["get"];
			}
		}
		var arr = m["query"];
		if (!arr || arr.length === 0) {
			arr = [];
			for (var k in query) {
				if (arr.indexOf(k) == -1) {
					arr.push(k);
				}
			}
		}
	
		var arr_query = m['query_required'] ? m['query_required'] : [];
		arr.addList(arr_query);
		var msg = this.check_sub(query, arr, arr_query);
		if (!msg) {
			var ar = m['body_not'];
			if (ar && body && ar.length > 0) {
				for (var i = 0; i < ar.length; i++) {
					var k = ar[i];
					delete body[k];
				}
			}
	
			arr = m["body"];
			if (!arr || arr.length === 0) {
				arr = [];
				for (var k in query) {
					if (arr.indexOf(k) == -1) {
						arr.push(k);
					}
				}
			}
			var arr_body = m['body_required'] ? m['body_required'] : [];
			arr.addList(arr_body);
			msg = this.check_sub(body, arr, arr_body);
		}
		return msg;
	};
	
	/**
	 * @description 取字段
	 * @param {Object} model 验证模型
	 * @return {String} 返回名称
	 */
	Drive.prototype.title = function(model) {
		if (!model.title) {
			return model.name + " ";
		} else {
			return model.title + "(" + model.name + ") ";
		}
	};
	
	/**
	 * @description 验证回调函数
	 * @param {Object} model 当前的验证模型
	 * @param {Object} value 当前的验证值
	 * @return {Object} 没通过返回信息,否则返回空
	 */
	Drive.prototype.main = function(model, value) {
		return null;
	};
	
})();