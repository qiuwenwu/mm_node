const file = __dirname + '/file.html';

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var model = {
		name: "楚留香",
		age: 23,
		sex: true,
		list: [
			{
				login_time: "2019-01-01 22:50:43",
				ip: "124.192.12.4"
			},
			{
				login_time: "2019-03-01 10:15:32",
				ip: "132.122.16.8"
			}
		]
	};
	return db.tpl.view(file, model);
}

exports.main = main;
