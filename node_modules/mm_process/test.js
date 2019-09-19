const Process = require('./index.js').Process;

async function test () {
	var p = new Process(__dirname);
	p.run('./demo.js', ['a', 'b', 123]);
}

test ();