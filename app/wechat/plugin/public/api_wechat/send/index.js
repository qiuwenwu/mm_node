var appId = "wx42e2f153a0f09971";
var appSecret = "HrsCfFmKxvTqDooMfHOOnRhxrcHEuqEYHwoPzXxoGpW";

/**
 * 获取临时访问牌
 */
async function get_token() {
	var res = await http.get(
		`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`).body;
	if (res) {
		var json = res.toJson();
		var token = json.access_token;
		$.cache.set('wechat_' + appId, token, json.expires_in);
		return token;
	}
	return null;
}

/**	
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var http = new $.Http();

	var token = $.cache.get('wechat_' + appId);

	if (!token) {
		token = await get_token();
	}

	var req = ctx.request;
	return body;
};

var data = {
	// 添加客服帐号 POST
	kfaccount_add: {
		title: "添加客服帐号 POST",
		url: "https://api.weixin.qq.com/customservice/kfaccount/add?access_token={0}",
		demo: {
			"kf_account": "test1@test",
			"nickname": "客服1",
			"password": "pswmd5"
		}
	},
	// 修改客服帐号 POST
	kfaccount_update: {
		title: "修改客服帐号 POST",
		url: "https://api.weixin.qq.com/customservice/kfaccount/update?access_token={0}",
		demo: {
			"kf_account": "test1@test",
			"nickname": "客服1",
			"password": "pswmd5"
		}
	},
	// 删除客服账号 GET
	kfaccount_del: {
		title: "删除客服账号 GET",
		url: "https://api.weixin.qq.com/customservice/kfaccount/del?access_token={0}"
	},
	// 设置客服帐号的头像 POST/FORM
	upload_headimg: {
		title: "设置客服帐号的头像 POST/FORM",
		url: "http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token={0}&kf_account=KFACCOUNT",
		demo: {
			file: ""
		}
	},
	// 获取所有客服账号 GET
	getkflist: {
		title: "获取所有客服账号 GET",
		url: "https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token={0}"
	},
	// 发送消息 POST
	send: {
		title: "发送消息 POST",
		url: "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={0}"
	},
	// 发送消息状态 POST
	typing: {
		title: "发送消息状态 POST",
		url: "https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token={0}",
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
}

exports.main = main;
