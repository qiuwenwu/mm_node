const fs = require('fs');
const Item = require('mm_machine').Item;
const tpl = new $.Tpl('nav_tpl');
tpl.dir = __dirname;

/**
 * Catch抓包驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * 构造函数
	 * @param {String} dir 当前目录
	 * @param {String} scope 作用域
	 * @constructor
	 */
	constructor(dir, scope) {
		super(dir, __dirname);
		this.default_file = "./" + scope + ".nav.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			"name": "",
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
 * 调用函数
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
		var len = lt.length;
		for (var i = 0; i < len; i++) {
			var o = lt[i];
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
	cg.name = o.name;
	cg.sort = o.sort;
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
 * 新建导航
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
 * 新建路由
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
		"name": name,
		"path": "/" + app + "/" + n,
		"component": "/" + app + (pn ? "/" + pn : '') + "/src/pages/" + n + ".vue",
		"level": n.replace("_form", '').replace("_view", '').indexOf('_') === -1 ? 3 : 2,
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
 * 新建配置
 * @param {String} file
 */
Drive.prototype.new_config = function(file) {
	// var fl = this.dir_base + "/config.tpl.json";
	// fl.copyFile(file);
	var cg = this.config;
	var plugin = (file + '').right('plugin' + $.slash).left($.slash, true);
	var dir = (file + '').left(plugin) + "server" + $.slash;
	var _this = this;

	var app = (file + '').right('app' + $.slash).left($.slash, true);
	var nav = [];
	if (plugin.indexOf('admin') !== -1) {
		var d = dir + 'api_manage';
		if (!d.hasDir()) {
			d = dir + `api_${app}_manage`;
		}
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
					var obj2 = _this.new_routes(app, plugin, name + '_form', 1, o.oauth);
					obj2.level += 1;

					cg.routes.push(obj);
					cg.routes.push(obj2);

					nav.push(_this.new_nav(o.title, name, obj.path));
				}
			});
		}
	} else {
		var d = dir + 'api_client';
		if (!d.hasDir()) {
			d = dir + `api_${app}_client`;
		}
		if (d.hasDir()) {
			var list = $.file.getAll(d, '*api.json');

			list.map(function(f) {
				var o = f.loadJson();
				if (o && !Array.isArray(o)) {
					if (o.oauth) {
						delete o.oauth.scope;
					}

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
	file.saveText(JSON.stringify(cg, null, 4));
};

/**
 * 载入配置
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


/**
 * 获取API配置
 * @param {String} app 应用域名
 * @param {Object} route 路由配置
 * @return {Object} 返回api配置
 */
Drive.prototype.get_api = function(app, route) {
	var {
		path,
		component
	} = route;
	var scope = app;
	var api_route = "";
	var p = path.replace('_table', '').replace('_list', '').replace('_view', '').replace('_form', '');
	if (component.indexOf('/admin') !== -1) {
		scope += "_manage";
		api_route = "/apis" + p
	} else {
		scope += "_client";
		api_route = "/api" + p
	}
	var api = $.pool.api[scope];
	// $.log.debug('api', scope, api);
	if (!api) {
		return null;
	}
	var lt = api.list;
	var config = {
		api: {},
		param: {},
		sql: {}
	};
	for (var i = 0; i < lt.length; i++) {
		var o = lt[i];
		if (o.config.path.indexOf(api_route) === 0) {
			config = {
				api: o.config,
				param: o.param.config,
				sql: o.sql.config
			};
			break;
		}
	}
	return config;
	// $.log.debug('api', api_route, config);
};

/**
 * 创建vue文件
 * @param {String} file 文件保存路径
 * @param {Object} route 路由配置
 */
Drive.prototype.create_vue = function(file, route) {
	var l = $.slash;
	var arr = file.split(l);
	var name = arr[arr.length - 1].replace('.vue', '');
	var f = "./tpl/";
	var plugin = "";
	var app = "";
	if (arr.length > 5) {
		plugin = arr[5];
		app = arr[3];
		f += plugin + '/';
	} else if (file.indexOf('mobile' + l) !== -1) {
		f += "mobile/";
	} else if (file.indexOf('admin' + l) !== -1) {
		f += "admin/";
	} else if (file.indexOf('pc' + l) !== -1) {
		f += "pc/";
	}
	if (name.endsWith('_form')) {
		f += 'page_form.vue';
	} else if (name.endsWith('_view')) {
		f += 'page_view.vue';
	} else if (name.endsWith('_table')) {
		f += 'page_table.vue';
	} else if (name.endsWith('_list')) {
		f += 'page_list.vue';
	} else if (name.endsWith('_channel')) {
		f += 'page_channel.vue';
	} else if (name.endsWith('_type')) {
		f += 'page_type.vue';
	} else if (name.endsWith('_nav')) {
		f += 'page_nav.vue';
	} else {
		f += 'page_default.vue';
	}
	f = f.fullname(__dirname);
	var model = {
		id: app + '_' + name,
		name: name,
		app,
		plugin,
		group: arr[arr.length - 2],
		nav_config: this.config,
		route,
		api: {},
		param: {},
		sql: {}
	};
	$.push(model, this.get_api(app, route), true)
	// $.log.debug(file, route);
	$.log.debug('更新vue文件：', model.name);
	// $.log.debug('路径', f, route, model);

	console.log(model.sql.key);
	var vue = tpl.view(f, model);
	// $.log.debug(f, f.hasFile());
	file.saveText(vue);
};

/**
 * @创建路径
 * @param {String} filepath 文件路径
 */
Drive.prototype.mkdir = function(filepath) {
	var l = $.slash;
	var arr = filepath.split(l);
	var dir = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		dir = dir + l + arr[i];
	}
}

/**
 * 更新路由vue文件
 * @param {Boolean} cover 是否覆盖文件
 * @param {String} route_path 路由路径
 */
Drive.prototype.update_vue = async function(route_path, cover) {
	var lt = this.config.routes;
	var dir = '';
	var p = '';
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		var f = o.component;
		if (f) {
			p = f.dirname().replace(/\\/g, '/');
			var fl = f.replace('/', '').replace('/', '\\plugin\\').replace('/', '\\static\\');
			dir = ('./app/' + fl).fullname().dirname();
			break;
		}
	}
	if (route_path) {
		for (var i = 0; i < len; i++) {
			var o = lt[i];
			var f = o.component;
			if (f && o.path.indexOf(route_path) !== -1) {
				var file = f.replace(p, dir).fullname();
				if (cover || !file.hasFile()) {
					this.mkdir(file);
					this.create_vue(file, o);
				}
			}
		}
	} else {
		for (var i = 0; i < len; i++) {
			var o = lt[i];
			var f = o.component;
			if (f) {
				var file = f.replace(p, dir).fullname();
				if (cover || !file.hasFile()) {
					this.mkdir(file);
					this.create_vue(file, o);
				}
			}
		}
	}
};

module.exports = Drive;
