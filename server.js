const app = require('./app.js');
// 引入开始程序
const startup = require('./bin/startup');
// 初始化服务
startup.use(app);

// 配置端口
const port_http = process.env.PORT || 8000;
const host_http = process.env.IP || '0.0.0.0';

app.listen(port_http, host_http, async()=> {
	console.log("服务端访问地址为 http://%s:%s", host_http, port_http);
	await startup.init();
});
