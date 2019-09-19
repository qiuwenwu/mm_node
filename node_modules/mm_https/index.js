/**
 * @fileOverview http请求帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
 
require('mm_expand');
const {
	gunzip,
	inflate
} = require('zlib');
const http = require('http');
const https = require('https');

/**
 * @description 获取参数项
 * @param {String} url 网址
 * @return {Object} http参数对象
 */
function getInfo(url) {
	var host = url.between("//", "/", true);
	var path = "/" + url.replace("//").right("/");
	var index = host.indexOf(':');
	var port;

	if (index !== -1) {
		port = host.substr(index + 1);
		host = host.substr(0, index);
	} else {
		if (url.indexOf('https') !== -1) {
			port = 443;
		} else {
			port = 80;
		}
	}

	return {
		host: host,
		port: port,
		path: path
	}
}

/**
 * @class Cookie类
 */
class Cookie {
	/**
	 * 构造函数
	 */
	constructor() {
		// cookie列表
		this.list = [];

		/**
		 * @description 获取cookie
		 * @param {String} name 名称
		 * @param {String} path 所属路径
		 * @param {String} domain 所属域
		 * @return {Object} cookie
		 */
		Cookie.prototype.get = function(name, path, domain) {
			var obj;
			if (domain) {
				obj = this.list.getObj({
					name: name,
					path: path,
					domain: domain
				});
			} else if (path) {
				obj = this.list.getObj({
					name: name,
					path: path
				});
			} else {
				obj = this.list.getObj({
					name: name
				});
			}
			return obj;
		};

		/**
		 * @description 设置cookie
		 * @param {String} name 名称
		 * @param {Object} value 值
		 * @param {String} path 作用路径
		 * @param {String} domain 作用域
		 */
		Cookie.prototype.set = function(name, value, path, domain) {
			this.list.setObj({
				name: name,
				value: value,
				path: path,
				domain: domain
			});
		};

		/**
		 * @description 删除Cookie
		 * @param {String} name 名称
		 * @param {String} path 所属路径
		 * @param {String} domain 所属域
		 */
		Cookie.prototype.del = function(name, path, domain) {
			if (domain) {
				this.list.del({
					name: name,
					path: path,
					domain: domain
				});
			} else if (path) {
				this.list.del({
					name: name,
					path: path
				});
			} else {
				this.list.del({
					name: name
				});
			}
		};

		/**
		 * @description 设置或读取cookie字符串
		 * @param {String} str cookie字符串
		 * @return {String} 没有传参时返回存储的cookie字符串
		 */
		Cookie.prototype.str = function(str) {
			if (str) {
				var cookie = {};
				var arr = str.split("; ");
				var name;
				if (arr.length > 1) {
					var kv = arr[0];
					var arr_kv = kv.split("=");
					name = arr_kv[0];
					cookie.value = encodeURIComponent(arr_kv[1]);
					arr.splice(0, 1);
				}
				cookie.name = name;
				arr.map(function(o) {
					var ar = o.split("=");
					cookie[ar[0]] = ar[1];
				});
				var path = cookie.path;
				var domain = cookie.domain;
				var obj = this.get(name, path, domain);
				if (obj) {
					$.push(obj, cookie, true);
				} else {
					this.list.push(cookie);
				}
			} else {
				var lt = this.list;
				var str = "";
				var now = new Date();
				var tromorrow = new Date().addDays(1);
				var ar = [];
				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];
					var time = tromorrow;
					if (o.Expires) {
						var time = o.Expires.toTime();
					}
					if (time > now) {
						ar.push(o);
					} else {
						str += o.name + "=" + o.value + ";";
					}
				}
				this.list.delList(ar);
				return str;
			}
		};
	}
}

/**
 * http类函数
 */
