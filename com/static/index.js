const Index = require('mm_machine').Index;

const Drive = require('./drive');
const {
	resolve,
	join
} = require('path');

/**
 * @description 静态文件管理类
 * @extends {Index}
 * @class
 */
class Static extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "static";

		var $this = this;

		/**
		 * @description 执行静态文件处理了
		 * @param {Object} ctx Http请求上下文
		 * @param {Object} next 跳过函数
		 */
		Static.prototype.run = async function(ctx, next) {
			const md = ctx.method;
			if (md === 'HEAD' || md === 'GET') {
				var path = ctx.request.path;
				var q = ctx.request.querystring;
				var list = $this.list;
				var len = list.length;
				for (var i = 0; i < len; i++) {
					var o = list[i];
					var p = o.config.path;
					if (path === p) {
						await next();
						done = ' ';
						if (ctx.status === 404) {
							if (q) {
								ctx.redirect(p + '/?' + q);
							} else {
								ctx.redirect(p + '/');
							}
						}
						break;
					} else {
						var done = await o.run(ctx, path, next);
						if (done) {
							break;
						}
					}
				}
			}
			if (!done) {
				await next();
			}
		};
	}
}

/**
 * @description 获取静态对象
 * @param {Object} dir 目录
 * @return {Drive} 静态文件驱动类
 */
Static.prototype.getObj = function(dir) {
	var d = join(dir).replace($.runPath, '');
	var app = d.between(join('app/'), join('/'));
	var plugin = d.between(join('/plugin/'), join('/'));
	var path = '/' + app;
	if (plugin) {
		path += '/' + plugin;
	}
	var obj = {
		app: app,
		plugin: plugin,
		root: d.substring(0, d.length - 1),
		path: path
	};
	return new Drive(dir, obj);
};

/**
 * @description 加载接口
 * @param {String} path 加载的路径
 */
Static.prototype.load = function(path) {
	if (!path) {
		path = '/app/';
	}
	// 获取所有应用路径
	var search_dir = "static";
	var list_scope = $.dir.getAll(path, search_dir);
	// 遍历目录路径
	var _this = this;
	list_scope.map(function(o) {
		var obj = _this.getObj(o);
		_this.list.push(obj);
	});
};

/**
 * 排序
 */
Static.prototype.sort = function() {
	this.list.sort(function(o1, o2) {
		var p1 = o1.config.path;
		var p2 = o2.config.path;
		return p2.length - p1.length;
	});
};

exports.Static = Static;
