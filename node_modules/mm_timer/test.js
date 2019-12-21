const Timer = require('./index.js');

async function test() {
	var timer = new Timer();
	timer.config.num = 100;
	// timer.config.date_start = "2019-08-08 09:32";
	// timer.config.date_end = "2019-08-08 09:33";
	// timer.config.time = "09:36";
	await timer.run(function() {
		console.log(timer.num);
	});
	// timer.clear(3000); // 等待5000毫秒后，清除定时器。
}
test();