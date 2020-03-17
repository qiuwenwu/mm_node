const Process_sub = require('mm_process/sub');
const startup = require('./grpc_startup.js');

// 实例化子进程通讯函数
$.process = new Process_sub({
	// 添加方法
	methods: {
		// 修改消息接收方法
		async message(data, server) {
			this.message_handle(data)
		},
		async init(config){
			var { port, host, channel_id, runPath } = config.grpc;
			$.channel = {
				id: channel_id,
				pid: this.process.pid
			};
			$.runPath = runPath;
			
			// 在初始化的时候才加载http服务
			startup(config);
			
			// app = http.createServer(.callback())
			return { pid: $.channel.pid, channel_id, port, host };
		}
	}
});
