class WS_expand() {
	/**
	 * 构造函数
	 * @param {Object} ctx 请求上下文
	 * @param {String} token 临时访问牌
	 */
	constructor(ctx) {
		
	}
}

var sql = $.mysql_admin('sys', __dirname);
sql.setConfig($.config.mysql);
sql.open();

var test_msg = {
	"from_user": "小明",
	"to_user": "小白",
	"create_time": new Date().stamp(),
	"content": "你好"
};

var timer = setInterval(function() {
	if ($.client["/ws/chat"]) {
		$.client["/ws/chat"].send($.req.send("message"), function(res) {
			console.log(res);
		});
	}
}, 2000);

// 提供一个全局方法容器
if (!$.methods) {
	$.methods = {};
}

/**
 * 收到消息后返回
 */
$.methods.message = async function(msg, db) {
	test_msg["create_time"] = new Date().stamp();
	return [params, test_msg]
};

/**
 * 消息同步
 * @param {Object} params 请求参数
 * @param {Object} websocket 响应器
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 */
$.methods.sync = async function(params, websocket, db) {
	// console.log("当前客户端", client.count());
	// console.log("当前连接数", msg.list.length);
	// console.log("收到的消息主体", msg.body);
	var text = JSON.stringify(test_msg);
	var timer = setInterval(function() {
		websocket.send(text);
	}, 2000);

	websocket.onclose = function() {
		// console.log("关闭了之后, 销毁定时器, 防止内存泄漏");
		clearInterval(timer);
	};
};


/**
 * @description 接口主函数
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(msg, db) {
	// 在这定义要访问的数据库 (分布式开发时设置不同的数据库名)
	$.push(db, sql.db(), true);

	var json = msg.body;
	var m = json.method;
	if (m) {
		// 如果消息中含有method属性表示请求查询, 需要对此做响应
		var func = $.methods[m];
		if (func) {
			var ret = await func(json.param, msg.websocket, db);
			return $.ret.body(ret, null, json.id);
		}
		return;
	} else {
		console.log(json);
	}
	// 否则不做任何响应
	return null;
};

exports.main = main;
