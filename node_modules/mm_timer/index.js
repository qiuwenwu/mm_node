/**
 * @fileOverview 定时器类（用于定时执行程序）
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
require('mm_expand');
/// 延迟
/// milliSeconds: 毫秒 (number)
function sleep(milliSeconds) {
	var endTime = new Date().getTime() + milliSeconds;
	while (new Date().getTime() < endTime) {}
}

/// 计算时间差
/// startTime: 开始时间 (Date)
/// endTime: 结束时间 (string)
/// time_unit: 时间单位, day天、hours小时、minutes分钟. (string)
/// 返回: 间隔时长 (number)
function span(startTime, endTime) {
	var stime = Date.parse(startTime);
	var etime = Date.parse(endTime);
	return etime - stime;
};

/// 转为时间
/// timeStr: 时间字符串 (string)
/// 返回: 时间(Date)
function toTime(timeStr) {
	var str = timeStr.replace('T', ' ').replace('Z', '').replaceAll('.', '/').replaceAll('-', '/');
	return new Date(str);
};

/// 定时器类函数
/// config: 配置参数 (object)
class Timer {
	constructor(config) {
		/// 配置参数
		this.config = {
			/// 定时器名称
			name: "mm",
			// 执行次数
			num: 10,
			// 时间间隔（毫秒ms）
			interval: 1000,
			// 等待时长（毫秒ms）
			wait: 0,
			// 执行时间
			time: "",
			// 执行开始日期
			date_start: "",
			// 执行结束日期
			date_end: ""
		};
		if (config) {
			$.push(this.config, config);
		}
		/// 等候器
		this.timeout;
		/// 定时执行器
		this.interval;
		/// 已执行次数
		this.num = 0;

	}
}

/**
 * @description 设置等待执行
 * @param {Function} func 回调函数
 */
Timer.prototype.setTimeout = function(func) {
	if (!func) {
		func = function() {};
	}
	this.timeout = setTimeout(func, this.config.wait);
};

/**
 * @description 设置间隔执行
 * @param {Function} func 回调函数
 */
Timer.prototype.setInterval = async function(func) {
	if (!func) {
		func = function() {};
	}
	sleep(this.config.wait);
	this.interval = setInterval(func, this.config.interval);
};

/**
 * @description 设置时期执行
 * @param {Function} func 回调函数
 */
Timer.prototype.setPeriod = function(func) {
	var _this = this;
	var cg = this.config;
	var fn;
	var time = time;
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
			if (arr.length == 3) {
				fn = function() {
					if (new Date().toStr('hh:mm:ss') === time) {
						func();
					}
				};
			} else if (arr.length == 2) {
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
			return function() {
				var now = new Date();
				if (span(now, end) >= 0) {
					if (span(now, start) <= 0) {
						fn();
					}
				} else {
					_this.clear();
					_this.notify(_this.config.name, 'time end');
				}
			};
		} else {
			return function() {
				var now = new Date();
				if (span(now, start) <= 0) {
					fn();
				}
			};
		}
	} else if (cg.date_end) {
		var end = toTime(cg.date_end);
		return function() {
			var now = new Date();
			if (span(now, end) >= 0) {
				fn();
			} else {
				_this.clear();
				_this.notify(_this.config.name, 'time end');
			}
		};
	} else {
		return fn;
	}
};

/**
 * @description 设置按次数执行
 * @param {Function} func 回调函数
 */
Timer.prototype.setNum = function(func) {
	var _this = this;
	return function() {
		if (_this.config.num < 1) {
			func();
		} else if (_this.num < _this.config.num) {
			_this.num += 1;
			func();
		} else {
			_this.clear();
			_this.notify(_this.config.name, 'complete');
		}
	};
};

/**
 * @description 结束定时器
 */
Timer.prototype.end = function() {
	if (this.interval) {
		clearInterval(this.interval);
	}
	if (this.timeout) {
		clearTimeout(this.timeout);
	}
};

/**
 * @description 清除定时器
 * @param {Number} millisecond 时间间隔, 单位: 毫秒
 */
Timer.prototype.clear = function(millisecond) {
	if (millisecond) {
		var _this = this;
		setTimeout(function() {
			_this.end();
		}, millisecond);
	} else {
		this.end();
	}
};

/**
 * @description 执行线程
 * @param {Function} func 回调函数
 * @return {Object} 当前类
 */
Timer.prototype.run = async function(func) {
	await this.setInterval(this.setPeriod(this.setNum(func)));
	return this;
};

/**
 * @description 通知函数, 当定时器执行完最后一次时, 会调用通知函数
 * @param {String} name 名称
 * @param {String} why 结束的原因
 */
Timer.prototype.notify = function(name, why) {
	console.log('定时器:' + name + "已结束运行。\n原因时:" + why);
};

/**
 * @description 销毁资源
 */
Timer.prototype.dispose = function() {
	this.clear();
	this.interval = undefined;
	this.timeout = undefined;
};

if (global.$) {
	$.Timer = Timer;
}

module.exports = Timer;
