<template>
	<main id="user_account_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}管理组</h5>
					</header>
					<dl>
						<dt>头像</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.avatar"></mm_upload_img></dd>
						<dt>昵称</dt>
						<dd><mm_input type="text" v-model="form.nickname" desc="由2-16个字符组成"></mm_input></dd>
						<dt>用户名</dt>
						<dd><mm_input type="text" v-model="form.username" desc="由6-16位数字或英文组成"></mm_input></dd>
						<dt>密码</dt>
						<dd><mm_input type="password" v-model="form.password" desc="由6-16位数字或英文组成"></mm_input></dd>
						<dt>会员级别</dt>
						<dd><mm_select v-model="form.vip" :options="$to_kv(['', 1, 2, 3, 4, 5])"></mm_select></dd>
						<dt>管理级别</dt>
						<dd><mm_select v-model="form.gm" :options="$to_kv(['', 1, 2, 3, 4, 5])"></mm_select></dd>
						<dt>商户级别</dt>
						<dd><mm_select v-model="form.mc" :options="$to_kv(['', 1, 2, 3, 4, 5])"></mm_select></dd>
						<dt>个性签名</dt>
						<dd><textarea v-model="form.signature" placeholder="由2-16个字符组成"></textarea></dd>
					</dl>
					<footer>
						<div class="mm_group">
							<button class="btn_default" type="button" @click="cancel">取消</button>
							<button class="btn_primary" type="button" @click="submit()">提交</button>
						</div>
					</footer>
				</mm_form>
			</mm_col>
		</mm_grid>
	</main>
</template>

<script>
import mixin from '/src/mixins/page.js';

export default {
	mixins: [mixin],
	components: {},
	data() {
		return {
			url_submit: '/apis/user/account?',
			url_get_obj: '/apis/user/account',
			field: 'user_id',
			query: {
				user_id: 0
			},
			form: {
				user_id: 0,
				// 账户状态
				state: 0,
				// 会员级别
				vip: 0,
				// 管理员级别
				gm: 0,
				// 商家级别
				mc: 0,
				// 推荐人ID
				referee_id: 0,
				// 上次登录时间
				login_time: '',
				// 短验证
				salt: '',
				// 邀请注册码
				invite_code: '',
				// 手机号码
				phone: '',
				// 手机号码认证
				phone_state: 0,
				// 用户名
				username: '',
				// 昵称
				nickname: '',
				// 密码
				password: '',
				// 邮箱
				email: '',
				// 邮箱认证
				email_state: 0,
				// 所在用户组
				user_group: '',
				// 所在管理组
				user_admin: '',
				// 上次登录时的IP地址
				login_ip: '',
				// 个性签名
				signature: '',
				// 头像地址
				avatar: '',
				// 好友
				friends: '',
				// 所在管理组
				admin_group: '',
				// 创建时间
				create_time: ''
			}
		};
	},
	methods: {}
};
</script>

<style>
/* 页面 */
#user_account_form {
}

/* 表单 */
#user_account_form .mm_form {
}

/* 筛选栏栏 */
#user_account_form .mm_filter {
}

/* 操作栏 */
#user_account_form .mm_action {
}

/* 模态窗 */
#user_account_form .mm_modal {
}

/* 表格 */
#user_account_form .mm_table {
}

/* 数据统计 */
#user_account_form .mm_data_count {
}
</style>
