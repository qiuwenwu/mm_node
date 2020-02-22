const Check = require('./index.js');

// async function test() {
// 	var config = {
// 		required: "all",
// 		type: "string",
// 		string: {
// 			format: "dateISO"
// 			// regex: "[0-9]+\.png"
// 			// extension: "png|gif|jpg|jpeg|bmp"
// 			// min: 100,
// 			// max: 10,
// 			// range: [0, 8]
// 		}
// 	};
// 	var ck = new Check(config);
// 	var msg = ck.run('1970-01-01 00:61:61');
// 	console.log(msg);
// 	msg = ck.run('1970-01-01 00:59:59');
// 	console.log(msg);
// 	msg = ck.run('1970.png');
// 	console.log(msg);
// }

async function test() {
	var config = {
		title: "点赞",
		name: "zan",
		type: "array",
		array: {
			type: "object",
			object: [{
				title: "数量",
				name: "num",
				type: "object",
				number: {
					range: [3, 10]
				}
			}]
		}
	};
	var ck = new Check(config);
	// msg = ck.run([1, 2]);
	// console.log(msg);
	// var msg = ck.run(["成员1", "成员2"]);
	var msg = ck.run([{
		num: "成员1"
	}, {
		num: "成员2"
	}]);
	console.log(msg);
}


// async function test() {
// 	var config = {
// 		title: "点赞",
// 		name: "zan",
// 		type: "object",
// 		object: [{
// 			title: "数量",
// 			name: "num",
// 			type: "number",
// 			number: {
// 				range: [3, 10]
// 			}
// 		}]
// 	};
// 	var ck = new Check(config);
// 	// var msg = ck.run(["成员1", "成员2"]);
// 	// console.log(msg);
// 	// msg = ck.run([1, 2]);
// 	// console.log(msg);
// 	var msg = ck.run({
// 		num: 2
// 	});
// 	console.log(msg);
// }
test();
