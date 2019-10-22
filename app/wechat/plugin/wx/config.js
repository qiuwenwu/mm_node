var wechat = {
	/**
	 * @description 新建微信连接
	 * @param {String} appid 应用ID 可以从网页获得
	 */
	url(appid) {
		if (!appid) {
			appid = "wx782c26e4c19acffb"
		}

		// 微信服务器 "wx2.qq.com" 或 "weixin.qq.com",
		const w = "wx2.qq.com";
		const u = `https://${w}`;

		// 微信文件服务器
		const o = "file.wx.qq.com";
		const n = `webpush.${w}`;
		const stamp = new Date().stamp();

		return {
			// 获取二维码
			get_qrcode: "https://login.weixin.qq.com/qrcode/{uuid}",
			// 登录
			login: `https://login.${w}/cgi-bin/mmwebwx-bin/login?loginicon=true&uuid={uuid}&tip={tip}&r={timestampB}&_={timestamp}`,
			// 获取登录状态
			login_page: "&fun=new&version=v2&lang=zh_CN&version=v2",
			// 获取用户ID &redirect_uri=https%3A%2F%2F{1}%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage
			get_uuid: `https://login.${w}/jslogin?appid=${appid}&fun=new&lang=zh_CN&_={timestamp}&redirect_uri=`,
			// 验证登录态
			sync_check: `https://${n}/cgi-bin/mmwebwx-bin/synccheck?r={timestampB}&skey={skey}&sid={sid}&uin={uin}&deviceid={deviceid}&synckey={synckey}&_={timestamp}`,
			// 初始化
			init: `${u}/cgi-bin/mmwebwx-bin/webwxinit?r={timestampB}&pass_ticket=`,
			// 预览
			preview: `${u}/cgi-bin/mmwebwx-bin/webwxpreview`,
			// 重新获登录消息
			stat_report: `${u}/cgi-bin/mmwebwx-bin/webwxstatreport?fun=new&lang=zh_CN`,
			// 获取联系人
			get_contact: `${u}/cgi-bin/mmwebwx-bin/webwxgetcontact?pass_ticket={pass_ticket}&skey={skey}&r={timestampB}`,
			// 获取消息
			sync: `${u}/cgi-bin/mmwebwx-bin/webwxsync?sid={sid}&skey={skey}&pass_ticket=`,
			// 批处理获取联系人
			batch_get_contact: `${u}/cgi-bin/mmwebwx-bin/webwxbatchgetcontact?type=ex&r={timestampB}&pass_ticket={pass_ticket}`,
			// 获取图标
			get_icon: `${u}/cgi-bin/mmwebwx-bin/webwxgeticon?seq=0&username={username}&skey={skey}&chatroomid={chatroomid}`,
			// 发送消息
			send_msg: `${u}/cgi-bin/mmwebwx-bin/webwxsendmsg?pass_ticket=`,
			// 发送消息图片
			send_msg_img: `${u}/cgi-bin/mmwebwx-bin/webwxsendmsgimg?msgid={msgid}&type={type}&skey={skey}`,
			// 发送表情
			send_emoticon: `${u}/cgi-bin/mmwebwx-bin/webwxsendemoticon`,
			// 发送应用消息
			send_app_msg: `${u}/cgi-bin/mmwebwx-bin/webwxsendappmsg?fun=async&f=json&pass_ticket=`,
			// 获取头像图片
			get_headimg: `${u}/cgi-bin/mmwebwx-bin/webwxgetheadimg?seq={seq}&username={username}&skey={skey}`,
			// 获取消息图片
			get_msg_img: `${u}/cgi-bin/mmwebwx-bin/webwxgetmsgimg`,
			// 获取媒体
			get_media: `${u}/cgi-bin/mmwebwx-bin/webwxgetmedia`,
			// 获取视频
			get_video: `${u}/cgi-bin/mmwebwx-bin/webwxgetvideo`,
			// 日志输出
			logout: `${u}/cgi-bin/mmwebwx-bin/webwxlogout`,
			// 获取音频
			get_voice: `${u}/cgi-bin/mmwebwx-bin/webwxgetvoice`,
			// 更新群
			update_chat_room: `${u}/cgi-bin/mmwebwx-bin/webwxupdatechatroom`,
			// 创建群
			create_chat_room: `${u}/cgi-bin/mmwebwx-bin/webwxcreatechatroom`,
			// 状态提醒
			status_notify: `${u}/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=zh_CN&pass_ticket=`,
			// 检验网址
			check_url: `${u}/cgi-bin/mmwebwx-bin/webwxcheckurl`,
			// 用户验证
			verify_user: `${u}/cgi-bin/mmwebwx-bin/webwxverifyuser?r={timestampB}&pass_ticket=`,
			// 发送反馈
			feedback: `${u}/cgi-bin/mmwebwx-bin/webwxsendfeedback`,
			// 查找联系人
			search: `${u}/cgi-bin/mmwebwx-bin/webwxsearchcontact`,
			// 日志
			oplog: `${u}/cgi-bin/mmwebwx-bin/webwxoplog`,
			// 获取多媒体
			download_media: `https://${o}/cgi-bin/mmwebwx-bin/webwxgetmedia`,
			// 更新多媒体
			upload_media: `https://${o}/cgi-bin/mmwebwx-bin/webwxuploadmedia`
		}
	}
}
