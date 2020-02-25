const app = require('./app.js');
const startup = require('./bin/startup');
var cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// 初始化服务
startup.use(app);
 
 // 配置端口
 const port_http = process.env.PORT || 3000;
 const host_http = process.env.IP || '0.0.0.0';

if (cluster.isMaster) {
    console.log('[master] ' + "master started, pid:" + process.pid);

    cluster.on('fork', function (worker) {
        // console.log('[master] ' + 'fork: worker' + worker.id);
    });

    cluster.on('online', function (worker) {
        // console.log('[master] ' + 'online: worker' + worker.id);
    });

    cluster.on('listening', function (worker, address) {
        // console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', address:' + address.address + ":" + address.port);
    });

    cluster.on('disconnect', function (worker) {
        // console.log('[master] ' + 'disconnect: worker' + worker.id);
    });

    cluster.on('exit', function (worker, code, signal) {
        // console.log('[master] ' + 'exit worker' + worker.id + ' died, try to fork a new worker.');
        cluster.fork();
    });

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function (id) {
        cluster.workers[id].on('message', function (msg) {
            // console.log('[master] ' + 'received msg:' + msg + 'from worker' + id);
        });
    });

    function eachWorker(callback) {
        for (var id in cluster.workers) {
            callback(cluster.workers[id]);
        }
    }

    var i = 0;
    setTimeout(function () {
        eachWorker(function (worker) {
            i++;
            worker.send('[master] ' + 'send msg ' + i + ' to worker' + worker.id);
        });
    }, 3000);

} else if (cluster.isWorker) {
    console.log('[worker] ' + "worker" + cluster.worker.id + " started, pid:" + process.pid);

    process.on('message', function (msg) {
        // console.log('[worker] worker' + cluster.worker.id + ' received msg:' + msg);
        process.send('[worker] send msg ' + cluster.worker.id + ' to master.');
    });
	

	
	// 工作进程可以共享任何 TCP 连接。在这种情况下，它是一个 HTTP 服务器。
	 app.listen(port_http, host_http, async()=> {
		console.log("服务端访问地址为 http://%s:%s", host_http, port_http);
		startup.init();
	 });
	
    // http.createServer(function (req, res) {
    //     var response = 'worker received request, id:' + cluster.worker.id + ',pid:' + process.pid;
    //     // console.log(response);
    //     res.writeHead(200, { "content-type": "text/html" });
    //     res.end(response);
    // }).listen(5000);
}