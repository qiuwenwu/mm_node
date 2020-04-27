const fs = require('fs');

var sql = $.mysql_admin('sys', __dirname);
sql.setConfig($.config.mysql);
sql.open();

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var files = req.files;
	
	var file = files['file'];
	// console.log(files['image']);
	console.log(file);
	
	const reader = fs.createReadStream(file.path);
	const ext = file.name.split('.').pop();
	var name = Math.random().toString().replace('0.', '');
	const stream = fs.createWriteStream("../../plugin/pc/static/upload/".fullname(__dirname) + `${name}.${ext}`);
	reader.pipe(stream);
	return $.ret.obj({
		file: "/pc/upload/" + `${name}.${ext}`
	});
};

exports.main = main;