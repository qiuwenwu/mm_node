const Item = require('mm_machine').Item;

/**
 * @description pay支付驱动类
 * @extends {Item}
 * @class 
 */
class Drive extends Item {
	/**
	 * @description 构造函数
	 * @param {String} dir 当前目录
	 * @constructor
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./pay.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			// 标题, 介绍事件作用
			"title": "",
			// 描述, 用于描述该事件有什么用的
			"description": "",
			// 名称, 由中英文和下“_”组成, 用于卸载事件
			"name": "",
			// 应用域
			"app": "",
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "./index.js",
			// 版本号
			"version": "1.0"
		};
	}
}

/**
 * @description 新建脚本
 * @param {String} 文件
 */
Drive.prototype.new_script = function(file) {
	var fl = __dirname + "/script.js";
	if (fl.hasFile()) {
		var text = fl.loadText();
		if (text) {
			var l = $.slash;
			if (file.indexOf('app' + l) !== -1) {
				var app = file.between('app' + l, l);
				text = text.replaceAll('{1}', app);
			}
			file.saveText(text);
		}
	}
};

/**
 * @description 新建配置
 * @param {String} 文件
 */
Drive.prototype.new_config = function(file) {
	var fl = __dirname + "/config.tpl.json";
	if (fl.hasFile()) {
		var text = fl.loadText();
		if (text) {
			var l = $.slash;
			if (file.indexOf('app' + l) !== -1) {
				var app = file.between('app' + l, l);
				text = text.replaceAll('{1}', app);
			}
			file.saveText(text);
		}
	}
};

/**
 * @description 初始化脚本，用于重置一些信息
 * @param {Object} option 配置参数
 * @param {Object} db 数据管理器
 * @return {String} 成功返回null, 否则返回错误提示
 */
Drive.prototype.init = function(option) {
	var msg = null;
	return msg;
};

/**
 * @description 更新脚本，用于更新配置数据
 * @param {Object} option 配置参数
 * @param {Object} db 数据管理器
 * @return {String} 成功返回null, 否则返回错误提示
 */
Drive.prototype.update = function(option) {
	var msg = null;
	return msg;
};

/**
 * @description 收到后，可用于修改合约格式，或发起通知
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果合约内容不符返回空，否则返回修改后的合约参数
 */
Drive.prototype.receive_after = function(contract, db) {
	return contract;
};

/**
 * @description 保存前，用于修改合约格式保存到数据库
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果不保存到数据库返回空，否则返回修改后的合约参数
 */
Drive.prototype.save_before = function(contract, db) {
	return contract;
};

/**
 * @description 回复前，用于修改合约格式返回给前端
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果回复给前端返回空，否则返回修改后的合约参数
 */
Drive.prototype.reply_before = function(contract, db) {
	return contract;
};

/**
 * @description 订单创建前, 一般用来判断是否符合创建合约的条件
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.create_before = function(contract, db) {
	return true;
};

/**
 * @description 订单创建后，一般用来发送通知，例如冻结商品库存
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.create_after = function(contract, db) {
	return true;
};

/**
 * @description 支付前, 一般用来判断支付信息是否正确，例如是否支持该支付方式
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.pay_before = function(contract, db) {
	return true;
};

/**
 * @description 支付后，一般用来发送通知
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.pay_after = function(contract, db) {
	return true;
};

/**
 * @description 到账完成前, 一般用来判断支付信息是否正确，例如是否支持该支付方式
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.complete_before = function(contract, db) {
	return true;
};

/**
 * @description 到账完成后，一般用来发送通知，例如减少商品库存
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.complete_after = function(contract, db) {
	return true;
};

/**
 * @description 取消前, 一般用来变更合约状态或续约
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.cancel_before = function(contract, db) {
	return true;
};

/**
 * @description 取消后，一般用来发送通知，例如解除冻结商品库存
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.cancel_after = function(contract, db) {
	return true;
};


/**
 * @description 取消合约
 * @param {Object} contract 合约参数
 * @param {Object} db 数据管理器
 * @return {Object} 如果要中断合约则返回false，否则返回true
 */
Drive.prototype.cancel = function(contract, db) {
	var o = Object.assign({}, contract);
	o.state = 4;
	o = cancel_before(o);
	if (o) {
		db.table = "pay_trade_log";
		db.setObj({
			trade_id: o.trade_id
		}, o);
		cancel_after(o);
		return true;
	} else {
		return false;
	}
};

exports.Drive = Drive;
