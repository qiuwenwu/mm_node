const Item = require('mm_machine').Item;

function span(t1, t2) {
	return t1 - t2
}

/**
 * Task任务驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * 构造函数
	 * @param {String} dir 当前目录
	 * @constructor
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./task.json";

		/* 通用项 */
		/**
		 * 配置参数
		 */
		this.config = {
			// 标题, 介绍事件作用
			"title": "示例事件",
			// 描述, 用于描述该事件有什么用的
			"description": "描述事件使用方法",
			// 名称, 由中英文和下“_”组成, 用于卸载事件
			"name": "demo",
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "./index.js",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": "",
			// 执行次数
			"num": 10,
			// 时间间隔（毫秒ms）
			"interval": 1000,
			// 等待时长（毫秒ms）
			"wait": 0,
			// 执行时间
			"time": "",
			// 执行开始日期
			"date_start": "",
			// 执行结束日期
			"date_end": "",
			// 执行顺序
			"sort": 100,
		};
		// 当前状态 
		this.state = "end";
		
		// 当前执行次数
		this.num = 0;
		
		// 任务管理器
		this.task_adminr = {};
	}
}

/**
 * 设置时期执行
 * @param {Object} _this 当前类
 * @param {Function} func 回调函数
 */
Drive.prototype.setPeriod = function(_this, func) {
	var cg = _this.config;
	var fn;
	var time = cg.time;
	if (time) {
		if (time.indexOf(' ') !== -1) {
			if (time.indexOf('-') !== -1) {
				fn = function() {
					if (new Date().toStr('MM-dd hh:mm:ss') === time) {
						func();
					}
				};
			} else {
				fn = function() {
					if (new Date().toStr('dd hh:mm:ss') === time) {
						func();
					}
				};
			}
		}
		else {
			var arr = time.split(':');
			if (arr.length === 3) {
				fn = function() {
					if (new Date().toStr('hh:mm:ss') === time) {
						func();
					}
				};
			} else if (arr.length === 2) {
				fn = function() {
					if (new Date().toStr('hh:mm') === time) {
						func();
					}
				};
			} else {
				fn = function() {
					if (new Date().toStr('mm') === time) {
						func();
					}
				};
			}
		}
		
	} else {
		fn = func;
	}
	
	if (cg.date_start) {
		var start = toTime(cg.date_start);
		if (cg.date_end) {
			var end = toTime(cg.date_end);
			return async function() {
				var now = new Date();
				if (span(now, end) >= 0) {
					if (span(now, start) <= 0) {
						fn();
					}
				} else {
					_this.clear();
					_this.notify(cg.name, 'time end');
				}
			};
		} else {
			return async function() {
				var now = new Date();
				if (span(now, start) <= 0) {
					fn();
				}
			};
		}
	} else if (cg.date_end) {
		var end = toTime(cg.date_end);
		return async function() {
			var now = new Date();
			if (span(now, end) >= 0) {
				fn();
			} else {
				_this.clear();
				_this.notify(cg.name, 'end time');
			}
		};
	} else {
		return async function() { fn() };
	}
};

/**
 * 设置按次数执行
 * @param {Object} _this 当前类
 */
Drive.prototype.setNum = function(_this) {
	var cg = _this.config;
	return function() {
		if (cg.num < 1) {
			_this.main();
		} else if (_this.num < cg.num) {
			_this.num++;
			_this.main();
		} else {
			_this.clear();
			_this.notify(cg.name, 'completed');
		}
	};
};

/**
 * 删除任务
 * @param {String} name
 */
Drive.prototype.del = async function(name) {
	this.task_adminr.del(name);
};

/**
 * 执行结果通知
 * @param {String} name 任务名称
 * @param {String} message 提示内容
 */
Drive.prototype.notify = async function(name, message) {
	switch (message) {
		case "start":
			// $.log.debug(name + '任务已开启');
			break;
		case "stop":
			// $.log.debug(name + '已暂停');
			break;
		case "end":
			// 主动中断
			// $.log.debug(name + '已结束');
			break;
		case "end time":
			// $.log.debug(name + '时间到');
			// 删除任务
			this.del(name)
			break;
		case "completed":
			// $.log.debug(name + '已完成');
			// 删除任务
			this.del(name)
			break;
		default:
			break;
	}
};


/**
 * 清理函数, 用于删除当前任务
 */
Drive.prototype.clear = async function() {
	this.destroy();
};

/**
 * 配置对象或配置路径
 */
Drive.prototype.run = async function() {
	
};

/**
 * 创建执行函数
 */
Drive.prototype.create = function(){
	var _this = this;
	setTimeout(function(){
		_this.run = _this.setPeriod(_this, _this.setNum(_this));
	}, this.config.wait * 1000);
};

/**
 * 销毁执行函数
 */
Drive.prototype.destroy = function() {
	this.run = async function() {};
};

/**
 * 开关计时器 改变状态
 * @param {String} state = [start|stop|end] 状态, 如果什么都不传则切换开始或暂停
 */
Drive.prototype.set_state = function(state) {
	if (state) {
		this.state = state;
		if (state === 'end') {
			this.num = 0;
			this.destroy();
		} else if (this.state === 'stop') {
			this.destroy();
		}
		else {
			this.create();
		}
	} else if (this.state === 'start') {
		this.state = 'stop';
		this.destroy();
	} else if (this.state === 'stop' || this.state === 'end') {
		this.state = 'start';
		this.create();
	}
	
	this.notify(this.config.name, this.state);
};

/**
 * 定时执行函数
 */
Drive.prototype.main = async function() {
	$.log.debug('定时任务, 执行中...')
};



/**
 * 加载完成时, 设置为开始执行
 */
Drive.prototype.load_after = function() {
	this.set_state();
}

module.exports = Drive;
