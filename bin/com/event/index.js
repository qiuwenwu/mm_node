const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * Event事件类
 * @extends {Index}
 * @class
 */
class Event extends Index {
	/**
	 * 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "event";
		this.title = title;

		/* ===  验证  === */
		// 验证前
		this.list_before = [];
		// 验证
		this.list_check = [];
		// 执行
		this.list_main = [];
		// 渲染
		this.list_render = [];
		// 渲染后
		this.list_after = [];
	}
}

/**
 * 清除事件
 * @param {String} stage 阶段
 */
Event.prototype.clear = function(stage) {
	if (stage) {
		if (this[stage]) {
			this[stage] = [];
		} else {
			$.log.debug('清空失败，事件发展阶段{0}不存在！'.replace("{0}", stage));
		}
	} else {
		this.list_before = [];
		this.list_check = [];
		this.list_main = [];
		this.list_render = [];
		this.list_after = [];
	}
};

/**
 * 加载事件
 * @param {String} path 加载的路径
 */
Event.prototype.load = function(path) {
	if (!path) {
		path = '/app/';
	}
	// 获取所有应用路径
	var search_dir;
	if (this.scope) {
		search_dir = 'event_' + this.scope;
	} else {
		search_dir = "event";
	}
	var list_scope = $.dir.getAll(path, search_dir);

	// 遍历目录路径
	var _this = this;
	list_scope.map(function(f) {
		// 获取所有api配置文件
		var list_file = $.file.getAll(f, "*event.json");
		// 遍历文件路径
		list_file.map(function(file) {
			var dir = file.dirname();
			// 载入文件
			var obj = file.loadJson(dir);
			if (obj) {
				if (obj.constructor == Array) {
					obj.map(function(o) {
						var key = 'list_' + o.stage;
						var list = _this[key];
						if (list) {
							// 实例化一个驱动
							var d = new Drive(dir);
							d.loadObj(o);
							d.filename = file;
							list.push(d);
						}
					});
				} else {
					var key = 'list_' + obj.stage;
					var list = _this[key];
					if (list) {
						var drive = new Drive(dir);
						drive.loadObj(obj);
						drive.filename = file;
						list.push(drive);
					}
				}
			} else {
				var drive = new Drive(dir);
				drive.load(file);
			}
		});
	});
};
/**
 * 事件排序
 * @param {String} list 列表
 */
Event.prototype.sort_sub = function(list) {
	list.sort(function(o1, o2) {
		return o1.config.sort - o2.config.sort;
	});
};

/**
 * 事件排序
 * @param {String} stage 阶段
 */
Event.prototype.sort = function(stage) {
	if (stage) {
		if (this[stage]) {
			this[stage] = [];
		} else {
			$.log.debug('清空失败，事件发展阶段{0}不存在！'.replace("{0}", stage));
		}
	} else {
		this.sort_sub(this.list_before);
		this.sort_sub(this.list_check);
		this.sort_sub(this.list_main);
		this.sort_sub(this.list_render);
		this.sort_sub(this.list_after);
	}
};

/**
 * 执行函数
 * @param {Array} list 列表
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.run_sub = async function(list, target, ctx, db) {
	for (var i = 0, o; o = list[i++];) {
		if (o.onOff && target.has(o.config.target)) {
			var ret = await o.run(ctx, db);
			if (ret) {
				db.ret = ret;
				if (o.config.end) {
					break;
				}
			}
		}
	}
	return db.ret;
};

/**
 * 之前
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.before = async function(target, ctx, db) {
	return await this.run_sub(this.list_before, target, ctx, db);
};

/**
 * 验证
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.check = async function(target, ctx, db) {
	return await this.run_sub(this.list_check, target, ctx, db);
};


/**
 * 主要
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.main = async function(target, ctx, db) {
	return await this.run_sub(this.list_main, target, ctx, db);
};

/**
 * 渲染
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.render = async function(target, ctx, db) {
	return await this.run_sub(this.list_render, target, ctx, db);
};

/**
 * 之后
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.after = async function(target, ctx, db) {
	return await this.run_sub(this.list_after, target, ctx, db);
};

/**
 * 执行事件
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.run = async function(target, ctx, db) {
	if (!db) {
		db = {
			ret: null
		};
	}
	var ret = await this.before(target, ctx, db);
	if (!ret) {
		ret = await this.check(target, ctx, db);
		if (!ret) {
			ret = await this.main(target, ctx, db);
		}
		ret = await this.render(target, ctx, db);
		if (ret) {
			ret = await this.after(target, ctx, db);
		}
	}
	return ret;
};

/**
 * @module 导出Event类
 */
exports.Event = Event;

/**
 * Event事件池
 */
if (!$.pool.event) {
	$.pool.event = {};
}

/**
 * Event管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function event_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.event[scope];
	if (!obj) {
		$.pool.event[scope] = new Event(scope, title);
		obj = $.pool.event[scope];
	}
	return obj;
}

/**
 * @module 导出Event管理器
 */
exports.event_admin = event_admin;
