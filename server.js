require("colors");
const init = require("./bin/expand.js");
const Process = require('mm_process');
const net = require('net');
var { join } = require('path');

// 加载全局配置
const NODE_ENV = process.env.NODE_ENV || 'local';
var config = `./config/${NODE_ENV}.json`.loadJson(__dirname);

// 频道数, 端口号, 主机地址
var {
	channel,
	port,
	host
} = config.server;

// 配置端口
port = process.env.PORT ? Number(process.env.PORT) : port;
host = process.env.IP || host;
channel = channel || require('os').cpus().length;

/**
 * 频道信息输出
 * @param {Object} res 响应结果
 */
async function about(res) {
	console.log(`  频道${res.channel_id} -> 端口: ${res.port}  进程ID: ${res.pid}`);
}


/**
 * 定义服务程序
 */
async function run() {
	console.info(`欢迎使用《${config.sys.title}》服务端!`.yellow);
	console.log("访问地址为 http://%s:%s", host, port);
	console.log("世界频道数: ", channel);
	
	// 创建进程管理实例
	var p = new Process();
	for (var i = 0; i < channel; i++) {
		// 添加子进程
		var child = await p.add('./bin/main.js');
		// 设置配置
		var channel_id = i + 1;
		var cg = Object.assign({}, config);
		$.push(cg.server, {
			channel_id,
			host,
			port: port + channel_id,
			runPath: $.runPath
		}, true);
		// 初始化子进程
		p.request('init', cg, about, child.process.pid);
	}

	var server = net.createServer();

	var childs = p.childs;
	server.listen(port, function() {
		for (var k in childs) {
			childs[k].process.send('server', server);
		}
		// 发送完句柄后关闭监听
		server.close();
	});
	$.process = p;
	init(config);
}

run();
