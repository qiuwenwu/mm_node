const Index = require('mm_machine').Index;
const Drive = require('./drive').Drive;

/**
 * @description Catch抓包类
 * @extends {Index}
 * @class
 */
class Catch extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "catch";
	}
}

exports.Catch = Catch;