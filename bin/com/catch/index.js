const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * Catch抓包类
 * @extends {Index}
 * @class
 */
class Catch extends Index {
	/**
	 * 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "catch";
		this.title = title;
	}
}

exports.Catch = Catch;