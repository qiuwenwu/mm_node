const Item = require('mm_machine').Item;

/**
 * @description Task任务驱动类
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
			"func_name": "main",
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

		/**
		 * @description 设置时期执行
		 * @param {Function} func 回调函数
		 */
		Drive.prototype.setPeriod = function(func) {
			var _this = this;
			var cg = this.config;
			var fn;
			if (cg.time) {
				if (cg.time.indexOf(' ') !== -1) {
					if (cg.time.indexOf('-') !== -1) {
						fn = function() {
							if (new Date().toStr('MM-dd hh:mm:ss') == cg.time) {
								func();
							}
						};
					} else {
						fn = function() {
							if (new Date().toStr('dd hh:mm:ss') == cg.time) {
								func();
							}
						};
					}
				}
				var arr = cg.time.split(':');
				if (arr.length == 3) {
					fn = function() {
						if (new Date().toStr('hh:mm:ss') == cg.time) {
							func();
						}
					};
				} else if (arr.length == 2) {
					fn = function() {
						if (new Date().toStr('hh:mm') == cg.time) {
							func();
						}
					};
				} else {
					fn = function() {
						if (new Date().toStr('mm') == cg.time) {
							func();
						}
					};
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
		Drive.prototype.setNum = function(func) {
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
		 * @description 加载配置对象
		 * @param {Object} obj 配置对象
		 */
		Drive.prototype.loadObj = function(obj) {
			$.push(this.config, obj);
			var f = this.config.func_file;
			if (f) {
				var file = f.fullname(this.dir);
				if (file.hasFile()) {
					var cs = require(file);
					if (cs) {
						var name = this.config.func_name;
						if (name) {
							this.main = cs[name];
						} else {
							$.push(this, cs);
						}
					}
				} else {
					var fl = __dirname + "/script.js";
					fl.copyFile(file);
				}
			}
		};

		/**
		 * @description 加载配置文件
		 * @param {String} file 文件路径
		 * @return {Object} 配置对象
		 */
		Drive.prototype.loadFile = function(file) {
			var obj;
			var f = file.fullname(this.dir);
			var text = f.loadText();
			if (text) {
				obj = text.toJson();
			} else {
				var fl = __dirname + "/config.tpl.json";
				fl.copyFile(f);
			}
			this.filename = f;
			return obj;
		};

		/**
		 * @description 载入配置
		 * @param {Object|String} cg 配置对象或配置路径
		 */
		Drive.prototype.load = function(cg) {
			var obj;
			if (!cg) {
				cg = "./task.json";
			}
			if (typeof(cg) === "string") {
				obj = this.loadFile(cg);
			} else {
				obj = cg;
			}
			this.loadObj(obj);
		};

		/// 配置对象或配置路径
		Drive.prototype.run = function() {
			if (this.state === 'start') {
				this.setPeriod(this.setNum(this.main));
			}
		};

		/**
		 * @description 开关计时器 改变状态
		 * @param {String} state = [start|stop|end] 状态, 如果什么都不传则切换开始或暂停
		 */
		Drive.prototype.set_state = function(state) {
			if (state) {
				if (state === 'end') {
					this.num = 0;
				}
				this.state = state;
			} else if (this.state === 'stop') {
				this.state = 'start';
			} else if (this.state === 'start') {
				this.state = 'stop';
			}
		};

		/**
		 * @description 定时执行函数
		 */
		Drive.prototype.main = function() {
			console.log('空的定时任务')
		};
	}
}

exports.Drive = Drive;
