const Item = require('mm_machine').Item;

/**
 * @description Catch抓包驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * @description 构造函数
	 * @param {String} dir 当前目录
	 * @constructor
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./nav.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			"name": "admin",
			// 加载顺序，数字越大越后面加载
			"sort": 1,
			// 路由
			"routes": [
				/*
				{
					// 名称
					"name": "root",
					// 路由路径
					"path": "/",
					// 组件文件路径
					"component": "",
					// 页面显示级别
					"level": "",
					// 身份验证
					"oauth": {
						// 是否登录
						"signIn": false,
						// 要求会员级别
						"vip": 0,
						// 要求管理级别
						"gm": 0,
						// 要求商户级别
						"mc": 0,
						// 要求用户组
						"user_group": [],
						// 要求管理组
						"user_admin": []
					}
				}
				*/
			],
			// 顶部导航
			"top": [],
			// 左侧导航
			"left": [],
			// 底部导航
			"bottom": [],
			// 右侧导航
			"right": [],
			// 桌面导航
			"desktop": [],
			// 快捷导航
			"quick": [],
			// 主导航
			"main": [
				/*
					{
						// 标题
						"title": "",
						// 路径
						"url": "",
						// 在没有权限下是否显示
						"show": false,
						// 显示顺序
						"display": 3,
						// 子导航
						"sub": [
							{
								// 标题
								"title": "",
								// 路径
								"url": "",
								// 在没有权限下是否显示
								"show": false
							}
						]
					}
				*/
			]
		}
	}
};

/**
 * @description 调用函数
 * @param {Object} type
 * @return {Object} 执行结果
 */
Drive.prototype.run = function(type) {
	var cg = {
		routes: this.config.routes
	}
	cg[type] = this.config[type];
	return cg
};


/**
 * 合并项
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object|String}
 */
Drive.prototype.merge_sub = function(arr, lt) {
	if (lt) {
		for (let i = 0, o; o = lt[i++];) {
			if (o.name) {
				var item = arr.getMatch(o.name, 'name');
				if (item) {
					$.push(item, o, true);
				} else {
					arr.push(o);
				}
			}
		}
	}
};

/**
 * 执行导航
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object|String}
 */
Drive.prototype.sort = async function() {
	var cg = this.config;
	cg.top.sortBy('asc', 'display');
	cg.left.sortBy('asc', 'display');
	cg.bottom.sortBy('asc', 'display');
	cg.right.sortBy('asc', 'display');
	cg.desktop.sortBy('asc', 'display');
	cg.quick.sortBy('asc', 'display');
	cg.main.sortBy('asc', 'display');
};

/**
 * @param 合并配置
 * @param {Object} o 配置
 */
Drive.prototype.merge = function(o) {
	var cg = this.config;
	this.merge_sub(cg.routes, o.routes);
	this.merge_sub(cg.top, o.top);
	this.merge_sub(cg.left, o.left);
	this.merge_sub(cg.bottom, o.bottom);
	this.merge_sub(cg.right, o.right);
	this.merge_sub(cg.desktop, o.desktop);
	this.merge_sub(cg.quick, o.quick);
	this.merge_sub(cg.main, o.main);
};

/**
 * @description 新建导航
 * @param {String} app 应用名
 * @param {String} name 插件名
 * @param {String} gm 是否管理员
 */
Drive.prototype.new_nav = function(title, name, url) {
	var obj = {
		"title": title,
		// 在没有权限下是否显示
		"show": false,
		"name": name,
		"url": url
	};
	return obj;
};

/**
 * @description 新建路由
 * @param {String} app 应用名
 * @param {String} plugin 插件名
 * @param {String} name 接口名
 * @param {String} gm 是否管理员
 * @param {Object} oauth 身份验证
 */
