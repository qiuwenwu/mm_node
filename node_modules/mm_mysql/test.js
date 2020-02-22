const Mysql = require('./index.js').Mysql;

// 测试Mysql
// async function test() {
// 	var sql = new Mysql();
// 	sql.open();
// 	db = sql.db();
// 	db.table = "test";
// 	var addArr = [];
// 	for (var i = 1; i <= 9; i++) {
// 		var add = {
// 			name: "test" + i,
// 			username: "t" + i,
// 			password: "a" + i
// 		};
// 		addArr.push(add);
// 	}
// 	var ret = await db.addList(addArr);
// 	console.log("添加：" + JSON.stringify(ret), db.error);
// 	var setArr = [];
// 	for (var i = 1; i <= addArr.length; i++) {
// 		setArr.push({
// 			query: {
// 				name: "test" + i
// 			},
// 			item: {
// 				username: "username" + i,
// 				password: "password" + i
// 			}
// 		});
// 	}
// 	ret = await db.setList(setArr);
// 	console.log("修改：" + JSON.stringify(ret), db.error);

// 	var delArr = [];
// 	for (var i = 1; i <= addArr.length; i++) {
// 		if (i % 2 == 0) {
// 			delArr.push({
// 				query: {
// 					username: "username" + i
// 				}
// 			});
// 		}
// 	}
// 	// ret = await db.delList(delArr);
// 	ret = await db.delObj({
// 		username: "username"
// 	});
// 	console.log("删除：" + JSON.stringify(ret), db.error);
// }

// test();


// async function addField() {
// 	var sql = new Mysql();
// 	sql.open();
// 	db = sql.db();
// 	var num = 0;
// 	db.table = 'test9';
// 	// num = await db.field_del('set6');
// 	// num = await db.field_add('set6', 'str');
// 	await db.addTable('test9', 'uid', 'int', true);
// 	num = await db.field_add("uid", 'int', 0, true, true);
// 	console.log("uid结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("username", 'varchar(18)', '', true);
// 	console.log("username结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("password", 'string', null);
// 	console.log("password结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("email", 'varchar', null);
// 	console.log("email结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("age", 'smallint', 0);
// 	console.log("age结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("sex", 'tinyint', 0);
// 	console.log("sex结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("create_time", 'timestamp');
// 	console.log("create_time结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("last_time", 'timestamp', null, true, true);
// 	console.log("last_time结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("birthday", 'date');
// 	console.log("birthday结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("note", 'text', null, false);
// 	console.log("note结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("cycle", 'time', null, true, false);
// 	console.log("cycle结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
	
// 	num = await db.field_add("money", 'double', 0);
// 	console.log("money结果：" + num);
// 	if(num < 0){
// 		console.log("SQL：" + db.sql);
// 	}
// }

// addField();


// 
// async function setField() {
// 	var sql = new Mysql();
// 	sql.open();
// 	db = sql.db();
// 	var num = 0;
// 	db.table = 'test9';
// 	num = await db.field_set("uid", 'int', 0, true);
// 	console.log("uid结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("username", 'varchar(18)', '');
// 	console.log("username结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("password", 'string', null);
// 	console.log("password结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("email", 'varchar', null);
// 	console.log("email结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("age", 'bigint', 0);
// 	console.log("age结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("sex", 'int', 0);
// 	console.log("sex结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("create_time", 'datetime');
// 	console.log("create_time结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("last_time", 'timestamp', null, true, false);
// 	console.log("last_time结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("birthday", 'datetime');
// 	console.log("birthday结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("note", 'text', null, true, false);
// 	console.log("note结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("cycle", 'date', null, true, false);
// 	console.log("cycle结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_set("money", 'float', 0);
// 	console.log("money结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// }
// 
// setField();


// 
// async function delField() {
// 	var sql = new Mysql();
// 	sql.open();
// 	db = sql.db();
// 	var num = 0;
// 	db.table = 'test9';
// 	num = await db.field_del("uid");
// 	console.log("uid结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("username");
// 	console.log("username结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("password");
// 	console.log("password结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("email");
// 	console.log("email结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("age");
// 	console.log("age结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("sex");
// 	console.log("sex结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("create_time");
// 	console.log("create_time结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("last_time");
// 	console.log("last_time结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("birthday");
// 	console.log("birthday结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("note");
// 	console.log("note结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("cycle");
// 	console.log("cycle结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// 
// 	num = await db.field_del("money");
// 	console.log("money结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// }
// 
// delField();


// async function newName() {
// 	var sql = new Mysql();
// 	sql.open();
// 	db = sql.db();
// 	var num = 0;
// 	db.table = 'test9';
// 	num = await db.field_name("last_time", 'last_time');
// 	console.log("name结果：" + num);
// 	if (num < 0) {
// 		console.log("SQL：" + db.sql);
// 	}
// }
// newName();


// 测试实体模型
async function test_model() {
	// 实例化一个mysql操作类
	var sql = new Mysql();
	// 设置 数据库连接配置
	var config = {
			"host": "localhost",
			"port": 3306,
			"user": "root",
			"password": "asd123",
			"database": "mm"
		};
	sql.setConfig(config);
	// 开启数据库连接
	sql.open();
	// 实例化一个数据库操作类
	db = sql.db();
	
	// 选择要查询的表
	db.table = "user_account";
	
	// 设置主键(可以不用设置, 设置之后查询的数据可以赋值同步)
	db.key = "user_id";
	
	// 通过对象查询数据, 第一个参数是对象(查询条件), 第二个是排序方式,第三个是查询的字段
	var obj = await db.getObj({ username: "admin" }, null, 'username,vip,user_id');
	
	// 调试输出生成的sql语句
	console.log(db.sql);
	// 调试输出查询结果
	console.log(obj);
	// 修改数据库中该条数据的vip字段值, 注意到数据库管理器查看数据库的变化
	obj.vip = 5;
	// 修改数据库中该条数据的gm字段值
	obj.gm = 5;
	// 修改数据库中该条数据的phone字段值
	obj.phone = 333;
	// 输出一下, 查看查询结果对象的变化, 对照数据库变化, 值是否一致
	console.log(obj);
	// obj.gm += 6;
	
	// 查询列表
	var list = await db.get({ username: "admin" });
	// 判断查询结果是否有数据
	if(list.length > 0)
	{
		// 取第一条数据
		obj = list[0];
		// 将数据对象转为实体模型, 实现和数据库同步
		var o = db.model(obj);
		// 修改该条数据的phone字段为15817188815
		o.phone = '15817188815';
		// 调试输出, 对比对象变化和数据库值是否一致
		console.log(o);
	}
}

test_model();