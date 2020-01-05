/**
	卸载windows系统服务模式
*/
let Service = require('node-windows').Service;

 let svc = new Service({
	name: 'mm',    //服务名称
	description: 'This is the mm_node web server', //描述
	script: __dirname + '/main.js' //nodejs项目要启动的文件路径
});

svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

svc.uninstall();