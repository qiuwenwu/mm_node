// const nJwt = require('njwt');
var Http = require('./index.js');
var fs = require("fs");

// async function test3() {
// 	// 将「微信对话开放平台」得到的信息填入
// 	var APPID = "xxx";
// 	var TOKEN = "xxx";
// 	var EncodingAESKey = "xxx";

// 	var claims = {
// 		"username": "username",
// 		"msg": "有什么好听的歌曲?"
// 	};
// 	var jwt = nJwt.create(claims, EncodingAESKey, "HS256");
// 	var token = jwt.compact();

// 	var hp = new Http();
// 	var pm = {
// 		query: token
// 	};
// 	var res = await hp.post('https://openai.weixin.qq.com/openapi/message/' + TOKEN, pm);
// 	console.log(res.body)
// }
// test3();

// async function test2(content, from_user) {.
// 图灵机器人
//	const apikey = "xxx";
// 	var hp = new Http();
// 	var pm = {
// 		"reqType": 0,
// 		"perception": {
// 			"inputText": {
// 				"text": content
// 			},
// 			"selfInfo": {
// 				"location": {
// 					"city": "深圳",
// 					"province": "广东",
// 					"street": "粤海街道"
// 				}
// 			}
// 		},
// 		"userInfo": {
// 			"apiKey": apikey,
// 			"userId": from_user
// 		}
// 	};
// 	//http://192.168.18.199:8000/test/hello
// 	var res = await hp.post("http://openapi.tuling123.com/openapi/api/v2", pm);
// 	console.log(res.body);
// }
// test2("真的", "we21lkjq3l");

// 测试
// async function test() {
// 	var hp = new Http();
// 	// var res = await hp.get("http://www.baidu.com");
// 	// console.log('百度:' + JSON.stringify(res));
// 	res = await hp.post("http://api.bitcentre.com.cn/login", {
// 		'phone': "15817188815",
// 		'password': "asd123"
// 	}, null, 'form');
// 	console.log('登录:' + JSON.stringify(res));
// 	console.log('cookie:', hp.cookie);
// 	var token = hp.cookie.get('x-auth-token').value;
// 	console.log('访问牌:' + token);
// 	res = await hp.get("http://api.bitcentre.com.cn/paper/id?id=1", {
// 		"x-auth-token": token
// 	});
// 	console.log('结果:' + JSON.stringify(res));
// }

// async function test () {
// 	var hp = new Http();
// 	var res = await hp.get_fast('http://www.hao123.com');
// 	console.log(res.body);
// }

// async function test() {
// 	var hp = new Http();
// 	hp.encoding = "binary";
// 	var res = await hp.get('http://localhost:8080/dev/img/logo_gray.png');
// 	fs.writeFile("./logonew.png", res.binary, "binary", function(err) {
// 		if (err) {
// 			console.log("下载失败");
// 		}
// 		console.log("下载成功");
// 	});
// }


async function test () {
	var hp = new Http();
	var url = "http://vip.stock.finance.sina.com.cn/corp/view/vRPD_NewStockIssue.php?page=1&cngem=0&orderBy=NetDate&orderType=desc";
	var res = await hp.get(url);
	console.log(res);
}
test();
