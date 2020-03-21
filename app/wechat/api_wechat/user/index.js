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
	var query = req.query
	var method = query['method'];
	if (!method) {
		return $.ret.error(30001, "方法(method)参数不能为空");
	}
	var param = req.body;
	if (Object.keys(param).length > 0) {
		return await post(method, param, AppId, db, query);
	} else {
		return await post(method, null, AppId, db, query);
	}
};

async function post(method, param, AppId, db, query) {
	var token = await get_token(AppId, db);
	if (!token) {
		return $.ret.error(40001, "身份验证失败");
	} else {
		var item = data[method];
		if (!item) {
			return $.ret.error(70001, "错误的方法(method)");
		}
		var url = item.url.replace("{0}", token);
		for (var k in query) {
			url = url.replace('{' + k + '}', query[k]);
		}
		url = url.replace(/\{[a-zA-Z0-9_]+\}/, '');
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
	// 添加用户标签 POST 一个公众号，最多可以创建100个标签
	add_tag: {
		title: "添加用户标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/create?access_token='{0}'",
		demo: {
			"tag": {
				//标签名
				"name": "广东"
			}
		}
	},
	// 获取标签 POST
	get_tag: {
		title: "获取标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/get?access_token='{0}'",
		demo: {
			"tag": {
				//标签名
				"name": "广东"
			}
		}
	},
	// 编辑标签 POST
	set_tag: {
		title: "编辑标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/update?access_token='{0}'",
		demo: {
			"tag": {
				"id": 134,
				"name": "广东人"
			}
		}
	},
	// 删除标签 POST
	del_tag: {
		title: "删除标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/delete?access_token='{0}'",
		demo: {
			"tag": {
				"id": 134
			}
		}
	},
	// 获取标签下的用户 POST
	get_tag_user: {
		title: "获取标签下的用户 POST",
		url: "https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token='{0}'",
		demo: {
			"tagid": 134,
			// 第一个拉取的OPENID，不填默认从头开始拉取  
			"next_openid": ""
		},
	},
	// 批量给用户打标签 POST
	set_tag_user: {
		title: "批量给用户打标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token='{0}'",
		demo: {
			//粉丝列表
			"openid_list": [
				"ocYxcuAEy30bX0NXmGn4ypqx3tI0",
				"ocYxcuBt0mRugKZ7tGAHPnUaOW7Y"
			],
			"tagid": 134
		}
	},
	// 批量取消用户标签 POST
	del_tag_user: {
		title: "批量取消用户标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token='{0}'",
		demo: {
			// 粉丝列表  
			"openid_list": [
				"ocYxcuAEy30bX0NXmGn4ypqx3tI0",
				"ocYxcuBt0mRugKZ7tGAHPnUaOW7Y"
			],
			"tagid": 134
		}
	},
	// 获取用户身上的标签 POST
	user_tag: {
		title: "获取用户身上的标签 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token='{0}'",
		demo: {
			"openid": "ocYxcuBt0mRugKZ7tGAHPnUaOW7Y"
		}
	},
	// 设置用户备名 POST
	user_remark: {
		title: "设置用户备名 POST",
		url: "https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token='{0}'",
		demo: {
			"openid": "oDF3iY9ffA-hqb2vVvbr7qxf6A0Q",
			"remark": "pangzi"
		}
	},
	// 获取用户基本信息 GET
	user_info: {
		title: "获取用户基本信息 GET",
		url: "https://api.weixin.qq.com/cgi-bin/user/info?access_token={0}&openid={openid}&lang=zh_CN"
	},
	// 批量获取用户信息 POST
	batch_get: {
		title: "批量获取用户信息 POST",
		url: "https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token='{0}'",
		demo: {
			"user_list": [{
					"openid": "otvxTs4dckWG7imySrJd6jSi0CWE",
					"lang": "zh_CN"
				},
				{
					"openid": "otvxTs_JZ6SEiP0imdhpi50fuSZg",
					"lang": "zh_CN"
				}
			]
		}
	},
	// 获取用户列表 GET
	list: {
		title: "获取用户列表 GET",
		url: "https://api.weixin.qq.com/cgi-bin/user/get?access_token={0}&next_openid={next_openid}"
	},
	// 获取黑名单 GET
	get_black_list: {
		title: "获取黑名单 GET",
		url: "https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token='{0}'",
		demo: {
			"begin_openid": "OPENID1"
		}
	},
	// 拉进黑名单 POST
	add_black_list: {
		title: "拉进黑名单 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token='{0}'",
		demo: {
			"openid_list": ["OPENID1", "OPENID2"]
		}
	},
	// 取消黑名单 POST
	del_black_list: {
		title: "拉进黑名单 POST",
		url: "https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token='{0}'",
		demo: {
			"openid_list": ["OPENID1", "OPENID2"]
		}
	},
	// 返回
	return_success: {
		demo: {
			"errcode": 0,
			"errmsg": "ok"
		}
	}
};

exports.post = post;
exports.main = main;
