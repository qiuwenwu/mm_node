/**
 * @description 获取验证码
 * @param {Object} 数据库管理器
 * @param {String} username
 * @param {String} password
 */
async function getCode(db, username, password) {
	var date = new Date();
	var str = (date.toISOString() + username + password).md5();
	
	var code = "";
	for (var i = 0; i < 20; i++) {
		var c = str.substring(0, 8);
		var count = await db.count('`invite_code`=' + c);
		if(count === 0){
			code = c;
			break;
		}
	}
	return code.toUpperCase();
};

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	db.table = "user_account";

	var by = ctx.request.body;
	var username = by["username"];

	// 判断用户是否已存在
	var count = await db.countObj({
		username
	});
	if (count > 0) {
		return $.ret.bl(false, '注册失败，用户名已存在！');
	}

	var p = by["password"];
	var pass = p.md5();
	var salt = pass.substring(0, 6);
	var password = (pass + salt).md5();

	var invite_code = await getCode(db, username, password);

	var index = await db.add({
		username,
		salt,
		password,
		invite_code
	});

	if (index > 0) {
		return $.ret.error(true, '注册成功');
	} else {
		return $.ret.error(10000, '数据库业务逻辑错误。 ' + JSON.stringify(db.error, true));
	}
};

exports.main = main;
