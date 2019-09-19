const Item = require('mm_machine').Item;

/**
 * @description Catch抓包驱动类
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
		this.default_file = "./catch.json";
		
		/* 通用项 */
		// 配置参数
		this.config = {
			// 标题, 介绍事件作用
			"title": "示例事件",
			// 描述, 用于描述该事件有什么用的
			"description": "描述事件使用方法",
			// 名称, 由中英文和下“_”组成, 用于卸载事件
			"name": "demo",
			// 应用域
			"app": "mm",
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": ""
		};
	}
}

exports.Drive = Drive;
