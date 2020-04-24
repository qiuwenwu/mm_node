const Item = require('mm_machine').Item;

/**
 * Catch抓包驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * 构造函数
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
			// 文件路径, 当调用函数不存在时，会先从文件中加载
			"func_file": "",
			// 回调函数名 用于决定调用脚本的哪个函数
			"func_name": "",
			/* 请求 */ 
			"req": {
				"method": "get",
				// 抓取数据的接口地址
				"url": "http://www.baidu.com/",
				// 请求数据类型 json、xml、form类型
				"type": "json",
				// 请求的url参数
				"query": {

				},
				// 请求的正文参数
				"body": {

				}
			},
			/* 响应 */ 
			"res": {
				// 抓取数据的接口地址
				"url": "http://www.baidu.com/",
				// 请求数据类型 json、xml、form类型
				"type": "json",
				// 响应的结果正文
				"body": {}
			}
		};
	}
}

/**
 * 调用函数
 * @param {Object} ctx  请求上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果
 */
Drive.prototype.run = function(ctx, db) {
	
};


module.exports = Drive;
