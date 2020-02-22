require('./index.js');

/* 调用示例 */
async function test() {
	var body;
	body = $.ret.error(10000, '错误');
	console.log(JSON.stringify(body));
	
	body = $.ret.body("这是一个结果");
	console.log(JSON.stringify(body));
	
	body = $.ret.obj({ "name": "张三",  age: 18});
	console.log(JSON.stringify(body));
	
	body = $.ret.list([{ "name": "张三",  age: 18}, { "name": "李四",  age: 24}]);
	console.log(JSON.stringify(body));
	
	body = $.ret.bl(true, "修改成功");
	console.log(JSON.stringify(body));
}

test();

async function test2() {
	var body = $.req.send('test', "你好吗");
	console.log(body);
	
	$.req.tpl.message = {
		"to_user": "",
		"from_user": "",
		"content": ""
	};
	body = $.req.send('message', { content: "你好吗?", "media": { "title": "牛" } });
	console.log(body);
}
test2();