var sql = $.mysql_admin('sys', __dirname);
sql.setConfig();
sql.open();
var db2 = sql.db();

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// ctx.body = this.body('[{"test": 123}]', ctx);
	var req = ctx.request;
	// 获取请求参数
	var q = req.query;

	// 取消息ID
	const id = q['id'];
	delete q['id'];

	// 选择操作的数据表
	db2.table = "test";

	// 过滤查询
	db2.filter(q);
	
	db2.key = "id";
	// 查询表
	// var ret = await db2.get(q);
	// var count = await db2.count(q);
	// ret = await db2.getSql("`name` like '%" + q.name + "%'");
	// await db2.set({ id: ret[0].id }, { age: 21 });
	// ret[0].age = 21;
	// return ret;
	// return JSON.stringify('{ "test": 123 }');
	// $.log.debug(ret);
	// var ret = $.list(list, count);
	// ret.id = id;
	var obj = await db2.getObj(q);
	if(obj)
	{
		console.log(obj);
		obj.age -= 10;
	}
	return $.ret.obj(obj, id);
};

exports.main = main;

/* 除了api接口响应方式，还可以自定义回调响应方式 */
/// 回调函数
/// ctx: 请求响应上下文
/// next: 跳过当前,延后执行函数
// function run(ctx, next){
// 	return "123";
// }
// 
// exports.run = run;
