/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	
	var http = new $.Http();
	var token = req.header.token;
	if (!token) {
		var param = {
			phone: "15817188815",
			password: "asd123"
		};
		var ret = await http.post('http://192.168.18.100/login', param, {
			'Referer': 'http://192.168.18.199'
		}, 'form');
		var r = ret.body;
		if (r) {
			var json = r.toJson();
			if (json.code === 0) {
				token = json.data;
				var option = {
					domain: 'localhost',
					path: '/index', //cookie写入的路径
					maxAge: 1000 * 60 * 60 * 1,
					expires: new Date('2018-07-06'),
					httpOnly: false,
					overwrite: false
				};
				ctx.cookies.set('x-auth-token', token, option);
			}
		}
	}
	
	if (token) {
		ret = await http.post('http://192.168.18.200/user/', param, {
			'Referer': 'http://192.168.18.199',
			"x-auth-token": token
		}, 'form');
	}
	return ret.body;
};

exports.main = main;
