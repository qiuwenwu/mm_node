<template>
	<main id="mall_product_type_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}商品分类</h5>
					</header>
					<dl>
						<dt>图标</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon"></mm_upload_img></dd>
						<dt>名称</dt>
						<dd><mm_input type="text" v-model="form.name" desc="由2-16个字符组成"></mm_input></dd>
						<dt>顺序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000"></mm_number></dd>
						<dt>描述</dt>
						<dd><textarea type="text" v-model="form.description"></textarea></dd>
						<dt>上级</dt>
						<dd><mm_select v-model="form.father_id" :options="$to_kv(list_type, 'type_id')"></mm_select></dd>
						<dt>频道</dt>
						<dd><mm_select v-model="form.channel_id" :options="$to_kv(list_channel, 'channel_id')"></mm_select></dd>
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
			url_submit: '/apis/mall/product_type?',
			url_get_obj: '/apis/mall/product_type',
			field: 'type_id',
			query: {
				type_id: 0
			},
			form: {
				type_id: 0,
				// 显示顺序
				display: 0,
				// 频道ID
				channel_id: 0,
				// 上级分类ID
				father_id: 0,
				// 分类名称
				name: '',
				// 分类图标
				icon: '',
				// 分类描述
				description: ''
			},
			list_type: [],
			list_channel: []
		};
	},
	methods: {
		get_type() {
			var _this = this;
			this.$get('~/apis/mall/product_type?', null, function(json) {
				if (json.result) {
					_this.list_type.clear();
					_this.list_type.addList(json.result.list);
				}
			});
		},
		get_channel() {
			var _this = this;
			this.$get('~/apis/mall/product_channel?', null, function(json) {
				if (json.result) {
					_this.list_channel.clear();
					_this.list_channel.addList(json.result.list);
				}
			});
		}
	},
	created() {
		this.get_type();
		this.get_channel();
	}
};
</script>

<style>
/* 页面 */
#mall_product_type_form {
}

/* 表单 */
#mall_product_type_form .mm_form {
}

/* 筛选栏栏 */
#mall_product_type_form .mm_filter {
}

/* 操作栏 */
#mall_product_type_form .mm_action {
}

/* 模态窗 */
#mall_product_type_form .mm_modal {
}

/* 表格 */
#mall_product_type_form .mm_table {
}

/* 数据统计 */
#mall_product_type_form .mm_data_count {
}
</style>
