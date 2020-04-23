<template>
	<main id="mall_shop_comment_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}店铺评论</h5>
					</header>
					<dl>
						<dt>留言者姓名</dt>
						<dd><mm_input type="text" v-model="form.name" placeholder=""></mm_input></dd>
						<dt>正文</dt>
						<dd>
							<textarea v-model="form.content" placeholder=""></textarea>
						</dd>
						<dt>排序</dt>
						<dd><mm_number v-model="form.display" :min="1" :max="5"></mm_number></dd>
						<dt>启用</dt>
						<dd><mm_switch type="text" v-model="form.available" desc="由2-16个字符组成"></mm_switch></dd>
						<dt>评分</dt>
						<dd><mm_number v-model="form.score" :min="1" :max="5"></mm_number></dd>
						<dt>店铺</dt>
						<dd><mm_select v-model="form.shop_id" :options="$to_kv(list_shop,'shop_id')"></mm_select></dd>
						<dt>用户</dt>
						<dd><mm_select v-model="form.user_id" :options="list_user"></mm_select></dd>
						<dt>标签</dt>
						<dd><textarea v-model="form.tag" placeholder="评论人给的标签，多个标签用空格隔开"></textarea></dd>
						<dt>回复</dt>
						<dd><textarea v-model="form.reply" placeholder=""></textarea></dd>
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
			url_submit: '/apis/mall/shop_comment?',
			url_get_obj: '/apis/mall/shop_comment',
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
				// 所属店铺id
				shop_id: 0,
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
			list_shop:[],
			list_user:[]
		};
	},
	methods: {
		get_shop (){
			var _this = this;
			this.$get('~/apis/mall/shop?', null, function(json) {
				if (json.result) {
					_this.list_shop.clear();
					_this.list_shop.addList(json.result.list)
				}
			});
		},
		get_user (){
			var _this = this;
			this.$get('~/apis/user/account?', null, function(json) {
				_this.list_user.clear();
				if (json.result) {
					var lt = json.result.list;
					var list = [];
					for(var i=0;i<lt.length;i++){
						var o = lt[i];
						list.push({name:o.nickname,value:o.user_id})
					}
					_this.list_user = list;
				}
			});
		}
	},
	created() {
		this.get_shop();
		this.get_user();
	}
};
</script>

<style>
/* 页面 */
#mall_shop_comment_form {
}

/* 表单 */
#mall_shop_comment_form .mm_form {
}

/* 筛选栏栏 */
#mall_shop_comment_form .mm_filter {
}

/* 操作栏 */
#mall_shop_comment_form .mm_action {
}

/* 模态窗 */
#mall_shop_comment_form .mm_modal {
}

/* 表格 */
#mall_shop_comment_form .mm_table {
}

/* 数据统计 */
#mall_shop_comment_form .mm_data_count {
}
</style>
