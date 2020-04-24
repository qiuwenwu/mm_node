
var api = $.api_admin('test', '测试用');
// 首次启动更新api接口;
api.update('demo/');

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	db.tpl = new $.Tpl();
	db.tpl.viewBag.app = "mm";
	return api.run(ctx, db);
};
exports.main = main;
