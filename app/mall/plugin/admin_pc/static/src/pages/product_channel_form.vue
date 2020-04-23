<template>
	<main id="mall_product_channel_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}商品专区</h5>
					</header>
					<dl>
						<dt>频道图标</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon"></mm_upload_img></dd>
						<dt>名称</dt>
						<dd><mm_input type="text" v-model="form.name" ></mm_input></dd>
						<dt>频道类型</dt>
						<dd><mm_select v-model="form.type" :options="list_type"></mm_select></dd>
						<dt>顺序</dt>
						<dd><mm_number v-model="form.display" :min="0" :max="1000"></mm_number></dd>
						<dt>启用</dt>
						<dd><mm_switch v-model="form.available" ></mm_switch></dd>
						<dt>隐藏</dt>
						<dd><mm_switch v-model="form.hide" ></mm_switch></dd>
						<dt>评论</dt>
						<dd><mm_switch v-model="form.can_comment" ></mm_switch></dd>
						<dt>上级</dt>
						<dd><mm_select v-model="form.father_id" :options="$to_kv(list_father,'father_id')" ></mm_select></dd>
						<dt>所属省份</dt>
						<dd><mm_select v-model="province_id" :options="$to_kv(list_province,'province_id')" @change="change"></mm_select></dd>
						<dt>所属城市</dt>
						<dd><mm_select v-model="form.city_id" :options="$to_kv(list_city,'city_id')"></mm_select></dd>
						<dt>描述</dt>
						<dd><mm_input v-model="form.description" ></mm_input></dd>
						<dt>风格模板</dt>
						<dd><textarea v-model="form.template"></textarea></dd>
						<dt>外链地址</dt>
						<dd><textarea v-model="form.url"></textarea></dd>
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
			url_submit: '/apis/mall/product_channel?',
			url_get_obj: '/apis/mall/product_channel',
			field: 'channel_id',
			query: {
				channel_id: 0
			},
			form: {
				channel_id:0,
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
			list_type:[
				{name:"问答",value:"question"},
				{name:"资讯",value:"info"},
				{name:"新闻",value:"news"},
				{name:"产品",value:"product"},
				{name:"活动",value:"activity"}],
			list_father:[],
			province_id:0, //省ID
			list_province:[], //省份
			list_city:[] //城市
		};
	},
	methods: {
		get_province(){
			var _this = this;
			this.list_province.clear();
			this.$get("/apis/sys/address_province?",null ,function(json,status){
				if (json.result) {
					_this.list_province.addList(json.result.list);
				}
			});
		},
		change(){
			this.get_city(this.province_id);
		},
		get_city(province_id){
			var _this = this;
			this.list_city.clear();
			this.$get("/apis/sys/address_city?",{"province_id": province_id} ,function(json,status){
				if (json.result) {
					_this.list_city.addList(json.result.list)
				}
			});
		},
		get_father (){
			var _this = this;
			this.$get('~/apis/mall/product_channel?', null, function(json) {
				if (json.result) {
					_this.list_father.clear();
					_this.list_father.addList(json.result.list)
				}
			});
		}
	},
	created() {
		this.get_province();
		this.get_father();
		// this.get_father();
	}
};
</script>

<style>
/* 页面 */
#mall_product_channel_form {
}

/* 表单 */
#mall_product_channel_form .mm_form {
}

/* 筛选栏栏 */
#mall_product_channel_form .mm_filter {
}

/* 操作栏 */
#mall_product_channel_form .mm_action {
}

/* 模态窗 */
#mall_product_channel_form .mm_modal {
}

/* 表格 */
#mall_product_channel_form .mm_table {
}

/* 数据统计 */
#mall_product_channel_form .mm_data_count {
}
</style>
