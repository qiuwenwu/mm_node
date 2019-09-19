const Sql = require('./index.js');

async function test() {
	var sql = new Sql();
	var paramDt = {
		a: 123,
		b: "32|23",
		word: "bbs"
	};
	var sqlDt = {
		word: "(`title` like '%{0}%' || `desc` like '%{0}%')"
	};
	var sql = sql.tpl_query(paramDt, sqlDt);
	console.log(sql);
}

test();

async function test_body() {
	var sql = new Sql();
	var paramDt = {
		a: -123,
		b: "bbs"
	};
	var sqlDt = {
		a: "`a` = `a` + {0}"
	};
	var sql = sql.tpl_body(paramDt, sqlDt);
	console.log(sql);
}
test_body();
