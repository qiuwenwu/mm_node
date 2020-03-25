const get_token = require('../../core/common.js').get_token;
var http = new $.Http();

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器, 如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var arr = ctx.path.split('/');
	var AppId = arr[arr.length - 1];
	if (!AppId) {
		return "路径格式不正确, 应该为: http://robot.elins.cn/api/wechat_send/{AppId}";
	}

	var req = ctx.request;
	var method = req.query['method'];
	if (!method) {
		return $.ret.error(30001, "方法(method)参数不能为空");
	}
	var param = req.body;
	if (Object.keys(param).length > 0) {
		return await post(method, param, AppId, db);
	} else {
		return await post(method, null, AppId, db);
	}
};

async function post(method, param, AppId, db) {
	var token = await get_token(AppId, db);
	if (!token) {
		return $.ret.error(40001, "身份验证失败");
	} else {
		var item = data[method];
		if (!item) {
			return $.ret.error(70001, "错误的方法(method)");
		}
		var url = item.url.replace("{0}", token);
		if (param) {
			var res = await http.post(url, param);
			return res.body;
		} else {
			var res = await http.get(url);
			return res.body;
		}
	}
}

var data = {
	// 创建菜单 POST
	create: {
		title: "创建菜单 POST",
		url: "https://api.weixin.qq.com/cgi-bin/menu/create?access_token='{0}'",
		demo: {
			"button": [{
					"type": "click",
					"name": "今日歌曲",
					"key": "V1001_TODAY_MUSIC"
				},
				{
					"name": "菜单",
					"sub_button": [{
							"type": "view",
							"name": "搜索",
							"url": "http://www.soso.com/"
						},
						{
							"type": "miniprogram",
							"name": "wxa",
							"url": "http://mp.weixin.qq.com",
							"AppId": "wx286b93c14bbf93aa",
							"pagepath": "pages/lunar/index"
						},
						{
							"type": "click",
							"name": "赞一下我们",
							"key": "V1001_GOOD"
						}
					]
				}
			]
		}
	},
	// 删除所有菜单 GET
	delete: {
		title: "删除所有菜单 GET",
		url: "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token='{0}'"
	},
	// 查询菜单 GET
	info: {
		title: "查询菜单 GET",
		url: "https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token='{0}'"
	},
	// 获取自定义菜单设置 POST
	addconditional: {
		title: "获取自定义菜单设置 POST",
		url: "https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token='{0}'",
		demo: {
			"button": [{
					"type": "click",
					"name": "今日歌曲",
					"key": "V1001_TODAY_MUSIC"
				},
				{
					"name": "菜单",
					"sub_button": [{
							"type": "view",
							"name": "搜索",
							"url": "http://www.soso.com/"
						},
						{
							"type": "miniprogram",
							"name": "wxa",
							"url": "http://mp.weixin.qq.com",
							"AppId": "wx286b93c14bbf93aa",
							"pagepath": "pages/lunar/index"
						},
						{
							"type": "click",
							"name": "赞一下我们",
							"key": "V1001_GOOD"
						}
					]
				}
			],
			"matchrule": {
				"tag_id": "2",
				"sex": "1",
				"country": "中国",
				"province": "广东",
				"city": "广州",
				"client_platform_type": "2",
				"language": "zh_CN"
			}
		}
	},
	// 获取自定义菜单设置 POST
	get: {
		title: "获取自定义菜单设置 POST",
		url: "https://api.weixin.qq.com/cgi-bin/menu/get?access_token='{0}'"
	},
	// 返回
	return_success: {
		demo: {
			"errcode": 0,
			"errmsg": "ok"
		}
	}
};

exports.main = main;
