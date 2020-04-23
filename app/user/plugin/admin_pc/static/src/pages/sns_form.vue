<template>
	<main id="user_sns_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}社交账户</h5>
					</header>
					<dl>
						<dt>MM号</dt>
						<dd><mm_input type="text" v-model="form.mm"></mm_input></dd>
						<dt>MM认证</dt>
						<dd><mm_switch v-model="form.mm_state"></mm_switch></dd>
						<dt>QQ号</dt>
						<dd><mm_input type="text" v-model="form.qq"></mm_input></dd>
						<dt>QQ认证</dt>
						<dd><mm_switch v-model="form.qq_state"></mm_switch></dd>
						<dt>微信号</dt>
						<dd><mm_input type="text" v-model="form.wechat"></mm_input></dd>
						<dt>微信认证</dt>
						<dd><mm_switch v-model="form.wechat_state"></mm_switch></dd>
						<dt>百度账号</dt>
						<dd><mm_input type="text" v-model="form.baidu"></mm_input></dd>
						<dt>百度认证</dt>
						<dd><mm_switch v-model="form.baidu_state"></mm_switch></dd>
						<dt>淘宝账号</dt>
						<dd><mm_input type="text" v-model="form.taobao"></mm_input></dd>
						<dt>淘宝认证</dt>
						<dd><mm_switch v-model="form.taobao_state"></mm_switch></dd>
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
			url_submit: '/apis/user/sns?',
			url_get_obj: '/apis/user/sns',
			field: 'user_id',
			query: {
				user_id: 0
			},
			form: {
				user_id:0,
				// QQ号
				qq: '',
				// QQ认证
				qq_state: 0,
				// 微信号
				wechat: '',
				// 微信认证
				wechat_state: 0,
				// MM号
				mm: '',
				// MM认证
				mm_state: 0,
				// 百度账号
				baidu: '',
				// 百度认证
				baidu_state: 0,
				// 淘宝账号
				taobao: '',
				// 淘宝认证
				taobao_state: 0
			}
		};
	},
	methods: {
		submit_before(param){
			var pm = Object.assign({},param);
			pm.qq_state += "";
			pm.mm_state += "";
			pm.wechat_state += "";
			pm.baidu_state += "";
			pm.taobao_state += "";
			return pm;
		}
	}
};
</script>

<style>
/* 页面 */
#user_sns_form {
}

/* 表单 */
#user_sns_form .mm_form {
}

/* 筛选栏栏 */
#user_sns_form .mm_filter {
}

/* 操作栏 */
#user_sns_form .mm_action {
}

/* 模态窗 */
#user_sns_form .mm_modal {
}

/* 表格 */
#user_sns_form .mm_table {
}

/* 数据统计 */
#user_sns_form .mm_data_count {
}
</style>
