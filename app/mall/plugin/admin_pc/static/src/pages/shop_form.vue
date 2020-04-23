<template>
	<main id="mall_shop_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}店铺信息</h5>
					</header>
					<dl>
						<dt>封面图</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.img"></mm_upload_img></dd>
						<dt>标题</dt>
						<dd><mm_input type="text" v-model="form.name" desc="由2-16个字符组成"></mm_input></dd>
						<dt>状态</dt>
						<dd><mm_select v-model="form.state" :options="$to_kv(states)"></mm_select></dd>
						<dt>启用</dt>
						<dd><mm_switch v-model="form.available"></mm_switch></dd>
						<dt>排序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000"></mm_number></dd>
						<dt>分类</dt>
						<dd><mm_select v-model="form.type_id" :options="$to_kv(list_type, 'type_id')"></mm_select></dd>
						<dt>频道</dt>
						<dd><mm_select v-model="form.channel_id" :options="$to_kv(list_channel, 'channel_id')"></mm_select></dd>
						<dt>城市</dt>
						<dd><mm_select v-model="form.city_id" :options="$to_kv(list_city, 'city_id')"></mm_select></dd>
						<dt>所属人</dt>
						<dd><mm_select v-model="form.user_id" :options="$to_kv(list_user, 'user_id')"></mm_select></dd>
						<dt>热度</dt>
						<dd><mm_number v-model="form.hot" :min="0" :max="1000000000"></mm_number></dd>
						<dt>点赞</dt>
						<dd><mm_number v-model="form.praise" :min="0" :max="1000000000"></mm_number></dd>
						<dt>关键词</dt>
						<dd><mm_input type="text" v-model="form.keywords" placeholder="用于搜索引擎收录"></mm_input></dd>
						<dt>标签</dt>
						<dd><mm_input type="text" v-model="form.tag" placeholder="用于标注店铺所属相关内容，多个标签用空格隔开"></mm_input></dd>
						<dt>收藏者</dt>
						<dd><textarea v-model="form.collecter" placeholder="多个收藏者用“,”分隔"></textarea></dd>
						<dt>描述</dt>
						<dd><textarea v-model="form.description" placeholder="用于店铺提纲和搜索引擎收录"></textarea></dd>
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
			url_submit: '/apis/mall/shop?',
			url_get_obj: '/apis/mall/shop',
			field: 'shop_id',
			query: {
				shop_id: 0
			},
			form: {
				shop_id: 0,
				// 是否启用
				available: 0,
				// 状态
				state: 0,
				// 店铺分类ID
				type_id: 0,
				// 排序
				display: 0,
				// 频道ID
				channel_id: 0,
				// 所属城市ID
				city_id: 0,
				// 店铺所属人ID
				user_id: 0,
				// 热度
				hot: 0,
				// 点赞次数
				praise: 0,
				// 标题
				name: '',
				// 描述
				description: '',
				// 关键词
				keywords: '',
				// 封面图
				img: '',
				// 标签
				tag: '',
				// 收藏者
				collecter: ''
			},
			states: ['', '营业中', '已歇业', '已关店', '已删除', '已违规'],
			list_type: [],
			list_channel: [],
			list_city: [],
			list_user: []
		};
	},
	methods: {
		get_type() {
			var _this = this;
			this.$get('~/apis/mall/shop_type?', null, function(json) {
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
		},
		get_city() {
			var _this = this;
			this.$get('~/apis/sys/address_city?', null, function(json) {
				if (json.result) {
					_this.list_city.clear();
					_this.list_city.addList(json.result.list);
				}
			});
		},
		get_user() {
			var _this = this;
			this.$get('/apis/user/account?', null, function(json, status) {
				if(json.result){
					var lt = json.result.list;
					var list = [];
					for (var i = 0; i < lt.length; i++) {
						var o = lt[i];
						list.push({name:o.nickname,value:o.user_id })
					}
					_this.list_user = list;
				}
			});
		},
	},
	created() {
		this.get_type();
		this.get_channel();
		this.get_city();
		this.get_user();
	}
};
</script>

<style>
/* 页面 */
#mall_shop_form {
}

/* 表单 */
#mall_shop_form .mm_form {
}

/* 筛选栏栏 */
#mall_shop_form .mm_filter {
}

/* 操作栏 */
#mall_shop_form .mm_action {
}

/* 模态窗 */
#mall_shop_form .mm_modal {
}

/* 表格 */
#mall_shop_form .mm_table {
}

/* 数据统计 */
#mall_shop_form .mm_data_count {
}
</style>
