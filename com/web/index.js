const Index = require('mm_machine').Index;

/**
 * @description 网站SEO类
 * @extends {Index}
 * @class
 */
class Web extends Index {
	/**
	 * @description 构造函数
	 * @param {Object} scope 作用域
	 * @constructor
	 */
	constructor(scope) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "web";
	}
}

/**
 * @description 执行web
 */
Web.prototype.run = async function() {
	var lt = this.list;
	for (var i = 0, o; o = lt[i++];) {
		o.run();
	}
};
exports.Web = Web;
