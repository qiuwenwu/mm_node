const Item = require('mm_machine').Item;

// 提供一个全局方法容器
if (!$.methods) {
	$.methods = {};
}

/**
 * websocket驱动类
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
		this.default_file = "./socket.json";

		/* 通用项 */
		/**
		 * 配置参数
		 */
		this.config = {
			// 匹配的路径
			"path": "",
			// socket 服务名称
			"name": "",
			// socket 服务标题
			"title": "",
			// socket 服务介绍
			"description": "",
			// 调用的脚本
			"func_file": "./index.js",
			// 同步消息循环发送的时间间隔
			"interval": 1000
		};

		// 开放给前端调用的函数
		this.methods = Object.assign({}, $.methods);

		// 客户端集合
		this.clients = {};
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
			var l = $.slash;
			if (file.indexOf('socket' + l) !== -1) {
				var name = file.between('socket' + l, l);
				text = text.replaceAll("{0}", name);
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
			var l = $.slash;
			if (file.indexOf('socket' + l) !== -1) {
				var name = file.between('socket' + l, l);
				text = text.replaceAll("{0}", name);
			}
			file.saveText(text);
		}
	}
};

/**
 * 获取session ID
 * @param {Object} ctx HTTP上下文
 * @return {String} 返回用户的uuid
 */
Drive.prototype.getToken = async function(ctx) {
	var uuid = await ctx.cookies.get("mm:uuid");
	if (!uuid) {
		var hd = ctx.request.header;
		var agent = hd['user-agent'];
		if (!agent) {
			agent = "mm";
		}
		var start = agent.md5().substring(0, 32);
		var stamp = Date.parse(new Date()) / 1000;
		uuid = (ctx.ip + '_' + stamp).aes_encode(start);
	}
	return uuid;
};

/**
 * 收到消息时处理函数
 * @param {String} bodyStr 消息正文字符串
 * @param {Object} ctx http上下文
 * @param {String} token 临时访问牌
 */
Drive.prototype.onmessage = async function(bodyStr, ctx, token) {
	var ret = await this.run(bodyStr, ctx, token);
	if (ret) {
		var ws = ctx.websocket;
		if (typeof(ret) == "object") {
			ws.send(JSON.stringify(ret));
		} else {
			ws.send(ret);
		}
	}
};

/**
 * 状态变更通知
 * @param {String} type 通知类型
 * @param {String} bodyStr 消息正文字符串
 * @param {Object} ctx http上下文
 * @param {String} token 临时访问牌
 * @return {Boolean} 返回true表示做状态修改, 例如关闭时为true, 会删除该客户端
 */
Drive.prototype.noticy = async function(type, bodyStr, ctx, token) {
	$.log.debug('通知:', '关闭了');
	return true;
};

/**
 * 关闭连接时处理函数
 * @param {String} bodyStr 消息正文字符串
 * @param {Object} ctx http上下文
 * @param {String} token 临时访问牌
 */
Drive.prototype.onclose = async function(bodyStr, ctx, token) {
	var del = await this.noticy("close", ctx, token);
	if (del) {
		var lt = this.clients[token];
		var index = lt.indexOf(ctx);
		lt.splice(index, 1);
	}
};

/**
 * 设置websocket
 * @param {Object} ctx http上下文
 * @param {String} token 临时访问牌
 */
Drive.prototype.set_socket = function(ctx, token) {
	var ws = ctx.websocket;

	// 增加消息队列
	ws.list_msg = [];

	/**
	 * 设置发送请求
	 * @param {String} method 方法名称
	 * @param {Object} params 请求参数
	 * @param {Function} func 回调函数
	 */
	var _this = this;
	ws.req = async function(method, params, func) {
		var key = _this.config.name + '';
		var data = {
			id: key + new Date().getTime() + Math.random(),
			method: method,
			params: params
		};
		this.send(JSON.stringify(data));

		if (func) {
			data.func = func;
			this.list_msg.push(data);
		}
	};

	// 设置事件 —— 获取消息时和socket关闭时
	ws.on("message", async function(bodyStr) {
		_this.onmessage(bodyStr, ctx, token)
	});

	ws.on("close", async function(bodyStr) {
		_this.onclose(bodyStr, ctx, token)
	});
}


