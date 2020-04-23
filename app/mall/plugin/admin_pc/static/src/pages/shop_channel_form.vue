<template>
	<main id="mall_shop_channel_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}店铺专区</h5>
					</header>
					<dl>
						<dt>图标</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.icon"></mm_upload_img></dd>
						<dt>名称</dt>
						<dd><mm_input type="text" v-model="form.name" desc="由2-16个字符组成"></mm_input></dd>
						<dt>类型</dt>
						<dd><mm_select v-model="form.type" :options="list_type"></mm_select></dd>
						<dt>启用</dt>
						<dd><mm_switch v-model="form.available"></mm_switch></dd>
						<dt>隐藏</dt>
						<dd><mm_switch v-model="form.hide"></mm_switch></dd>
						<dt>可评论</dt>
						<dd><mm_switch v-model="form.can_comment"></mm_switch></dd>
						<dt>排序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000"></mm_number></dd>
						<dt>上级</dt>
						<dd><mm_select v-model="form.father_id" :options="$to_kv(list_father, 'channel_id')"></mm_select></dd>
						<dt>城市</dt>
						<dd><mm_select v-model="form.city_id" :options="$to_kv(list_city, 'city_id')"></mm_select></dd>
						<dt>模板</dt>
						<dd><textarea v-model="form.template" placeholder="频道和店铺都使用的样式"></textarea></dd>
						<dt>地址</dt>
						<dd><mm_input type="text" v-model="form.url" placeholder="如果该频道是跳转到其他网站的情况下，就在该URL上设置"></mm_input></dd>
						<dt>描述</dt>
						<dd><textarea v-model="form.description" placeholder="描述该频道的作用"></textarea></dd>
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
			url_submit: "/apis/mall/shop_channel?",
			url_get_obj: "/apis/mall/shop_channel",
			field: "channel_id",
			query: {
				"channel_id": 0
			},
			form: {
				"channel_id": 0,
				// 频道类型
				type: '',
				// 频道名称
				name: '',
				// 是否启用
				available: 0,
				// 是否隐藏
				hide: 0,
				// 是否可评论
				can_comment: 0,
				// 显示顺序
				display: 0,
				// 上级ID
				father_id: 0,
				// 所属城市
				city_id: 0,
				// 风格模板
				template: '',
				// 频道图标
				icon: '',
				// 外链地址
				url: '',
				// 描述
				description: ''
			},
			list_type:[{name:"问答",value:"question"},{name:"资讯",value:"info"},{name:"新闻",value:"news"},{name:"店铺",value:"shop"},{name:"活动",value:"activity"}],
			list_city:[],
			list_father:[]
		}
	},
	methods: {
		get_father() {
			var _this = this;
			this.$get('~/apis/mall/shop_channel?', null, function(json) {
				if (json.result) {
					_this.list_father.clear();
					_this.list_father.addList(json.result.list);
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
		}
	},
	computed: {
		list_fathers(){
			var idname = this.field;
			var id = this.query[idname];
			var lt = this.list_type;
			var list = [];
			for(var i = 0; i < lt.length; i++){
				var o = lt[i];
				if(o[idname] !== id){
					list.push(o);
				}
			}
			return list;
		}
	},
	created() {
		this.get_father();
		this.get_city();
	}
}
</script>

<style>
/* 页面 */
#mall_shop_channel_form {
}

/* 表单 */
#mall_shop_channel_form .mm_form {
}

/* 筛选栏栏 */
#mall_shop_channel_form .mm_filter {
}

/* 操作栏 */
#mall_shop_channel_form .mm_action {
}

/* 模态窗 */
#mall_shop_channel_form .mm_modal {
}

/* 表格 */
#mall_shop_channel_form .mm_table {
}

/* 数据统计 */
#mall_shop_channel_form .mm_data_count {
}
</style>
