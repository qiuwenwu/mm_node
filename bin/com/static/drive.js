const Item = require('mm_machine').Item;

const fs = require("fs");
const send = require('koa-send');

/**
 * Plugin插件驱动类
 * @extends {Item}
 * @class 
 */
class Drive extends Item {
	/**
	 * 构造函数
	 * @param {String} dir 当前目录
	 * @param {Object} config 配置
	 * @constructor
	 */
	constructor(dir, config) {
		super(dir, __dirname);
		this.default_file = "./static.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			// 标题
			"title": "",
			// 名称
			"name": "",
			// 应用名
			"app": "",
			// 插件
			"plugin": "",
			// 物理根目录
			"root": "",
			// 路由根路径
			"path": "/",
			// 首页
			"index": "index.html",
			// 重定向
			"redirect": true,
			// 缓存保留10分钟
			"maxAge": 1000 * 60 * 10,
			// 是否保持不变
			"immutable": true,
			// 是否启用brotli压缩
			"brotli": true,
			// 是否启用gizp压缩
			"gzip": true,
			// 允许访问的拓展名
			"extensions": null,
			// 处理函数
			"func_file": "",
			// 执行函数名
			"func_name": "",
			// 是否将ES6转换AMD
			"convert_amd": false,
		};

		if (config) {
			$.push(this.config, config);
			this.dir = config.root.fullname();
			var f = this.default_file.fullname(this.dir);
			if (f.hasFile()) {
				var obj = f.loadJson();
				if (obj) {
					this.loadObj(obj);
				} else {
					var text = "./config.tpl.json".loadText(__dirname);
					text = text.replace('"path": "/"', '"path": "' + config.path + '"');
					f.saveText(text);
				}
			}
		}
	}
}

/**
 * 发送文件函数
 */
Drive.prototype.send = send;

/**
 * 加载配置对象
 * @param {Object} obj 配置对象
 */
Drive.prototype.loadObj = function(obj) {
	if (obj.maxAge) {
		obj.maxAge *= 1000;
	}
	$.push(this.config, obj, true);
	var cg = this.config;
	if (cg.convert_amd) {
		this.mode(true);
	}
	var f = cg.func_file;
	if (f) {
		var file = f.fullname(this.dir);
		if (file.hasFile()) {
			var cs = require(file);
			if (cs) {
				var name = cg.func_name;
				if (name) {
					this.main = cs[name];
				} else {
					$.push(this, cs);
				}
			}
		} else {
			var fl = __dirname + "/script.js";
			fl.copyFile(file);
		}
	}
};

/**
 * 执行前
 * @param {Object} ctx http请求上下文
 * @param {Object} path 文件路径
 */
Drive.prototype.before = async function(ctx, path) {};

/**
 * 执行
 * @param {Object} ctx http请求上下文
 * @param {Object} path 文件路径
 * @return {Boolean} 成功发送返回true，失败返回false
 */
Drive.prototype.main = async function(ctx, path) {
	return send(ctx, path, this.config);
};

/**
 * 执行后
 * @param {Object} ctx http请求上下文
 * @param {Object} path 文件路径
 */
Drive.prototype.after = async function(ctx, path) {};

/**
 * 切换模式
 * @param {Boolean} convert_amd 是否将ES6转换AMD
 */
Drive.prototype.mode = async function(convert_amd) {
	var cg = this.config;
	if (convert_amd) {
		this.main = async function main(ctx, path) {
			if (path.endsWith('.vue') || path.endsWith('.js')) {
				var file = this.dir + path;
				if (file) {
					var code;
					var str = file.loadText();
					try {
						if (str && str.indexOf('@/') !== -1) {
							var arr = ctx.request.href.split('/');
							var word = arr[0] + "//" + arr[2] + "/";
							str = str.replaceAll('@/', word);
						}
						code = $.es6_to_amd(str);
					} catch (e) {
						throw e
					}
					if (code) {
						if (path.endsWith('.js')) {
							ctx.response.type = "application/javascript; charset=utf-8";
						}
						else {
							ctx.response.type = "text/html; charset=utf-8";
						}
						ctx.body = code;
						var age = cg.maxAge;
						if (age) {
							if (cg.immutable) {
								ctx.set('Cache-Control', 'max-age=' + (age / 1000) + ",immutable");
							} else {
								ctx.set('Cache-Control', 'max-age=' + (age / 1000));
							}
						}
						return file;
					}
				}
			} else {
				return send(ctx, path, cg);
			}
		}
	} else {
		this.main = async function(ctx, path) {
			return send(ctx, path, cg);
		}
	}
	return null;
};

/**
 * 执行静态文件
 * @param {Object} ctx Http请求上下文
 * @param {Object} path 路由路径
 * @param {Object} next 跳过当前函数
 * @return {String} 执行成功返回文件路径
 */
Drive.prototype.run = async function(ctx, path, next) {
	var done;
	var cg = this.config;
	var ph = cg.path;
	if (path.startWith(ph)) {
		var p = path.replace(ph, '');
		if (p.indexOf('.') !== -1) {
			this.before(ctx, p);
			try {
				done = await this.main(ctx, p);
				this.after(ctx, p, done);
			} catch (err) {
				if (err.status !== 404) {
					throw err;
				}
			}
		} else {
			done = ' ';
			if (ctx.status === 404) {
				var file;
				
				// 取到物理路径
				var root = cg.root.fullname();
				var dir = (root + p).fullname();
				if (!p) {
					file = dir + '/' + cg.index;
				} else if (p.endWith('/')) {
					file = dir + cg.index;
				} else {
					file = dir + '.html';
				}
				if (file.hasFile()) {
					p = file.replace(root, '');
					this.before(ctx, p);
					done = await this.main(ctx, p);
					this.after(ctx, p, done);
				} else if (cg.redirect) {
					var file = root + '/index.html';
					if (file.hasFile()) {
						p = '/index.html';
						this.before(ctx, p);
						done = await this.main(ctx, p);
						this.after(ctx, p, done);
					}
				}
			}
		}
	}
	return done;
};

module.exports = Drive;
