const Item = require('mm_machine').Item;

/**
 * @description Event事件驱动类
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
		this.default_file = "./event.json";

		/* 通用项 */
		// 配置参数
		this.config = {
			// 标题, 介绍事件作用
			"title": "示例事件",
			// 描述, 用于描述该事件有什么用的
			"description": "描述事件使用方法",
			// 名称, 由中英文和下“_”组成, 用于卸载事件
			"name": "demo",
			// 目标
			"target": "",
			// 事件阶段, check 验证、action 行动、render 渲染
			"stage": "action",
			// 发生时态, before 发生前、after发生后、main发生
			"tense": "main",
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "./index.js",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": "main",
			// 执行顺序, 数字越小，越优先执行
			"sort": 100,
			// 中断循环
			"end": true
		};

	}
}

/**
 * @description 执行事件
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Drive.prototype.run = async function(ctx, db) {
	var ret = await this.main(ctx, db);
	return ret;
};

/**
 * @description 脚本主函数
 * @param {Object} ctx 请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Drive.prototype.main = async function(ctx, db) {
	return null;
};

exports.Drive = Drive;
