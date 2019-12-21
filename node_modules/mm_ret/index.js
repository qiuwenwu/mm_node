/**
 * @fileOverview 结果输出类
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');

/**
 * @class 错误代码
 */
class Error {
	/**
	 * @description 构造函数
	 * @constructor
	 */
	constructor() {
		this.type = [
			{
				code: -32700,
				message: "not well formed"
			},
			{
				code: -32701,
				message: "unsupported encoding"
			},
			{
				code: -32702,
				message: "invalid character for encoding"
			},
			{
				code: -32600,
				message: "invalid json-rpc. not conforming to spec"
			},
			{
				code: -32601,
				message: "requested method not found"
			},
			{
				code: -32602,
				message: "invalid method parameters"
			},
			{
				code: -32603,
				message: "internal json-rpc error"
			},
			{
				code: -32500,
				message: "application error"
			},
			{
				code: -32400,
				message: "system error"
			},
			{
				code: -32300,
				message: "transport error"
			},
			{
				code: 10000,
				message: "业务逻辑脚本错误"
			},
			{
				code: 30000,
				message: "身份验证失败"
			},
			{
				code: 40000,
				message: "数据库执行错误"
			},
			{
				code: 50000,
				message: "服务端执行错误"
			},
			{
				code: 70000,
				message: "参数不正确"
			}
		];
	}
}

/**
 * @description 获取错误
 * @param {String|Number} keyword  关键词 或 错误码
 */
Error.prototype.get = function(keyword) {
	var error = null;
	if (typeof(keyword) === "string") {
		for (var i = 0; i < this.type.length; i++) {
			var o = this.type[i];
			if (o.code === keyword) {
				error = o;
				break;
			}
		}
	} else {
		for (var i = 0; i < this.type.length; i++) {
			var o = this.type[i];
			if (o.message.has(keyword)) {
				error = o;
				break;
			}
		}
	}
	return error;
};

/**
 * @description json-rpc2.0响应函数
 * @class 
 */
class Ret {
	/**
	 * @description 构造函数
	 * @constructor
	 */
	constructor() {

	}
}

/**
 * @description 取结果
 * @param {Object} result 返回的结果
 * @param {Object} error 返回的错误信息
 * @param {String} id 消息ID, 用于消息队列或多线程时
 * @return {Object} json-rpc 请求结果
 */
Ret.prototype.body = function(result, error, id) {
	var ret = {};
	if (id) {
		ret.id = id;
	}
	if (result) {
		ret.result = result;
	} else {
		if (error) {
			if (!error.code) {
				error.code = 10000;
			}
			if (!error.message) {
				error.message = "业务逻辑错误";
			}
		} else {
			error = {
				code: 10000,
				message: "业务逻辑错误"
			}
		}
		ret.error = error;
	}
	return ret;
};

/**
 * @description 取结果
 * @param {Number} code 返回的错误码
 * @param {String} message 返回的错误提示
 * @param {String} id 消息ID, 用于消息队列或多线程时
 * @return {Object} json-rpc 请求结果
 */
Ret.prototype.error = function(code, message, id) {
	var error = {
		code: code,
		message: message
	};
	return this.body(null, error, id);
};

/**
 * @description 取列表结果
 * @param {Array} list 返回列表
 * @param {Number} count 查询结果数
 * @param {String} id 消息ID, 用于消息队列或多线程时
 * @return {Object} json-rpc 请求结果
 */
Ret.prototype.list = function(list, count, id) {
	if (!list) {
		list = [];
	}
	var result = {
		list: list
	};
	if (count !== undefined) {
		result.count = count;
	}
	return this.body(result, null, id);
};

/**
 * @description 取对象结果
 * @param {Object} obj 返回对象
 * @param {Object} id 消息ID, 用于消息队列或多线程时
 * @return {Object} json-rpc 请求结果
 */
Ret.prototype.obj = function(obj, id) {
	return this.body({
		obj: obj
	}, null, id);
};

/**
 * @description 取布尔型结果
 * @param {Boolean} bl 取布尔结果
 * @param {String} tip 返回对象
 * @param {String} id 操作结果提示
 */
Ret.prototype.bl = function(bl, tip, id) {
	if (!tip) {
		tip = bl ? "成功" : "失败";
	}
	return this.body({
		bl: bl,
		tip: tip
	}, null, id);
};

$.ret = new Ret();

/**
 * @description json-rpc2.0请求函数
 * @class 
 */
class Req {
	/**
	 * 构造函数
	 * @constructor
	 * @param {String} scope 作用域
	 */
	constructor(scope) {
		// 作用域
		this.scope = scope ? scope : "sys";
		
		// 模板集合
		this.tpl = {};
		
		// 方法集合
		this.methods = {};
	}
}

/**
 * 发送请求
 * @param {String} method 方法
 * @param {Object} params 参数
 * @return {Object} 发送的json格式
 */
Req.prototype.send = function(method, params) {
	var tpl = this.tpl[method];
	var pm;
	if(tpl){
		pm = Object.assign({}, tpl, params);
	}
	else {
		pm = params
	}
	return {
		id: this.scope + new Date().stamp(),
		method: method,
		params: pm
	};
};

$.req = new Req();

exports.Error = Error;
exports.Ret = Ret;
exports.Req = Req;