class Http {
	/**
	 * @description 构造函数
	 * @constructor
	 */
	constructor() {
		// 存储上次请求
		this.referer = "";
		// 设置存储
		this.cookie = new Cookie();

		/**
		 * @description 删除cookie
		 * @param {String} name 名称
		 * @param {String} path 路径
		 * @param {String} domain 域名
		 */
		Http.prototype.delCookie = function(name, path, domain) {
			if (domain) {
				this.list.del({
					name: name,
					path: path,
					domain: domain
				});
			} else if (path) {
				this.list.del({
					name: name,
					path: path
				});
			} else {
				this.list.del({
					name: name
				});
			}
		};

		/**
		 * @description 初始化选项
		 * @param {String} method 请求方式
		 * @param {String} url 请求地址
		 * @param {Object} cookie 缓存
		 * @return {Object} 配置参数
		 */
		Http.prototype.option = function(method, url, cookie) {
			var {
				host,
				port,
				path
			} = getInfo(url);
			var op = {
				url: url,
				hostname: host,
				path: path,
				port: port,
				method: method,
				headers: {
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
					'Accept-Encoding': 'gzip, deflate',
					'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
					'Cache-Control': 'max-age=0',
					'Connection': 'keep-alive',
					'Upgrade-Insecure-Requests': '1',
					'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'text/html'
				}
			};
			if (cookie) {
				op.cookie = cookie;
			} else if (this.cookie) {
				op.cookie = this.cookie.str();
			}
			if (this.referer) {
				op.Referer = this.referer;
			}
			return op;
		};

		/**
		 * http请求
		 * @param {Object} options 请求配置
		 * @param {Object} param 请求参数
		 * @return {Promise|Object} 请求的结果
		 */
		Http.prototype.req = function(options, param) {
			return new Promise((resolve, reject) => {
				var hp;
				var url = options.url;
				if (url && url.indexOf('https') !== -1) {
					hp = https;
				} else {
					hp = http;
				}
				var req = hp.request(options, function(res) {
					var code = res.statusCode;
					if (code === 200) {
						var chunks = [];
						var encoding = res.headers['content-encoding'];
						// 非gzip/deflate要转成utf-8格式
						if (encoding === 'undefined') {
							res.setEncoding('utf-8');
						}
						res.on('data', function(chunk) {
							chunks.push(chunk);
						});
						res.on('end', function() {
							var buffer = Buffer.concat(chunks);
							if (encoding === 'gzip') {
								gunzip(buffer, function(err, decoded) {
									if (err) {
										reject(err);
									} else {
										var body = decoded.toString();
										resolve({
											headers: res.headers,
											body: body
										});
									}
								});
							} else if (encoding === 'deflate') {
								inflate(buffer, function(err, decoded) {
									if (err) {
										reject(err);
									} else {
										var body = decoded.toString();
										resolve({
											headers: res.headers,
											body: body
										});
									}
								});
							} else {
								var body = buffer.toString();
								resolve({
									headers: res.headers,
									body: body
								});
							}
						});
					} else {
						resolve({
							status: code,
							message: res.statusMessage,
							headers: res.headers
						});
					}
				});
				if (param) {
					req.write(param);
				}
				req.on("error", function(err) {
					resolve({
						status: 0,
						message: err.message
					});
				});
				req.end();
			});
		};

		/**
		 * @description 执行http请求
		 * @param {Object} options 配置参数
		 * @param {Object} param 传递参数
		 * @return {Object} 执行结果
		 */
		Http.prototype.run = async function(options, param) {
			var res = await this.req(options, param);
			if (res) {
				if (res.status === 302) {
					var url = res.headers.location;
					var op = this.option(options.method, url);
					res = await this.req(op, param);
					if (res.status === 302) {
						var url = res.headers.location;
						op = this.option(options.method, url);
						res = await this.req(op, param);
					}
				}
				var hd = res.headers;
				if (hd) {
					var lt = hd['set-cookie'];
					if (lt) {
						for (var i = 0; i < lt.length; i++) {
							this.cookie.str(lt[i]);
						}
					}
					this.referer = options.url;
				}
			}
			return res;
		};

		/**
		 * @description 执行http请求 —— 快速
		 * @param {Object} options 配置参数
		 * @param {Object} param 传递参数
		 * @return {Object} 执行结果
		 */
		Http.prototype.run_fast = async function(options, param) {
			var res = await this.req(options, param);
			if (res) {
				if (res.status === 302) {
					var url = res.headers.location;
					var op = this.option(options.method, url);
					res = await this.req(op, param);
					if (res.status === 302) {
						var url = res.headers.location;
						op = this.option(options.method, url);
						res = await this.req(op, param);
					}
				}
			}
			return res;
		};

		/**
		 * @description GET请求
		 * @param {String} url 请求地址
		 * @param {Object} headers 请求头
		 * @param {Object} cookie 服务缓存
		 * @return {Object} 请求的结果
		 */
		Http.prototype.get = function(url, headers, cookie) {
			var op = this.option('GET', url, cookie);
			$.push(op.headers, headers, true);
			return this.run(op);
		};

		/**
		 * @description GET请求 —— 快速
		 * @param {String} url 请求地址
		 * @return {Object} 请求的结果
		 */
		Http.prototype.get_fast = function(url) {
			var op = this.option('GET', url, {});
			return this.run_fast(op);
		};

		/**
		 * @description POST请求
		 * @param {String} url 请求地址
		 * @param {Object} param 正文参数
		 * @param {Object} headers 请求头
		 * @param {String} type 请求类型
		 * @param {String} cookie Cookie缓存
		 * @return {Object} 请求的结果
		 */
		Http.prototype.post = function(url, param, headers, type, cookie) {
			var body = "";
			var tp = typeof(param);
			if (!type) {
				type = 'application/json';
			}
			if (type) {
				if (type.indexOf('json') !== -1) {
					type = "application/json";
				} else if (type.indexOf('html') !== -1) {
					type = "text/html";
				} else if (type.indexOf('form') !== -1) {
					type = "application/x-www-form-urlencoded";
				} else {
					type = "text/plain";
				}
				if (tp === "object") {
					if (type.indexOf('/json') !== -1) {
						body = $.toJson(param);
					} else if (type.indexOf('form') !== -1) {
						body = $.toUrl(param);
					} else {
						body = $.toXml(param);
					}
				} else {
					body = param.trim();
				}
			} else {
				if (tp === "object") {
					type = "application/json";
					body = $.toJson(param);
				} else if (type === "string") {
					body = param.trim();
					if (body.startWith('{') && body.endWith('}')) {
						type = "application/json";
					} else if (body.startWith('[') && body.endWith(']')) {
						type = "application/json";
					} else if (body.indexOf("<html>") !== -1) {
						type = "text/html";
					} else {
						type = "text/plain";
					}
				}
			}
			var op = this.option('POST', url, cookie);
			op.body = body;
			op.headers['Content-Type'] = type;
			op.headers['Content-Length'] = body.length;
			$.push(op.headers, headers, true);
			return this.run(op, body);
		};

		/**
		 * @description POST请求 —— 快速
		 * @param {String} url 请求地址
		 * @param {String} body 正文参数
		 * @param {String} type 请求类型
		 * @return {Object} 请求的结果
		 */
		Http.prototype.post_fast = function(url, body, type) {
			var op = this.option('POST', url, {});
			op.body = body;
			if (!type) {
				type = "application/json";
			}
			op.headers['Content-Type'] = type;
			op.headers['Content-Length'] = body.length;
			return this.run_fast(op, body);
		};

		/**
		 * 清除缓存
		 */
		Http.prototype.clear = function() {
			this.cookie.list.clear();
			this.headers = [];
		};
	}
}

/**
 * @description 导入构造函数
 */
exports.Http = Http;
