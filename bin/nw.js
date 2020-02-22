/**
	安装windows系统服务模式
*/
const {
	resolve
} = require('path');

let Service = require('node-windows').Service;

let svc = new Service({
	// 服务名称
	name: 'mm',
	//  描述
	description: 'This is the mm_node web server',
	// nodejs项目要启动的文件路径
	script: resolve('../server.js'),
	  nodeOptions: [
		'--harmony',
		'--max_old_space_size=4096'
	  ]
});

svc.on('install', () => {
	svc.start();
});

svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});
svc.uninstall();
svc.install();
console.log("mm系统服务模式安装成功，可以在windows中查看到mm");
