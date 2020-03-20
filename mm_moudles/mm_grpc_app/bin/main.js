const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');


const options = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
};

var port = 10000;
var host = '0.0.0.0';
var dirs = $.dir.getAll(__dirname + '/channel');

var list = [];


function get_dirname(dir){
	var arr = dir.split($.slash);
	return arr[arr.length - 1];
}

async function main() {
	console.log('web端启动中...'.yellow);
	for (var i = 0; i < dirs.length; i++) {
		var d = dirs[i];
		var {
			config,
			methods
		} = require(d + 'index.js');
		var packageDefinition = protoLoader.loadSync(d + 'index.proto', options);
		var proto = grpc.loadPackageDefinition(packageDefinition).index;
		
		// 配置服务地址和端口
		var p = config.port ? config.port : port + i + 1;
		var h = config.host ? config.host : host;
		var client = new proto.Greeter(h + ':' + p, grpc.credentials.createInsecure());
		
		// 创建方法集，并遍历追加函数
		console.log(get_dirname(d));
		var name = config.name ? config.name : get_dirname(d);
		var path = config.path ? config.path : ('/api/' + name).toLocaleLowerCase();
		list.push({
			name,
			path,
			func: function(params) {
				return new Promise(function(resolve, reject) {
					client.http(params, function(err, response) {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							resolve(response);
						}
					});
				});
			}
		});
	}
}

main();
module.exports = list;
