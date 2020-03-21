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
	// 添加客服帐号 POST
	add: {
		title: "添加客服帐号 POST",
		url: "https://api.weixin.qq.com/customservice/kfaccount/add?access_token='{0}'",
		demo: {
			"kf_account": "test1@test",
			"nickname": "客服1",
			"password": "pswmd5"
		}
	},
	// 修改客服帐号 POST
	update: {
		title: "修改客服帐号 POST",
		url: "https://api.weixin.qq.com/customservice/kfaccount/update?access_token='{0}'",
		demo: {
			"kf_account": "test1@test",
			"nickname": "客服1",
			"password": "pswmd5"
		}
	},
	// 删除客服账号 GET
	del: {
		title: "删除客服账号 GET",
		url: "https://api.weixin.qq.com/customservice/kfaccount/del?access_token='{0}'"
	},
	// 设置客服帐号的头像 POST/FORM
	headimg: {
		title: "设置客服帐号的头像 POST/FORM",
		url: "http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token={0}&kf_account=KFACCOUNT",
		demo: {
			file: ""
		}
	},
	// 获取所有客服账号 GET
	list: {
		title: "获取所有客服账号 GET",
		url: "https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token='{0}'"
	},
	// 发送消息 POST
	send: {
		title: "发送消息 POST",
		url: "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='{0}'"
	},
	// 发送消息状态 POST
	typing: {
		title: "发送消息状态 POST",
		url: "https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token='{0}'",
		demo: {
			"touser": "OPENID",
			"command": "Typing"
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

var message_type = {
	// 文本
	text: {
		"touser": "OPENID",
		"msgtype": "text",
		"text": {
			"content": "Hello World"
		}
	},
	// 图片
	image: {
		"touser": "OPENID",
		"msgtype": "image",
		"image": {
			"media_id": "MEDIA_ID"
		}
	},
	// 音频
	voice: {
		"touser": "OPENID",
		"msgtype": "voice",
		"voice": {
			"media_id": "MEDIA_ID"
		}
	},
	// 视频
	video: {
		"touser": "OPENID",
		"msgtype": "video",
		"video": {
			"media_id": "MEDIA_ID",
			"thumb_media_id": "MEDIA_ID",
			"title": "TITLE",
			"description": "DESCRIPTION"
		}
	},
	// 音乐
	music: {
		"touser": "OPENID",
		"msgtype": "music",
		"music": {
			"title": "MUSIC_TITLE",
			"description": "MUSIC_DESCRIPTION",
			"musicurl": "MUSIC_URL",
			"hqmusicurl": "HQ_MUSIC_URL",
			"thumb_media_id": "THUMB_MEDIA_ID"
		}
	},
	// 发送图文（点击跳转到外链）
	news: {
		"touser": "OPENID",
		"msgtype": "news",
		"news": {
			"articles": [{
				"title": "Happy Day",
				"description": "Is Really A Happy Day",
				"url": "URL",
				"picurl": "PIC_URL"
			}]
		}
	},
	// 发送图文（点击跳转到图文消息页面）
	mpnews: {
		"touser": "OPENID",
		"msgtype": "mpnews",
		"mpnews": {
			"media_id": "MEDIA_ID"
		}
	},
	// 发送菜单
	msgmenu: {
		"touser": "OPENID",
		"msgtype": "msgmenu",
		"msgmenu": {
			"head_content": "您对本次服务是否满意呢? ",
			"list": [{
					"id": "101",
					"content": "满意"
				},
				{
					"id": "102",
					"content": "不满意"
				}
			],
			"tail_content": "欢迎再次光临"
		}
	},
	// 发送卡券
	wxcard: {
		"touser": "OPENID",
		"msgtype": "wxcard",
		"wxcard": {
			"card_id": "123dsdajkasd231jhksad"
		}
	},
	// 发送小程序卡片
	miniprogrampage: {
		"touser": "OPENID",
		"msgtype": "miniprogrampage",
		"miniprogrampage": {
			"title": "title",
			"appid": "appid",
			"pagepath": "pagepath",
			"thumb_media_id": "thumb_media_id"
		}
	}
};

exports.post = post;
exports.main = main;
