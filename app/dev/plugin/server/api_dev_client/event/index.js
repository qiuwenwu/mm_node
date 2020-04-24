const dev = require('../com.js').dev;

var dev_class = new dev('event');


/**
 * @description
 * @param {Object} req HTTP请求上文
 * @param {Object} cs 池
 */
dev_class.get_before = function(req, cs) {
	if (!req.query["stage"]) {
		req.query["stage"] = "main";
	}
	var key = "list_" + req.query["stage"];
	var list = cs[key];
	if (!list) {
		list = [];
	}
	cs.list = list;
}

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
exports.main = async function(ctx, db) {
	return await dev_class.main(ctx, db);
};
