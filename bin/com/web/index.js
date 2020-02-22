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
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "web";
		this.title = title;
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
