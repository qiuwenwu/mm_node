function Create_message(_this, receive) {
	/**
	 * 接收消息时处理
	 * @param {String} bodyStr 消息正文字符串
	 */
	return function message(bodyStr) {
		var json = bodyStr.toJson();
		if (json) {
			var id = json.id;
			if (json.result && id) {
				var lt = _this.list_msg;
				var len = lt.length;
				var has = false;
				for (var i = 0; i < len; i++) {
					var o = lt[i];
					if (id === o.id) {
						o.func(json.result);
						lt.splice(i, 1);
						has = true;
						break;
					}
				}
				if (has) {
					return;
				}
			} else if (json.method) {
				var func = _this.methods[json.method];
				if (func) {
					var ret = func(json.params);
					if (ret) {
						var obj = {};
						if (id) {
							obj.id = id
						}
						obj.result = ret;
						_this.ws.send(JSON.stringify(obj));
					}
					return;
				}
			}
			receive(json);
			return;
		}
		receive(bodyStr);
	}
}

/**
 * web socket 通讯类使用说明
 * 需要依赖前端模块 mm_sdk
 * 使用时, 通过new的方式创建
 */
if (window && window.$ && $.socket) {
	/**
	 * web socket 通讯类
	 */
	function Socket(url, receive, noticy, name) {
		/**
		 * 消息队列
		 */
		this.list_msg = [
			/*
			{
				// 消息ID
				id: "",
				// 请求方法
				method: "",
				// 消息参数
				params: {},
				// 回调函数
				func: function(res){}
			}
			*/
		];
		
		var _this = this;
		/**
		 * 方法集合
		 */
		this.methods = {
			/**
			 * 提供给服务端查看有多少开放函数
			 */
			get_method: function(){
				return Object.keys(_this.methods)
			}
		};
		
		this.ws = $.socket(url, Create_message(this, receive), noticy, name);
	}

	/**
	 * 发送消息
	 * @param {String} bodyStr 正文
	 */
	Socket.prototype.send = function(bodyStr) {
		this.ws.send(bodyStr);
	};
	
	/**
	 * 请求消息
	 * @param {String} method 请求方法
	 * @param {Object} params 参数
	 * @param {Function} func 回调函数, 可以为空
	 */
	Socket.prototype.req = function(method, params, func) {
		var name = this.ws.name + '';
		var data = {
			id: name + new Date().stamp(),
			method: method,
			params: params
		};
		this.ws.send(JSON.stringify(data));
		
		if (func) {
			data.func = func;
			this.list_msg.push(data);
		}
	};

	/**
	 * 关闭连接
	 */
	Socket.prototype.close = function() {
		this.ws.close();
	};

	/**
	 * 打开连接
	 */
	Socket.prototype.open = function() {
		this.ws.open();
	};

	/**
	 * 清理, 释放内存
	 */
	Socket.prototype.clear = function() {
		this.ws.clear();
		this.list_msg.clear();
		this.methods.clear();
	};

	window.Socket = Socket;
}
