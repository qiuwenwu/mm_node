<template>
	<main id="user_admin_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}管理组</h5>
					</header>
					<dl>
						<dt>图标</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon"></mm_upload_img></dd>
						<dt>名称</dt>
						<dd><mm_input type="text" v-model="form.name" desc="由2-16个字符组成"></mm_input></dd>
						<dt>显示顺序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000" ></mm_number></dd>
						<dt>分类</dt>
						<dd><mm_input v-model="form.type" ></mm_input></dd>
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
			url_submit: '/apis/user/admin?',
			url_get_obj: '/apis/user/admin',
			field: 'admin_id',
			query: {
				admin_id: 0
			},
			form: {
				// 管理组ID
				admin_id: 0,
				// 管理组名称
				name: '',
				// 显示顺序
				display: 0,
				// 分类
				type: '',
				// 描述
				description: '',
				// 图标
				icon: ''
			}
		};
	},
	methods: {}
};
</script>

<style>
/* 页面 */
#user_admin_form {
}

/* 表单 */
#user_admin_form .mm_form {
}

/* 筛选栏栏 */
#user_admin_form .mm_filter {
}

/* 操作栏 */
#user_admin_form .mm_action {
}

/* 模态窗 */
#user_admin_form .mm_modal {
}

/* 表格 */
#user_admin_form .mm_table {
}

/* 数据统计 */
#user_admin_form .mm_data_count {
}
</style>
