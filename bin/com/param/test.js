async function test() {
	var ck = new Param($.runPath + '');
	ck.load();
	var params = {
		uid: '100',
		name: "张三",
		age: 150,
		birthday: '1970-01-01',
		headImg: "http://img.png",
		username: "admin",
		password: "123456",
		pay_password: "654321",
		confirm_password: "123456"
	};
	var msg = ck.check(params, 'query');
	$.log.debug(msg);
}

test();

// async function test() {
// 	var config = {
// 		// 参数过滤
// 		filter: true,
// 		// 调用脚本文件路径
// 		file: "",
// 		// url中的query参数
// 		query: [],
// 		// body参数
// 		body: [],
// 		// 参数列表
// 		list: [{
// 				name: "name",
// 				title: "名称",
// 				required: true,
// 				type: "string",
// 				string: {
// 					format: "ch",
// 					range: [2, 6]
// 				}
// 				separator: "|"
// 			},
// 			{
// 				name: "name",
// 				title: "名称",
// 				required: true,
// 				type: "string",
// 				string: {
// 					format: "ch",
// 					range: [2, 6]
// 				}
// 			},
// 			{
// 				name: "age",
// 				title: "年龄",
// 				type: "number",
// 				number: {
// 					// min: 3,
// 					// max: 255,
// 					range: [1, 150]
// 				}
// 			},
// 			{
// 				name: "headImg",
// 				title: "头像",
// 				type: "string",
// 				string: {
// 					extension: "png|gif|jpg|jpeg|bmp",
// 				}
// 			},
// 			{
// 				name: "birthday",
// 				title: "生日",
// 				required: true,
// 				type: "string",
// 				string: {
// 					format: "dateISO"
// 					// regex: "[0-9]+\.png"
// 				}
// 			}
// 		]
// 	};
// 	var ck = new Drive();
// 	ck.loadObj(config);
// 	// $.log.debug(ck.config.list);
// 	var msg = ck.check({
// 		name: "张三",
// 		age: 150,
// 		birthday: '1970-01-01',
// 		headImg: "http://img.png1"
// 	});
// 	$.log.debug(msg);
// }
// 
// test();



