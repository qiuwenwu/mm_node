/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	db.table = "sys_user_account";

	var by = ctx.request.body;
	var username = by["username"];

	// 判断用户是否已存在
	var list = await db.getObj({
		username
	});

	if (list.length > 0) {
		return $.ret.bl(false, '注册失败，用户名已存在！');
	}

	var p = by["password"];
	var pass = p.md5();
	var salt = pass.substring(0, 6);
	var password = (pass + salt).md5();

	var index = await db.addObj({
		username,
		salt,
		password
	});

	if (index) {
		return $.ret.error(true, '注册成功');
	} else {
		return $.ret.error(10000, '数据库业务逻辑错误');
	}
};

exports.main = main;