Drive.prototype.new_routes = function(app, plugin, name, group, oauth) {
	var pn = plugin === 'pc' ? '' : plugin;
	var n = name.replace(app + "_", '');
	var obj = {
		"name": plugin,
		"path": "/" + app + "/" + n,
		"component": "/" + app + "/" + pn + "/src/pages/" + n + ".vue",
		"level": n.replace("_edit", '').replace("_view", '').indexOf('_') === -1 ? 3 : 2,
		"oauth": oauth
	};
	if (!oauth) {
		if (!group) {
			// 不验证身份
			obj.oauth = {
				"signIn": false
			};
		} else if (group === 1) {
			// 验证身份为管理员
			obj.oauth = {
				"signIn": true,
				"gm": 2,
				"user_admin": []
			};
		} else {
			// 验证身份为商户
			obj.oauth = {
				"signIn": true,
				"mc": 1,
				"user_group": []
			}
		}
	}
	return obj;
};

/**
 * @description 新建配置
 * @param {String} file
 */
Drive.prototype.new_config = function(file) {
	// var fl = this.dir_base + "/config.tpl.json";
	// fl.copyFile(file);
	var cg = this.config;
	var plugin = (file + '').right('plugin' + $.slash).left($.slash, true);
	var dir = (file + '').left(plugin) + "api" + $.slash;
	var _this = this;

	var app = (file + '').right('app' + $.slash).left($.slash, true);
	var nav = [];

	if (plugin.indexOf('admin') !== -1) {
		var d = dir + 'api_manage';
		if (d.hasDir()) {
			var list = $.file.getAll(d, '*api.json');

			list.map(function(f) {
				var o = f.loadJson();
				if (o) {
					delete o.oauth.scope;
					var name = o.name.trim('2');
					// 添加一个列表页
					var obj = _this.new_routes(app, plugin, name, 1, o.oauth);

					//添加一个详情页
					var obj2 = _this.new_routes(app, plugin, name + '_edit', 1, o.oauth);
					obj2.level += 1;

					cg.routes.push(obj);
					cg.routes.push(obj2);

					nav.push(_this.new_nav(o.title, name, obj.path));
				}
			});
		}
	} else {
		var d = dir + 'api_client';
		if (d.hasDir()) {
			var list = $.file.getAll(d, '*api.json');

			list.map(function(f) {
				var o = f.loadJson();
				if (o) {
					delete o.oauth.scope;

					var name = o.name;
					// 添加一个列表页
					var obj = _this.new_routes(app, plugin, name, 0, o.oauth);

					//添加一个详情页
					var obj2 = _this.new_routes(app, plugin, name + '_view', 0, o.oauth);
					obj2.level += 1;

					if (name.indexOf('_') === -1) {
						obj.level += 1;
						obj2.level += 1;
					}
					cg.routes.push(obj);
					cg.routes.push(obj2);

					nav.push(_this.new_nav(o.title, name, obj.path));
					nav.push(_this.new_nav(o.title, name + '_view', obj2.path));
				}
			});
		}
	}
	cg.name = plugin;
	var title = "未命名";
	var app_config = (file + '').left('plugin') + 'app.json';
	if (app_config.hasFile()) {
		var oj = app_config.loadJson();
		title = oj.title;
	}
	if (cg.routes.length > 0) {
		cg.routes.splice(0, 0, {
			name: app,
			path: "/" + app,
			redirect: cg.routes[0].path
		});
	}

	cg.main = [{
		"title": title,
		"name": app,
		"url": "/" + app,
		"display": 0,
		"sub": nav
	}];
	file.saveText($.toJson(cg, true));
};

/**
 * @description 载入配置
 * @param {Object|String} cg 配置对象或配置路径
 */
Drive.prototype.load = function(cg) {
	var obj;
	if (!cg) {
		cg = this.extensions;
	}
	if (typeof(cg) === "string") {
		obj = this.loadFile(cg);
	} else {
		obj = cg;
	}
	this.loadObj(obj);
};

module.exports = Drive;
