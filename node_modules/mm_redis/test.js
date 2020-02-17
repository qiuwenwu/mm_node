const Redis = require('./index.js').Redis;

async function test() {
	var bl, num, arr = [];
	var rs = new Redis();
	var config = './config.json'.loadJson(__dirname);
	rs.setConfig(config);
	rs.open();
	// await rs.set("a", "张三", 10);
	// await rs.set("a_c", "张三", 10);
	// await rs.set("b", "李四", 10);
	// 
	// await rs.set("c", "王五", 10);
	// await rs.set("d", "十五", 10);
	bl = await rs.set("age", 10, 10);
	console.log("修改" + bl);

	//bl = await rs.del("d");  
	bl = await rs.add("d", "十五", 10);
	console.log("添加" + bl);

	// var num = await rs.addInt("age", 11);
	// console.log(num);
	// 
	// msg = await rs.setrange("a", 0, "asd");
	// var len = await rs.addStr("a", "丰");
	// console.log("追加文本" + len);
	// 
	// var bl = await rs.has("a");
	// console.log("是否存在" + bl);

	bl = await rs.list_clear("arr", ['第三', '第四', '第w']); // 清空数组,并重新增加成员
	console.log("清空数组" + bl);

	num = await rs.list_set("arr", ['第一', '第二'], 10);
	console.log("设置数组" + num);

	time = await rs.ttl("arr");
	console.log(time);
	bl = await rs.ttl("arr", -11);
	console.log(bl);
	time = await rs.ttl("arr");
	console.log(time);

	// var bl = await rs.list_has("arr", '第一');
	// console.log(bl);
	// await rs.sort("arr");
	var ar = await rs.list_get("arr");
	console.log(ar);

	//console.log("取值" + JSON.stringify(arr));

	//rs.del('a');
	// ret = await rs.clear(); // 清空缓存
	// console.log(ret);
	// var ret = await rs.getrange("a", 1, 3);
	// var arr = await rs.keys("a*");
	// console.log("取值" + arr);
	var bl = rs.close();
	console.log(bl);
}
test();