const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

/**
 * @description Pay支付类
 * @extends {Index}
 * @class 
 */
class Pay extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "pay";
	}
}

/**
 * @description 执行支付程序
 * @param {String} process 流程, create 订单创建阶段、pay付款阶段、cancel取消阶段、complete到账阶段
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Pay.prototype.run = function(process, contract, db) {
	var app = contract.app;
	if (!app) {
		return $.ret.error(30000, "应用名称(app)参数不能为空");
	}
	var ret;
	var lt = this.list;
	for (var i = 0, o; o = lt[i++];) {
		if (o.config.app === app) {
			ret = o.run(process, contract, db);
			break;
		}
	}
	return ret;
};

/**
 * @description 初始化插件
 * @param {Object} option 配置参数
 * @return {String} 执行结果
 */
Pay.prototype.init = function(option) {
	var ret = "";
	var lt = this.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		ret = this.lt[i].init(option);
	}
	return ret;
};

/**
 * @description 加载插件
 * @param {String} path 检索路径
 * @param {Boolean} isApp 是否APP
 */
Pay.prototype.load = function(path) {
	if (!path) {
		path = '/app/';
	}
	var list = this.list;
	if (path.endsWith('/app/')) {
		var list_scope = $.dir.get(path);

		// 遍历目录路径
		list_scope.map(function(o) {
			var file = './app.json'.fullname(o);
			if (file.hasFile()) {
				var obj = new Drive(o);
				obj.load(file);
				if (obj.config.name) {
					list.push(obj);
				}
			}
		});
	} else {
		var list_scope = $.dir.get(path);

		// 遍历目录路径
		var _this = this;
		list_scope.map(function(o) {
			var file = './pay.json'.fullname(o);
			if (file.hasFile()) {
				var obj = new Drive(o);
				obj.load(file);
				if (obj.config.name) {
					list.push(obj);
				}
			}
		});
	}
};

exports.Pay = Pay;


/**
 * @description 创建全局管理器
 */
if (!$.pool.pay) {
	$.pool.pay = {};
}

/**
 * @description pay管理器, 用于管理插件
 * @param {string} scope 作用域
 * @return {Object} 返回一个缓存类
 */
function pay_admin(scope) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.pay[scope];
	if (!obj) {
		$.pool.pay[scope] = new pay(scope);
		obj = $.pool.pay[scope];
	}
	return obj;
}

/**
 * @module 导出pay管理器
 */
exports.pay_admin = pay_admin;
