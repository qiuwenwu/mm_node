const Cache = require('./index.js').Cache;
const cache_admin = require('./index.js').cache_admin;

// async function test() {
// 	var bl, num, arr = [];
// 	var cache = new Cache();
// 	await cache.set("a", "张三", 18);
// 	// await cache.set("ac", "张三", 10);
// 	// await cache.set("b", "李四", 10);
// 	// await cache.set("c", "王五", 10);
// 	// await cache.set("d", "十五", 10);
// 	// bl = await cache.set("age1", 10, 10);
// 	// bl = await cache.set("age", 13, 10);
// 	// bl = await cache.addInt("age", -12);
// 	// bl = await cache.add("age", 15, 5);
// 	// console.log(bl);
// 	// console.log(cache.list);
// 	// console.log("修改" + bl);
// 	console.log(await cache.get("age"));
// 
// 	//  bl = await cache.del("age");
// 	// 	bl = await cache.add("d", "十五", 10);
// 	// console.log("添加" + bl);
// 
// 	// var num = await cache.addInt("age", 11);
// 	// console.log(num);
// 
// 	// msg = await cache.setrange("a", 4, "asd");
// 	// console.log(msg);
// 	var len = await cache.addStr("a", "丰");
// 	// console.log("追加文本" + len);
// 	// var bl = await cache.has("a");
// 	// console.log("是否存在" + bl);
// 
// 	var num = await cache.add("arr", ['第三', '第四'], 8);
// 	bl = await cache.list_clear("arr", ['第三', '第四', '第w']); // 清空数组,并重新增加成员
// 	// console.log("清空数组" + bl);
// 	// 
// 	// num = await cache.list_set("arr", ['第一', '第三', '第二'], 8);
// 	num = await cache.list_add("arr", '第s');
// 	console.log("设置数组" + num);
// 	// time = await cache.ttl("arr");
// 	// console.log(time);
// 	// bl = await cache.ttl("arr", -1);
// 	// console.log("设置有效期" + bl);
// 	// time = await cache.ttl("arr");
// 	// console.log(time);
// 
// 	// var bl = await cache.list_has("arr", '第一');
// 	// console.log(bl);
// 	// await cache.sort("arr", 'asc');
// 	// var ar = await cache.list_get("arr", 2);
// 	// console.log(ar);
// 
// 	//console.log("取值" + JSON.stringify(arr));
// 
// 	// await cache.del('a_c');
// 	// ret = await cache.clear(); // 清空缓存
// 	// console.log(ret);
// 	// var ret = await cache.getrange("a", 2, 3);
// 	// console.log(ret);
// 	// var arr = await cache.keys("a*");
// 	// console.log(arr);
// 	// ret = await cache.clear('a*'); // 清空缓存
// 	// console.log(ret);
// 	console.log(cache.list);
// 	var tt = setInterval(async function() {
// 		if (cache.list.length === 0) {
// 			clearInterval(tt);
// 		}
// 		console.log(cache.list.length);
// 	}, 1000);
// 
// 	// cache.dispose() // 销毁资源
// }
// test();

// 
async function test() {
	var bl, num, arr = [];
	var cache = new cache_admin();
	await cache.set("a", "张三", 18);
	console.log(await cache.get("a"));
}
test()