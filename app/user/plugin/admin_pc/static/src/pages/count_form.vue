<template>
	<main id="user_count_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户统计</h5>
					</header>
					<dl>
						<dt>等级</dt>
						<dd><mm_number v-model="form.level" :min="0" :max="1000" ></mm_number></dd>
						<dt>IQ智商</dt>
						<dd><mm_number v-model="form.iq" :min="80" :max="200" ></mm_number></dd>
						<dt>信用度</dt>
						<dd><mm_number v-model="form.credit" :min="0" :max="2147483647" ></mm_number></dd>
						<dt>积分</dt>
						<dd><mm_number v-model="form.credit_points" :min="0" :max="2147483647" ></mm_number></dd>
						<dt>经验值</dt>
						<dd><mm_number v-model="form.exp" :min="0" :max="2147483647" ></mm_number></dd>
						<dt>钱</dt>
						<dd><mm_number v-model="form.money" ></mm_number></dd>
						<dt>货币</dt>
						<dd><mm_number v-model="form.coin" ></mm_number></dd>
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
			url_submit: '/apis/user/count?',
			url_get_obj: '/apis/user/count',
			field: 'user_id',
			query: {
				user_id: 0
			},
			form: {
				user_id: 0,
				// 等级
				level: 0,
				// IQ智商
				iq: 0,
				// 信用度
				credit: 0,
				// 积分
				credit_points: 0,
				// 经验值
				exp: 0,
				// 拓展积分1
				extcredits1: 0,
				// 拓展积分2
				extcredits2: 0,
				// 拓展积分3
				extcredits3: 0,
				// 拓展积分4
				extcredits4: 0,
				// 拓展积分5
				extcredits5: 0,
				// 拓展积分6
				extcredits6: 0,
				// 拓展积分7
				extcredits7: 0,
				// 拓展积分8
				extcredits8: 0,
				// 钱
				money: 0,
				// 货币
				coin: 0
			}
		};
	},
	methods: {}
};
</script>

<style>
/* 页面 */
#user_count_form {
}

/* 表单 */
#user_count_form .mm_form {
}

/* 筛选栏栏 */
#user_count_form .mm_filter {
}

/* 操作栏 */
#user_count_form .mm_action {
}

/* 模态窗 */
#user_count_form .mm_modal {
}

/* 表格 */
#user_count_form .mm_table {
}

/* 数据统计 */
#user_count_form .mm_data_count {
}
</style>
