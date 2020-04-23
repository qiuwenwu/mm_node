<template>
	<main id="mall_product_comment_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}商品评论</h5>
					</header>
					<dl>
						<dt>是否启用</dt>
						<dd><mm_switch v-model="form.available"></mm_switch></dd>
						<dt>评分</dt>
						<dd><mm_number v-model="form.score" :min="1" :max="5"></mm_number></dd>
						<dt>所属产品</dt>
						<dd><mm_select v-model="form.product_id" :options="product"></mm_select></dd>
						<dt>用户</dt>
						<dd><mm_select v-model="form.user_id" :options="user"></mm_select></dd>
						<dt>显示排序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000"></mm_number></dd>
						<dt>留言者姓名</dt>
						<dd><mm_input v-model="form.name" type="text"></mm_input></dd>
						<dt>正文</dt>
						<dd><mm_input v-model="form.content" type="text"></mm_input></dd>
						<dt>标签</dt>
						<dd><textarea v-model="form.tag"></textarea></dd>
						<dt>评论回复</dt>
						<dd><textarea v-model="form.reply"></textarea></dd>
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
			url_submit: '/apis/mall/product_comment?',
			url_get_obj: '/apis/mall/product_comment',
			field: 'comment_id',
			query: {
				comment_id: 0
			},
			form: {
				comment_id: 0,
				// 是否启用
				available: 0,
				// 评分
				score: 0,
				// 显示排序
				display: 0,
				// 所属产品id
				product_id: 0,
				// 用户ID
				user_id: 0,
				// 留言者姓名
				name: '',
				// 标签
				tag: '',
				// 正文
				content: '',
				// 评论回复
				reply: ''
			},
			product: [],
			user: []
		};
	},
	methods: {
		get_product() {
			var _this = this;
			this.$get('/apis/mall/product_property', null, function(json, status) {
				if (json.result) {
					_this.product.clear();
					_this.product.addList(json.result.list);
				}
			});
		},
		get_user() {
			var _this = this;
			this.$get('/apis/user/account', null, function(json, status) {
				if (json.result) {
					// _this.user.clear();
					// _this.user.addList(json.result.list);
					var list = json.result.list;
					var arr = [];
					for(var i=0;i<list.length;i++){
						arr.push({name:list[i].username,value:list[i].user_id})
					}
					_this.user = arr;
				}
			});
		}
	},
	created() {
		this.get_product();
		this.get_user();
	}
};
</script>

<style>
/* 页面 */
#mall_product_comment_form {
}

/* 表单 */
#mall_product_comment_form .mm_form {
}

/* 筛选栏栏 */
#mall_product_comment_form .mm_filter {
}

/* 操作栏 */
#mall_product_comment_form .mm_action {
}

/* 模态窗 */
#mall_product_comment_form .mm_modal {
}

/* 表格 */
#mall_product_comment_form .mm_table {
}

/* 数据统计 */
#mall_product_comment_form .mm_data_count {
}
</style>
