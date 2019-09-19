/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var model = { name: "超级美眉", age: 18, sex: true };
	var file = __dirname + '/index.html';
	return db.tpl.view(file, model);
}

exports.main = main;