/**
 * 握手成功, 发送首条返回内容
 * @param {Object} ctx http 上下文
 * @param {String} token 临时访问牌
 */
Drive.prototype.success = function(ctx, token) {
	var ret = $.ret.bl(true, '连接成功');
	// 首次响应加上身份牌
	ret.result.token = token;
	// ID为0表示连接成功
	ret.id = 0;
	ctx.websocket.send(JSON.stringify(ret));
};

/**
 * 添加客户端
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前, 然后继续执行函数
 */
Drive.prototype.add = async function(ctx) {
	var token = await this.getToken(ctx);
	if (!this.clients[token]) {
		this.clients[token] = [];
	}
	this.set_socket(ctx, token);
	this.success(ctx, token);
	this.clients[token].push(ctx);
};

/**
 * 发送消息 —— 会发送给所有目标, 如须过滤目标, 则须在渲染时过滤
 * @param {String} body 消息正文
 * @param {String} token 临时访问牌, 用于指定客户端发消息
 */
Drive.prototype.send = async function(body, token) {
	if (token) {
		var list = this.clients[token];
		if (list) {
			list.maps(async (ctx) => {
				ctx.websocket.send(body);
			})
		}
	} else {
		var dt = this.clients;
		for (let k in dt) {
			var list = dt[k];
			list.maps(async (ctx) => {
				ctx.websocket.send(body);
			});
		}
	}
};

/**
 * 发送消息 —— 会发送给所有目标, 如须过滤目标, 则须在渲染时过滤
 * @param {String} method 方法名称
 * @param {Object} params 请求参数
 * @param {Function} func 回调函数 可以为空
 * @param {String} token 临时访问牌, 用于指定客户端发消息
 */
Drive.prototype.req = async function(method, params, func, token) {
	if (token) {
		var ctx = this.clients[token];
		if (ctx) {
			ctx.websocket.req(params, func);
		}
	} else {
		var dt = this.clients;
		for (let k in dt) {
			ctx.websocket.req(params, func);
		}
	}
};

/**
 * 执行
 * @param {String} bodyStr 正文字符串
 * @param {Object} ctx 请求上下文
 * @param {String} token 临时访问牌
 * @return {Object} 返回执行结果
 */
Drive.prototype.run = async function(bodyStr, ctx, token) {
	var ws = ctx.websocket;
	var json = bodyStr.toJson();
	if (json) {
		var id = json.id;
		if (json.result && id) {
			var lt = ws.list_msg;
			var len = lt.length;
			var has = false;
			for (var i = 0; i < len; i++) {
				var o = lt[i];
				if (id === o.id) {
					o.func(json.result);
					lt.splice(i, 1);
					has = true;
					break;
				}
			}
			if (has) {
				return;
			}
		} else if (json.method) {
			var func = this.methods[json.method];
			if (func) {
				var ret;
				var result = func(json.params, ws);
				if (result) {
					if (typeof(result) == "object" && !Array.isArray(result)) {
						ret = Object.assign({
							id
						}, result);
					} else {
						ret = {};
						if (id) {
							ret.id = id
						}
						ret.result = result;
					}
				}
				return ret;
			}
		}
		return this.main(json, ws);
	}
	return this.main(bodyStr, ws);
};

/**
 * 非定义函数时执行
 * @param {Object} body 请求正文
 * @param {Object} websocket 当前的服务
 * @return {Object} 返回响应结果
 */
Drive.prototype.main = async function(body, websocket) {
	return null;
};

/**
 * 初始化函数, 用于定义开放给前端的函数
 */
Drive.prototype.init = async function init() {
	
};

/**
 * 加载完成时
 */
Drive.prototype.load_after = function() {
	this.init();
	var m = this.methods;
	/**
	 * 获取所有方法
	 * @param {Object} params 参数
	 * @param {Object} ws Websocket服务
	 */
	m.get_method = function(params, ws) {
		return $.keys(m);
	};
};

module.exports = Drive;
