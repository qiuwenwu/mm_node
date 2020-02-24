const app = require('./app.js');
const startup = require('./bin/startup');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const len = numCPUs * 2;

// 初始化服务
startup.use(app);
 
 // 配置端口
 const port_http = process.env.PORT || 3000;
 const host_http = process.env.IP || '0.0.0.0';

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < len; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    // console.log('工作进程已关闭:', worker.isDead());
  });

  cluster.on('exit', (worker, code, signal) => {
    // console.log('工作进程已关闭:', worker.isDead());
  });
} else {
  // 工作进程可以共享任何 TCP 连接。在这种情况下，它是一个 HTTP 服务器。
	 app.listen(port_http, host_http, async()=> {
		console.log("服务端访问地址为 http://%s:%s", host_http, port_http);
		startup.init();
	 });
}