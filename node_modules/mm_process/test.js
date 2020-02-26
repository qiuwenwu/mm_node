const Process = require('./index.js');

async function test () {
	// 方法2
	// var p = new Process(__dirname);
	// p.run('./child2.js', ['a', 'b', 123]);
	
	// 方法1
	var p = new Process({});
	p.add('./child.js');
	var childs = p.childs;
	p.request('test_sub', '你好!', function(res){
		console.log('返回了:', res);
	}, p.pids[0]);
}

test();