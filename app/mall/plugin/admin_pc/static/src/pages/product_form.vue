<template>
	<main id="mall_product_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}商品属性</h5>
					</header>
					<dl>
						<dt>图标</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.icon"></mm_upload_img></dd>
						<dt>名称</dt>
						<dd><mm_input type="text" v-model="form.name" ></mm_input></dd>
						<dt>排序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000"></mm_number></dd>
						<dt>描述</dt>
						<dd><textarea v-model="form.description" ></textarea></dd>
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
			url_submit: '/apis/mall/product_property?',
			url_get_obj: '/apis/mall/product_property',
			field: 'property_id',
			query: {
				property_id: 0
			},
			form: {
				property_id: 0,
				// 显示顺序
				display: 0,
				// 分类名称
				name: '',
				// 分类图标
				icon: '',
				// 分类描述
				description: ''
			}
		};
	},
	methods: {}
};
</script>

<style>
/* 页面 */
#mall_product_form {
}

/* 表单 */
#mall_product_form .mm_form {
}

/* 筛选栏栏 */
#mall_product_form .mm_filter {
}

/* 操作栏 */
#mall_product_form .mm_action {
}

/* 模态窗 */
#mall_product_form .mm_modal {
}

/* 表格 */
#mall_product_form .mm_table {
}

/* 数据统计 */
#mall_product_form .mm_data_count {
}
</style>
