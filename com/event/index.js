const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * @description Event事件类
 * @extends {Index}
 * @class
 */
class Event extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "event";

		/* ===  验证  === */
		/// 验证前
		this.check_before = [];
		/// 验证主
		this.check_main = [];
		/// 验证后
		this.check_after = [];
		/* ===  执行  === */
		// 行动前
		this.action_before = [];
		// 行动主
		this.action_main = [];
		// 行动后
		this.action_after = [];
		/* ===  渲染  === */
		// 渲染前
		this.render_before = [];
		// 渲染主
		this.render_main = [];
		// 渲染后
		this.render_after = [];
	}
}

/**
 * @description 清除事件
 * @param {String} situation 事态
 */
Event.prototype.clear = function(situation) {
	if (situation) {
		if (this[situation]) {
			this[situation] = [];
		} else {
			console.log('清空失败，事态{0}不存在！'.replace('{0}', situation));
		}
	} else {
		/// 验证前
		this.check_before = [];
		this.check_main = [];
		this.check_after = [];
		/* ===  执行  === */
		this.action_before = [];
		this.action_main = [];
		this.action_after = [];
		/* ===  渲染  === */
		this.render_before = [];
		this.render_main = [];
		this.render_after = [];
	}
};

/**
 * @description 加载事件
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
						var key = o.stage + '_' + o.tense;
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
					var key = obj.stage + '_' + obj.tense;
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
 * @description 事件排序
 * @param {String} situation 事态
 */
Event.prototype.sort_sub = function(list) {
	list.sort(function(o1, o2) {
		return o1.config.sort - o2.config.sort;
	});
};

/**
 * @description 事件排序
 * @param {String} situation 事态
 */
Event.prototype.sort = function(situation) {
	if (situation) {
		if (this[situation]) {
			this.sort_sub(this[situation]);
		} else {
			console.log('排序失败，事态{0}不存在！'.replace('{0}', situation));
		}
	} else {
		/// 验证前
		this.sort_sub(this.check_before);
		this.sort_sub(this.check_main);
		this.sort_sub(this.check_after);
		/* ===  执行  === */
		this.sort_sub(this.action_before);
		this.sort_sub(this.action_main);
		this.sort_sub(this.action_after);
		/* ===  渲染  === */
		this.sort_sub(this.render_before);
		this.sort_sub(this.render_main);
		this.sort_sub(this.render_after);
	}
};

/**
 * @description 执行函数
 * @param {Array} list 列表
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.exec_sub = async function(list, target, ctx, db) {
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
 * @description 执行阶段
 * @param {String} stage 阶段
 * @param {String} target 目标
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Event.prototype.exec = async function(stage, target, ctx, db) {
	this.exec_sub(this[stage + '_before'], target, ctx, db);
	var ret = await this.exec_sub(this[stage + '_main'], target, ctx, db);
	this.exec_sub(this[stage + '_after'], target, ctx, db);
	return ret;
};

/**
 * @description 执行事件
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
	var ret = await this.exec('check', target, ctx, db);
	if (!ret) {
		ret = await this.exec('action', target, ctx, db);
	}
	ret = await this.exec('render', target, ctx, db);
	return ret;
};

/**
 * @module 导出Event类
 */
exports.Event = Event;

/**
 * @description Event事件池
 */
if (!$.pool.event) {
	$.pool.event = {};
}

/**
 * @description Event管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {String} dir 当前路径
 * @return {Object} 返回一个缓存类
 */
function event_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.event[scope];
	if (!obj) {
		$.pool.event[scope] = new Event(scope);
		obj = $.pool.event[scope];
	}
	return obj;
}

/**
 * @module 导出Event管理器
 */
exports.event_admin = event_admin;
