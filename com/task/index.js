const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

if ($.timer) {
	$.timer.add({
		/**
		 * @description 缓存
		 */
		name: "task_timer",
		/**
		 * 执行函数
		 */
		async run() {
			for (var k in $.pool.task) {
				$.pool.task[k].run();
			}
		}
	});
	$.timer.start();
}

/**
 * @description 任务类
 * @extends {Index}
 * @class
 */
class Task extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "task";
		
		/// 执行Task
		Task.prototype.run = async function() {
			var lt = this.list;
			for (var i = 0; i < lt.length; i++) {
				var o = lt[i];
				o.run();
			}
		};
	}
}

exports.Task = Task;


/**
 * @description Task模板池
 */
if (!$.pool.task) {
	$.pool.task = {};
}

/**
 * @description Task管理器,用于创建缓存
 * @task {String} scope 作用域
 * @return {Object} 返回一个缓存类
 */
function task_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.task[scope];
	if (!obj) {
		$.pool.task[scope] = new Task(scope);
		obj = $.pool.task[scope];
	}
	return obj;
}
/**
 * @module 导出Task管理器
 */
exports.task_admin = task_admin;
