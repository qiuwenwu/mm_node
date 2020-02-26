require('mm_expand');
/**
	安装windows系统服务模式
*/
const {
	join
} = require('path');

let Service = require('node-windows').Service;

var file = join(__dirname, './server.js');
console.log(file);
let svc = new Service({
	// 服务名称
	name: 'mm',
	//  描述
	description: 'This is the mm_node web server',
	// nodejs项目要启动的文件路径
	script: file,
	nodeOptions: [
		'--harmony',
		'--max_old_space_size=4096'
	]
});

svc.on('install', () => {
	svc.start();
});

svc.on('uninstall', function() {
	console.log('Uninstall complete.');
	console.log('The service exists: ', svc.exists);
});
svc.uninstall();
svc.install();
console.log("mm系统服务模式安装成功，可以在windows中查看到mm");
