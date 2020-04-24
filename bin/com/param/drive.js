const Item = require('mm_machine').Item;
const Check = require('mm_check');

/**
 * Param参数驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * @param {String} dir 当前目录
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./param.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			// 名称, 由中英文和下“_”组成, 用于卸载接口 例如: demo
			"name": "",
			// 参数过滤
			"filter": true,
			// 默认监听方法, 当查询参数中出现监听的关键词时,选择以该键值作为请求方式，否则默认为get
			"method": "get",
			// 增
			"add": {
				// body参数
				"body": [],
				// body中的必填参数
				"body_required": []
			},
			// 删
			"del": {
				// url中的query参数
				"query": [],
				// query中的必填参数
				"query_required": []
			},
			// 改
			"set": {
				// url中的query参数
				"query": [],
				// query中的必填参数
				"query_required": [],
				// body参数
				"body": [],
				// body中的必填参数
				"body_required": [],
				// 不包含参数
				"body_not": []
			},
			// 查
			"get": {
				// url中的query参数
				"query": [],
				// query中的必填参数
				"query_required": []
			},
			// 提交
			"post": {
				// url中的query参数
				"query": [],
				// query中的必填参数
				"query_required": [],
				// body参数
				"body": [],
				// body中的必填参数
				"body_required": [],
				// 不包含参数
				"body_not": []
			},
			// 验证参数集
			"list": [],
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": ""
		};
	}
}

/**
 * 更新验证对象
 */
Drive.prototype.updateCheck = function() {
	var lt = this.config.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (!o.check) {
			lt[i] = new Check(o);
		}
	}
};

/**
 * 加载之后
 */
Drive.prototype.load_after = function() {
	this.updateCheck();
};

/// 新建配置参数模型, 用于动态创建配置时
Drive.prototype.model = function() {
	return new Check({
		// 参数名
		"name": "name",
		// 参数介绍名
		"title": "名称",
		// 参数做用描述
		"description": "用户名称，传入字符串",
		// 是否唯一值, 需配合数据库验证
		"only": false,
		// 分隔符号, 用于查询时判断多个传参
		"splitter": "|",
		// 是否主键
		"key": false,
		// 参数类型 string字符串、number数字、bool布尔、dateTime时间、object对象类型、array数组类型
		"type": "string",
		// 数据存储类型 tinyint布尔型(0,1),smallint短整数型,mediumint中整数型,int长整数型,float浮点数型,double双精度型,timestamp时间戳型,date日期型,time时间型,varchar字符串型,text长文本型
		"dataType": "",
		// 字符串相关验证
		"string": {
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
		},
		// 数值相关验证
		"number": {
			// 最小值
			"min": 0,
			// 最大值
			"max": 0,
			// 验证字符串范围
			"range": []
		}
	});
};

/**
 * 验证值是否符合
 * @param {Object} model 验证模型
 * @param {Object} value 被验证的值
 * @param {String} method 请求方式, post提交、get增、del删、set改、get查、import导入、export导出
 * @return {Object} 没通过返回信息,否则返回空
 */
Drive.prototype.check_item = function(model, value, method) {
	var msg;
	if (value === undefined || value === null) {
		if (method.has(model.name)) {
			msg = model.msg_head(model) + model.msg('required');
		}
	} else {
		msg = model.run(value);
		if (!msg) {
			msg = this.main(model, value);
		}
		if (msg) {
			return msg;
		}
	}
	return msg;
};

/**
 * 获取模型
 * @param {String} name 名称
 * @return {Object} 配置模型
 */
Drive.prototype.getModel = function(name) {
	var model;
	var lt = this.config.list;
	for (var i = 0, o; o = lt[i++];) {
		if (o['name'] === name) {
			model = o;
			break;
		}
	}
	return model;
};

/**
 * 执行验证
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
							msg = o.msg('identical', o.title + '(' + o.name + ')', m.title + '(' + m.name +
								')');
						} else {
							msg = o.msg('identical', o.title + '(' + o.name + ')', s.identical);
						}
					}
				} else if (s.different) {
					var val = params[s.different];
					if (val === value) {
						var m = this.getModel(s.different);
						if (m) {
							msg = o.msg('different', o.title + '(' + o.name + ')', m.title + '(' + m.name +
								')');
						} else {
							msg = o.msg('different', o.title + '(' + o.name + ')', s.different);
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
 * 验证参数是否符合
 * @param {Object} query url参数集合
 * @param {Object} body 正文参数集合
 * @param {String} method 请求方式，get增、del删、set改、get查、import导入、export导出
 * @return {Object} 没通过返回信息,否则返回空
 */
Drive.prototype.check = function(query, body, method) {
	if (method !== 'GET') {
		method = method.toLowerCase();
	}
	var m = this.config[method];
	if (!m) {
		var m_key = this.config.method;
		if (m_key) {
			var md = query[m_key];
			if (md) {
				m = this.config[md];
			}
		}
		if (!m) {
			m = this.config["get"];
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
 * 取字段
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
 * 验证回调函数
 * @param {Object} model 当前的验证模型
 * @param {Object} value 当前的验证值
 * @return {Object} 没通过返回信息,否则返回空
 */
Drive.prototype.main = function(model, value) {
	return null;
};

module.exports = Drive;
