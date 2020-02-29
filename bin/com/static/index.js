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
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "static";
		this.title = title;
		var $this = this;

		/**
		 * @description 执行静态文件处理了
		 * @param {Object} ctx Http请求上下文
		 * @param {Object} next 跳过函数
		 */
		this.run = async function(ctx, next) {
			var done;
			var md = ctx.method;
			var path = ctx.path;
			if (md === 'GET' || md === 'HEAD') {
				var list = $this.list;
				var len = list.length;
				if (path.indexOf('.') !== -1) {
					for (var i = 0; i < len; i++) {
						var o = list[i];
						var p = o.config.path;
						done = await o.run(ctx, path, next);
						if (done) {
							break;
						}
					}
					await next();
				} else {
					await next();
					var q = ctx.request.querystring;
					for (var i = 0; i < len; i++) {
						var o = list[i];
						var p = o.config.path;
						if (path === p) {
							done = ' ';
							if (ctx.status === 404) {
								if (q) {
									ctx.redirect(p + '/?' + q);
								} else {
									ctx.redirect(p + '/');
								}
							}
							break;
						}
						else {
							done = await o.run(ctx, path, next);
							if (done) {
								break;
							}
						}
					}
					return
				}
			}
			else {
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
