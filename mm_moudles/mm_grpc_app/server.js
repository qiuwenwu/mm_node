require('colors');
require('./bin/common.js');

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
var methods = require('./bin/func.js');
const dir = __dirname + '/bin/proto/';

const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
};

// 配置端口
var {
	port,
	host
} = $.config.server;
port = process.env.PORT ? Number(process.env.PORT) : port;
host = process.env.IP || host;

function main() {
	console.log('应用端启动中...'.yellow);
	
	// $.proto = {};
	// const msgPackageDefinition = protoLoader.loadSync(dir + 'WxMsg.proto', PROTO_OPTIONS);
	// $.proto.wxMsg = grpc.loadPackageDefinition(msgPackageDefinition).Medipedia;
	// const accountPackageDefinition = protoLoader.loadSync(dir + 'Account.proto', PROTO_OPTIONS);
	// $.proto.account = grpc.loadPackageDefinition(accountPackageDefinition).Medipedia;
	// const proxyPackageDefinition = protoLoader.loadSync(dir + 'HttpProxy.proto', PROTO_OPTIONS);
	// $.proto.proxy = grpc.loadPackageDefinition(proxyPackageDefinition).Http.Proxy;
	
	var packageDefinition = protoLoader.loadSync(dir + 'activitys.proto', options);
	var proto = grpc.loadPackageDefinition(packageDefinition).yidian_activitys;

	// 创建一个微服务
	var server = new grpc.Server();
	server.addService(proto.Greeter.service, methods);
	server.bind(host + ':' + port, grpc.ServerCredentials.createInsecure());
	server.start();
	console.log('访问地址为 http://%s:%s'.yellow, host, port);
	console.log('启动完毕！'.yellow);
}

main();
