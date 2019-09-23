/**
 * @fileOverview Process进程帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
require('mm_expand');

const {
	join,
	resolve
} = require('path');
const {
	spawn
} = require('child_process');

/**
 * @description Process进程类
 * @class
 */
class Process {
	/**
	 * @description 构造函数
	 * @param {String} dir 运行路径
	 * @constructor
	 */
	constructor(dir) {
		/// 当前目录
		this.dir;
		if (dir) {
			this.dir = dir;
		} else {
			this.dir = $.runPath + '';
		}
		/// 进程
		this.child;
	}
}

/**
 * @description 错误时触发函数
 * @param {Object} err 错误信息
 */
Process.prototype.error = function(err) {
	console.log("错误信息：" + err);
};

/**
 * @description 退出进程
 * @param {Number} code 进程ID
 */
Process.prototype.exit = function(code) {
	//console.log("进程退出");
};

/**
 * @description 关闭进程
 */
Process.prototype.close = function() {
	//console.log("进程关闭");
};

/**
 * @description 回调函数
 * @param {Object} data 传入参数
 */
Process.prototype.func = async function(data) {
	console.log("子进程返回值：" + data);
};

/**
 * @description 进程执行
 * @param {Object} file 文件路径
 * @param {Object} params 传递给命令的参数
 */
Process.prototype.run = async function(file, params) {
	var f = file.fullname(this.dir);
	var arr = [f];
	arr.addList(params);
	// 创建子进程
	this.child = spawn('node', arr, {
		cwd: this.dir,
		stdio: ["pipe"]
	});
	// 出现错误触发
	this.child.on("error", err => console.log(err));
	// 子进程退出触发
	this.child.on("exit", this.exit);
	// 子进程关闭触发
	this.child.on("close", this.close);
	this.child.stdout.on("data", this.func);
};

exports.Process = Process;
