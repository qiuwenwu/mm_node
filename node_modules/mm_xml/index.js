/**
 * @fileOverview xml序列化、反序列化类
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
const toXml = require('./xml-parser');
const raw = require('raw-body');

/**
 * @description xml转为对象
 * @param {String} str
 */
function xml2Json(str) {
	return new Promise((resolve, reject) => {
		try {
			var ret = str.toXml();
			resolve({
				body: ret,
				bodyStr: str
			});
		} catch (e) {
			reject(e)
		}
	});
}

/**
 * @description 
 * @param {Object} request
 */
function parse(request, options) {
	options = Object.assign({
		limit: '4mb',
		encoding: 'utf8',
		xmlOptions: {}
	}, options)
	const len = request.headers['content-length']
	if (len) {
		options.length = len;
	}
	return raw(request, options)
		.then(str => {
			return xml2Json(str).catch(err => {
				err = typeof err === 'string' ? new Error(err) : err
				err.status = 400;
				err.body = str;
				throw err
			});
		})
}

function Xml(options) {
	if (typeof options !== 'object') {
		options = {}
	}
	const bodyKey = options.key || 'body'
	return async function(ctx, next) {
		/**
		 * only parse and set ctx.request[bodyKey] when
		 * 1. type is xml (text/xml and application/xml)
		 * 2. method is post/put/patch
		 * 3. ctx.request[bodyKey] is undefined
		 */
		if (ctx.request[bodyKey] === undefined && /^(POST|PUT|PATCH)$/i.test(ctx.method)) {
			var type = ctx.header['content-type'];
			if(type && type.indexOf('xml') !== -1) {
				if (!options.encoding && ctx.request.charset) {
					options.encoding = ctx.request.charset
				}
				await parse(ctx.req, options).then(data => {
					ctx.request[bodyKey] = data.body;
					ctx.request.bodyStr = data.bodyStr;
				}).catch(err => {
					if (options.onerror) {
						options.onerror(err, ctx)
					}
					// throw error by default
					else {
						throw err
					}
				});
				await next();
				var res = ctx.response;
				var body = ctx.response.body;
				if (typeof(body) == 'object' && res.type.indexOf('xml') !== -1) {
					res.body = toXml(body);
				}
				return;
			}
		}
		await next();
	}
};

module.exports = Xml;
