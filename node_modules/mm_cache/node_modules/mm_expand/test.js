require('./index.js');

// var arr = [{name: "test", age: 15 },{name: "bbs", age: 33 }];
// console.log(arr.getVal('age', { name: 'test' }));

// console.log("../".fullname(__dirname));
// console.log("./".fullname(__dirname));
// console.log("/".fullname());


var drive = {
	name: "test",
	config: {
		onOff: false,
		sort: 10,
		param: {
			add: {
				desc: "这是添加",
				query: ["name"]
			},
			del: {
				desc: "这是删除",
				query: ["name"]
			},
			set: {
				desc: "这是修改",
				query: ["name"]
			}
		},
		list: [{
				name: "张三",
				age: 18
			},
			{
				name: "李四",
				age: 24
			},
			{
				name: "王五",
				age: 35
			}
		]
	}
};

// function test_get() {
// var query = {
// 	config: {
// 		param: {
// 			add: true
// 		}
// 	}
// };
// var ret = $.get(drive, query);

// var query2 = ["config", "param", "add"];
// var ret = $.get(drive, query2);

// var query2_2 = ["config", "param", {"add": true, "set": true }];
// var ret = $.get(drive, query2_2);

// var query2_3 = {
// 	config: {
// 		param: ["add", "desc"]
// 	}
// };
// var ret = $.get(drive, query2_3);

// var query3 = {
// 	"config": ["param", {"add": true} ]
// };
// var ret = $.get(drive, query3);

// var query4 = {
// 	config: [{
// 			param: {
// 				set: ""
// 			}
// 		},
// 		{
// 			param: {
// 				add: "",
// 				set: ""
// 			}
// 		}
// 	]
// };
// var ret = $.get(drive, query4);

// var query5 = {
// 	config: "param"
// };
// var ret = $.get(drive, query5);
// 	console.log($.toJson(ret, true));
// }
// test_get();

// function test_add() {
// var value1 = {
// 	config: {
// 		param: {
// 			get: {
// 				desc: "这是添加",
// 				query: ["id", "name"]
// 			}
// 		}
// 	}
// };
// $.add(drive, null, value1);

// var value2 = {
//	test: "这是添加1111",
// 	desc: "这是添加哦",
// };
// $.add(drive, ["config", "param", "add"], value2);
// console.log($.toJson(drive, true));

// 	var value2 = {
// 		add: {
// 			test: "add"
// 		},
// 		set: {
// 			test: "set"
// 		}
// 	};
// 	var ret = $.add(drive, ["config", "param", {
// 		add: true,
// 		set: true
// 	}], value2);

// 	console.log($.toJson(drive, true));
// }

// test_add();


// function test_add() {
// var value1 = {
// 	config: {
// 		param: {
// 			set: {
// 				desc: "这是添加111",
// 				query: ["id", "name"],
// 				test: ""
// 			}
// 		}
// 	}
// };
// $.set(drive, null, value1);

// var value2 = {
// 	test: "这是修改1111",
// 	desc: "这是修改哦333",
// };
// $.set(drive, ["config", "param", "set"], value2);
// console.log($.toJson(drive, true));

// var value2 = {
// 	add: {
// 		test: "add",
// 		desc: "test"
// 	},
// 	set: {
// 		test: "set",
// 		desc: "test"
// 	}
// };
// var ret = $.set(drive, ["config", "param", {
// 	add: true,
// 	set: true
// }], value2);

// 	console.log($.toJson(drive, true));
// }


// test_add();


function test_del() {
	// $.del(drive, null, null);

	// $.del(drive, ["config", "param", "set"], null);
	
	// $.del(drive, ["config", "param", "set"], ["desc", "query"]);
	// var ret = $.del(drive, ["config", "param", {
	// 	add: true,
	// 	set: true
	// }], null);

	// $.del(drive, ["config", "param"], { add: "query", set: "desc" });
	// $.del(drive, ["config", "param"], { add: {"desc": true }, set: "desc" });
	// $.del(drive, "config" , { config: "sort"});
	$.del(drive, { config: "param" }, { config: { param: "add" } });
	console.log($.toJson(drive, true));
	
	var arr = ["123","test"];
	var arr2 = ["1234","test"];
	console.log(arr.add(arr2));
}

test_del();
