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
	spawn,
	fork
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
	constructor(config, dir) {
		// 当前目录
		this.dir = dir ? dir : $.runPath + '';
		/**
		 * 进程集
		 */
		this.childs = {};
		
		// 注入配置
		if(config){
			if(config.data){
				var data = config.data();
				for(var k in data){
					this[k] = data[k];
				}
			}
			var methods = config.methods;
			if(methods){
				for(var k in methods) {
					this[k] = methods[k];
				}
			}
		}
	}
	
	/**
	 * 获取子进程pid集合
	 */
	get pids(){
		return Object.keys(this.childs);
	}
}

/**
 * 测试用函数
 * @param {Object} param 参数
 * @return {Object} 返回响应结果
 */
Process.prototype.test = async function(param) {
	console.log('test', param);
	if(typeof(param) == 'string')
	{
		return '子程序,' + param.replace('好', '也好');
	}
	else {
		return param;
	}
};


/**
 * 发送请求
 * @param {String} method 方法名称
 * @param {Object} param 请求参数
 * @param {Function} func 回调函数
 */
Process.prototype.request = async function(method, param, func, pid) {
	var child = this.childs[pid];
	if (child) {
		// 随机生成一个ID
		var date = new Date();
		var id = date.getTime() + '' + Math.random();
		
		// 往子程序发送消息, 内容为请求方法和参数
		child.process.send({id, method, param});

		// 如果存在回调函数则添加到函数队列
		if (func) {
			child.func_list[id] = func;
		}
	}
};

/**
 * 响应服务
 * @param {String} id 消息ID
 * @param {Object} result 响应结果
 * @param {Number} pid 进程ID
 */
Process.prototype.response = async function(id, result, pid) {
	// console.log('response', id, result, pid);
	var child = this.childs[pid];
	if (child) {
		// 往子程序发送消息, 内容为执行结果
		child.process.send({
			id,
			result
		});
	}
};

/**
 * 响应回调函数
 * @param {String} id
 * @param {Object} result
 * @param {Number} pid 进程ID
 */
Process.prototype.callback = async function(id, result, pid) {
	var child = this.childs[pid];
	if (child) {
		var func = child.func_list[id];
		// 判断是否有回调函数
		if (func) {
			// 如果有则执行回调函数
			func(result);
			// 执行完后删除回调函数
			delete child.func_list[id];
		}
	}
};

/**
 * 主程序调用当前进程函数
 * @param {String} method 方法名称
 * @param {Object} param 参数
 */
Process.prototype.func = async function(method, param) {
	var fun = this[method];
	if (fun) {
		return await fun(param);
	}
};

/**
 * 监听进程消息
 * @param {Object} data 消息数据
 * @param {Object} server 服务程序
 */
Process.prototype.message = async function(data, server) {
	this.message_handle(data);
};

/**
 * 消息处理 json-prc2.0格式
 * @param {Object} json
 */
Process.prototype.message_handle = async function(json){
	if (json) {
		var { id, method, param, result, pid } = json;
		if (method) {
			var ret = await this.func(method, param);
			if (ret !== undefined) {
				this.response(id, ret, pid);
			}
		} else if (result && id) {
			this.callback(id, result, pid);
		}
	}
};

/**
 * 添加子进程
 * @param {String} file js文件路径
 */
Process.prototype.add = async function(file) {
	var f = file.fullname(this.dir);
	const child = fork(file);
	child.on('message', (data, server) => {
		this.message(data, server);
	});
	var pid = child.pid;
	this.childs[pid] = {
		process: child,
		func_list: {}
	};
	return this.childs[pid];
};


/* === 事件  === */
/**
 * @description 错误时触发函数
 * @param {Object} err 错误信息
 */
Process.prototype.error = async function(err) {
	console.log("错误信息：" + err);
};

/**
 * @description 退出进程
 * @param {Number} code 进程ID
 */
Process.prototype.exit = async function(code) {
	// console.log("进程退出");
};

/**
 * @description 关闭进程
 */
Process.prototype.close = function() {
	//console.log("进程关闭");
};

/**
 * @description 通讯
 * @param {Object} data 传入参数
 */
Process.prototype.data = async function(data) {
	console.log(data);
};

/**
 * @description 进程执行
 * @param {String} file 文件路径
 * @param {Object} params 传递给命令的参数
 */
Process.prototype.run = async function(file, params) {
	var f = file.fullname(this.dir);
	var arr = [f];
	arr.addList(params);
	// 创建子进程
	var child = spawn('node', arr, {
		cwd: this.dir,
		stdio: ["pipe"]
	});
	child.stdout.setEncoding('utf8');
	// 出现错误触发
	child.on("error", (err) => this.error(err));
	// 子进程退出触发
	child.on("exit", () => this.exit());
	// 子进程关闭触发
	child.on("close", () => this.close());
	child.stdout.on("data", (data) => this.data(data));
	this.child = child;
};

if (global.$) {
	$.Process = Process;
}

module.exports = Process;
