const fs = require('fs');
const send = require('koa-send');
const path = require('path');
require('mm_es6_to_amd');

/**
 * @description 创建静态文件访问器
 * @param {String} root 文件根目录
 * @param {Object} config 配置
 * @param {Object} es6_to_amd 将ES6的js、vue文件转AMD标准, 传入需要转换的后缀名
 */
function statics(root, config, es6_to_amd) {
	/**
	 * @description ES6的js、vue文件转AMD标准配置
	 */
	this.es6_to_amd = {
		/**
		 * 处理转换的文件路径，当文件属于改路径下的才进行转换
		 */
		path: '/src',
		/**
		 * @param {Array} 需要转换的文件后缀名
		 */
		files: ['.js', '.vue']
	};

	/**
	 * 配置参数
	 */
	this.config = {
		index: "index.html",
		maxage: 7200 * 1000,
		immutable: true,
		hidden: false,
		format: false,
		extensions: false,
		brotli: true,
		gzip: true,
		root: root ? root : './static'
	};

	if (config) {
		if (config.maxAge) {
			config.maxage = config.maxAge * 1000;
			delete config.maxAge;
		} else if (config.maxage) {
			config.maxage *= 1000;
		}
		$.push(this.config, config);
	}

	/**
	 * 执行静态文件处理 (转换为ES5标准)
	 * @method run
	 * @param {Object} ctx http请求上下文
	 * @param {Function} next 跳过当前执行，先执行后面函数
	 * @return {Boolean} 是否执行成功
	 */
	async function main(ctx, next) {
		await next();
		if (ctx.method !== 'HEAD' && ctx.method !== 'GET')
			return;
		// 已处理响应
		if (ctx.body != null || ctx.status !== 404)
			return;

		var path = ctx.path;

		if (path.startWith(this.es6_to_amd.path)) {
			// 是否需要转换
			var bl = false;
			var lt = this.es6_to_amd.files;
			var len = lt.length;
			for (var i = 0; i < len; i++) {
				if (path.endsWith(lt[i])) {
					bl = true;
					break;
				}
			}
			if (bl) {
				var file = this.config.root + path;
				if (!file.hasFile()) {
					return;
				}
				var code;
				try {
					var str = file.loadText();
					code = $.es6_to_amd(str);
				} catch (e) {
					throw e
				}
				if (code) {
					if (path.endsWith('.js')) {
						ctx.response.type = "application/javascript; charset=utf-8";
					}
					ctx.body = code;
					if (this.config.maxage) {
						if (this.config.immutable) {
							ctx.set('Cache-Control', 'max-age=' + (this.config.maxage / 1000) + ",immutable");
						} else {
							ctx.set('Cache-Control', 'max-age=' + (this.config.maxage / 1000));
						}
					}
					return file;
				}
			}
		}
		try {
			await send(ctx, path, this.config);
		} catch (err) {
			if (err.status !== 404) {
				throw err;
			}
		}
	}

	/**
	 * 执行静态文件处理
	 * @method run
	 * @param {Object} ctx http请求上下文
	 * @param {Function} next 跳过当前执行，先执行后面函数
	 * @return {Boolean} 是否执行成功
	 */
	async function run(ctx, next) {
		await next();
		if (ctx.method !== 'HEAD' && ctx.method !== 'GET')
			return;
		// response is already handled
		if (ctx.body != null || ctx.status !== 404)
			return; // eslint-disable-line
		try {
			await send(ctx, ctx.path, this.config);
		} catch (err) {
			if (err.status !== 404) {
				throw err;
			}
		}
	};

	if (es6_to_amd) {
		$.push(this.es6_to_amd, es6_to_amd);
	}
	if (this.es6_to_amd.files.length > 0) {
		return main;
	} else {
		return run;
	}
}

/**
 * 用于处理静态文件
 * @module statics
 */
module.exports = statics;
