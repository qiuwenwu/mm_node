const Tpl = require('./index.js');

async function test() {
	var tpl = new Tpl();
	var view = tpl.render("<a>${model.test} + 123123</a>", { test: 123 });
	console.log(view);
}


async function test() {
	var tpl = new Tpl();
	var view = tpl.render("<a><% for(var i = 0; i < model.arr.length; i++) { %><%=model.arr[i]%><% } %> + 123123</a>", { arr: [123,234] });
	console.log(view);
}
test();