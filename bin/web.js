const path = require('path');
const Koa = require('koa');
const statics = require('mm_statics');
const bodyParser = require("koa-bodyparser");
const xmlParser = require("mm_xml");
const session = require('mm_session');
// const compress = require('koa-compress');
const websocket = require('koa-websocket');

module.exports = function() {
	// 实例化Koa函数
	var app = websocket(new Koa());

	// app.use(
	// 	compress({
	// 		filter: function(content_type) {
	// 			// 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
	// 			return /text/i.test(content_type);
	// 		},
	// 		// 阀值，当数据超过1kb的时候，可以压缩
	// 		threshold: 1024,
	// 		// zlib是node的压缩模块
	// 		flush: require('zlib').Z_SYNC_FLUSH
	// 	})
	// );

	/// 设置session 保存时长2小时
	app.use(session({
		maxAge: 7200
	}));

	// 处理静态文件
	app.use(statics(
		path.join(__dirname, './static'), {
			maxAge: 60 * 60 * 24 * 7,
			gzip: true,
			brotli: true
		}));

	// 解析 text/xml
	app.use(xmlParser());

	// 解析 application/json、application/x-www-form-urlencoded、text/plain
	app.use(bodyParser({
		enableTypes: ['json', 'form', 'text']
	}));
	return app;
}
