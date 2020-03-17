const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const protobufjs = require('protobufjs');

var methods = require('./func.js');
const dir = './proto/'.fullname(__dirname);

/* grpc配置 */
const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
};

// 服务
var { port, file } = $.config.grpc;
var host = $.config.server.host;

// 启动函数 用来加载proto
function startup(){
	$.proto = {};
	
	$.proto.CommonHeader = null;
	protobufjs.load(dir + 'Common.proto', function(err, root) {
		if (err) {
			$.log.error(err)
		} else {
			$.proto.CommonHeader = root.lookupType('Medipedia.CommonHeader')
		}
	});
}

module.exports = function(){
	// 启动函数
	var file = dir + file;
	
	var packageDefinition = protoLoader.loadSync(file, options);
	var proto = grpc.loadPackageDefinition(packageDefinition).Activity;
	
	// 创建一个微服务
	var server = new grpc.Server();
	server.addService(proto.Greeter.service, methods);
	server.bind(host + ':' + port, grpc.ServerCredentials.createInsecure());
	server.start();
	return server;
};
