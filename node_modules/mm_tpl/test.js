const Tpl = require('./index.js').Tpl;

async function test() {
	var tpl = new Tpl();
	var view = tpl.render("<a>${model.test} + 123123</a>", { test: 123 });
	console.log(view);
}
test();