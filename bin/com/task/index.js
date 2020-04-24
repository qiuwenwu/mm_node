const Index = require('mm_machine').Index;
const Drive = require('./drive');

if ($.timer) {
	$.timer.add({
		/**
		 * 缓存
		 */
		name: "task_timer",
		/**
		 * 执行函数
		 */
		async run() {
			var dt = $.pool.task;
			for (var k in dt) {
				dt[k].run();
			}
		}
	});
}

/**
 * 任务类
 * @extends {Index}
 * @class
 */
class Task extends Index {
	/**
	 * 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "task";
		this.title = title;
	}
}

/**
 * 执行任务
 */
Task.prototype.run = async function() {
	var lt = this.list;
	for (var i = 0, o; o = lt[i++];) {
		o.run();
	}
};

/**
 * 加载项
 * @param {String} dir 文件路径
 * @param {Object} cg 配置参数
 * @param {String} file 配置文件
 */
Task.prototype.load_item = function(dir, cg, file) {
	var drive = new this.Drive(dir);
	drive.loadObj(cg);
	drive.filename = file;
	drive.task_adminr = this;
	this.list.push(drive);
};

/**
 * 加载列表
 * @param {Array} list 文件列表
 */
Task.prototype.load_list = function(list) {
	var _this = this;
	// 遍历文件路径
	list.map(function(file) {
		var dir = file.dirname();
		// 载入文件
		var obj = file.loadJson(dir);
		if (obj) {
			if (obj.constructor == Array) {
				obj.map(function(o) {
					// 实例化一个驱动
					_this.load_item(dir, o, file);
				});
			} else {
				_this.load_item(dir, obj, file);
			}
		} else {
			var fl = _this.dir_base + "/config.tpl.json";
			if (fl.hasFile()) {
				fl.copyFile(file);
			}
		}
	});
};

exports.Task = Task;

/**
 * Task模板池
 */
if (!$.pool.task) {
	$.pool.task = {};
}

/**
 * Task管理器,用于创建缓存
 * @task {String} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function task_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.task[scope];
	if (!obj) {
		$.pool.task[scope] = new Task(scope, title);
		obj = $.pool.task[scope];
	}
	return obj;
}

/**
 * @module 导出Task管理器
 */
exports.task_admin = task_admin;
