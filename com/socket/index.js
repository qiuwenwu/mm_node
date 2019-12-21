const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * @description 任务类
 * @extends {Index}
 * @class
 */
class Socket extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "socket";
		this.dict = {};
	}
}

/**
 * @description 处理socket请求
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前, 然后继续执行函数
 */
Socket.prototype.run = async function(ctx, next) {
	await next(ctx);
	var list = this.list;
	const path = ctx.path;
	for (let i = 0, o; o = list[i++];) {
		if (path === o.config.path) {
			o.add(ctx);
			break;
		}
	}
};

/**
 * @description 加载插件
 * @param {String} path 检索路径
 * @param {Boolean} isApp 是否APP
 */
Socket.prototype.load = function(path) {
	if (!path) {
		path = "/app/";
	}
	// 获取所有应用路径
	var list_scope = $.dir.getAll(path, "socket");
	
	// 遍历目录路径
	var _this = this;
	list_scope.map(async function(f) {
		var list_file = $.file.getAll(f, "*" + _this.type + ".json");
		list_file.map(async (file) => {
			var dir = file.dirname();
			if (file.hasFile()) {
				var obj = new Drive(dir);
				obj.load(file);
				if (obj.config.name) {
					_this.list.push(obj);
				}
			}
		});
	});
}
exports.Socket = Socket;