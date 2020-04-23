<template>
	<main id="user_group_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户组</h5>
					</header>
					<dl>
						<dt>图标</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon"></mm_upload_img></dd>
						<dt>用户名称</dt>
						<dd><mm_input type="text" v-model="form.name"></mm_input></dd>
						<dt>显示顺序</dt>
						<dd><mm_number v-model="form.display"></mm_number></dd>
						<dt>等级划分</dt>
						<dd><mm_number v-model="form.level"></mm_number></dd>
						<dt>下级用户组</dt>
						<dd><mm_select v-model="form.next_group_id" :options="next_group"></mm_select></dd>
						<dt>升级所需经验</dt>
						<dd><mm_number v-model="form.exp"></mm_number></dd>
						<dt>折扣</dt>
						<dd><mm_number v-model="form.discount"></mm_number></dd>
						<dt>奖励比例</dt>
						<dd><mm_number type="text" v-model="form.bonus"></mm_number></dd>
						<dt>应用</dt>
						<dd><mm_input type="text" v-model="form.app"></mm_input></dd>
						<dt>描述</dt>
						<dd><textarea v-model="form.description"></textarea></dd>
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
			url_submit: '/apis/user/group?',
			url_get_obj: '/apis/user/group',
			field: 'group_id',
			query: {
				group_id: 0
			},
			form: {
				group_id: 0,
				// 用户名称
				name: '',
				// 显示顺序
				display: 0,
				// 等级划分
				level: 0,
				// 下级用户组ID
				next_group_id: 0,
				// 升级所需经验
				exp: 0,
				// 折扣
				discount: 0,
				// 奖励比例
				bonus: 0,
				// 应用
				app: '',
				// 描述
				description: '',
				// 图标
				icon: ''
			},
			next_group: [
				{
					name: "样本",
					value: 0
				},
				{
					name: "样本2",
					value: 1
				}
			]
		};
	},
	methods: {}
};
</script>

<style>
/* 页面 */
#user_group_form {
}

/* 表单 */
#user_group_form .mm_form {
}

/* 筛选栏栏 */
#user_group_form .mm_filter {
}

/* 操作栏 */
#user_group_form .mm_action {
}

/* 模态窗 */
#user_group_form .mm_modal {
}

/* 表格 */
#user_group_form .mm_table {
}

/* 数据统计 */
#user_group_form .mm_data_count {
}
</style>
