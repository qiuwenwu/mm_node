const Check = require('./index.js').Check;

async function test() {
	var config = {
		required: "all",
		type: "string",
		string: {
			format: "dateISO"
			// regex: "[0-9]+\.png"
			// extension: "png|gif|jpg|jpeg|bmp"
			// min: 3,
			// max: 255,
			// range: [0, 8]
		}
	};
	var ck = new Check(config);
	var msg = ck.run('1970-01-01 00:61:61');
	console.log(msg);
	var msg = ck.run('1970-01-01 00:59:59');
	console.log(msg);
}

test();