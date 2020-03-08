<template>
	<main id="account_form">
		<header></header>
		<section></section>
		<footer></footer>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_obj: "",
				form: {
					// 短验证
					"salt": "",
					// 邀请注册码
					"invite_code": "",
					// 用户名
					"username": "",
					// 密码
					"password": "",
					// 账户状态
					"state": 0,
					// 会员级别
					"vip": 0,
					// 管理员级别
					"gm": 0,
					// 商家级别
					"mc": 0,
					// 推荐人ID
					"referee_id": 0,
					// 创建时间
					"create_time": "",
					// 上次登录时间
					"login_time": "",
					// 手机号码
					"phone": "",
					// 手机号码认证
					"phone_state": 0,
					// 昵称
					"nickname": "",
					// 邮箱
					"email": "",
					// 邮箱认证
					"email_state": 0,
					// 所在用户组
					"user_group": "",
					// 所在管理组
					"user_admin": "",
					// 上次登录时的IP地址
					"login_ip": "",
					// 个性签名
					"signature": "",
					// 头像地址
					"avatar": "",
					// 好友
					"friends": "",
					// 所在管理组
					"admin_group": ""
				},
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * @description 查询数据
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get: function get(query, func) {
				this.get_main(query, func);
				// 如果页面需要其他查询，可将函数写在这
			}
		}
	}
</script>

<style>
	/* {title} */
	#id {}

	/* 搜索栏 */
	#id #search {}

	/* 排序栏 */
	#id #sort {}

	/* 列表 */
	#id #obj {}
</style>
