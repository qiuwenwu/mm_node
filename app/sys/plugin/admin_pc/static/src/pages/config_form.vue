<template>
	<main id="sys_config_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}系统配置</h5>
					</header>
					<dl>
						<dt>类型</dt>
						<dd><mm_select v-model="form.type" :options="type"></mm_select></dd>
						<dt>变量名</dt>
						<dd><mm_input v-model="form.name" type="text"></mm_input></dd>
						<dt>标题</dt>
						<dd><mm_input v-model="form.title" type="text" placeholder="可以用中文名"></mm_input></dd>
						<dt>值</dt>
						<dd><mm_input v-model="form.value" type="text"></mm_input></dd>
						<dt>描述</dt>
						<dd><mm_input v-model="form.description" type="text"></mm_input></dd>
						<dt>数据模型</dt>
						<dd><mm_input v-model="form.model" type="text" placeholder="json格式，用于单选、多选模式"></mm_input></dd>
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
			url_submit: '/apis/sys/config?',
			url_get_obj: '/apis/sys/config',
			field: 'config_id',
			query: {
				config_id: 0
			},
			form: {
				config_id: 0,
				// 数据类型
				type: 'string',
				// 变量名
				name: '',
				// 变量标题
				title: '',
				// 变量值
				value: '',
				// 变量描述
				description: '',
				// 数据模型
				model: ''
			},
			type: [
				{
					name: '文本型',
					value: 'string'
				},
				{
					name: '数字型',
					value: 'number'
				},
				{
					name: '布尔型',
					value: 'boolean'
				}
			]
		};
	},
	methods: {}
};
</script>

<style>
/* 页面 */
#sys_config_form {
}

/* 表单 */
#sys_config_form .mm_form {
}

/* 筛选栏栏 */
#sys_config_form .mm_filter {
}

/* 操作栏 */
#sys_config_form .mm_action {
}

/* 模态窗 */
#sys_config_form .mm_modal {
}

/* 表格 */
#sys_config_form .mm_table {
}

/* 数据统计 */
#sys_config_form .mm_data_count {
}
</style>
