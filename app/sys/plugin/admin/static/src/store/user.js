export default {
	state: function() {
		return {
			// 临时访问牌
			"token": "",
			// 用户名
			"username": "",
			// 推荐人ID
			"referee_id": 0,
			// 会员级别
			"vip": 0,
			// 管理员级别
			"gm": 0,
			// 商家级别
			"mc": 0,
			// 手机号码
			"phone": "",
			// 手机号码认证
			"phone_state": 0,
			// 邮箱
			"email": "",
			// 邮箱认证
			"email_state": 0,
			// 上次登录时的IP地址
			"login_ip": "",
			// 上次登录时间
			"login_time": "",
			// 所在用户组
			"user_group": "",
			// 所在管理组
			"admin_group": "",
			// 个性签名
			"signature": "",
			// 昵称
			"nickname": "",
			// 头像地址
			"avatar": "/img/avatar.png",
			// 邀请注册码
			"invite_code": "",
			// 好友
			"friends": "",
			// 账户状态
			"state": 0
		};
	},
	mutations: {
		set(state, data) {
			$.push(state, data);
		},
		login(state, data) {
			$.db.set("token", data.token, 120);
		},
		logout(state, data) {
			$.obj.clear(state);
			$.db.del("token");
		}
	},
	actions: {},
	getters: {}
};
