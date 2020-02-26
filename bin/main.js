const Process_sub = require('mm_process/sub');
const init = require('./startup.js');

var app = null;

// 实例化子进程通讯函数
var ps = new Process_sub({
	// 添加方法
	methods: {
		// 修改消息接收方法
		async message(data, server) {
			if (data === 'server') {
				//处理与客户端的连接
				server.on('connection', function (socket) {
					//交给http服务来处理
					app.emit('connection', socket);
				});
			} else {
				this.message_handle(data)
			}
		},
		async init(config){
			var { port, host, channel_id, runPath } = config.server;
			$.channel = {
				id: channel_id,
				pid: this.process.pid
			};
			$.runPath = runPath;
			// 在初始化的时候才加载http服务
			app = init(config).listen(port, host);
			// app = http.createServer(.callback())
			return { pid: $.channel.pid, channel_id, port, host };
		}
	}
});
