<template>
	<main id="user_info_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户信息</h5>
					</header>
					<dl>
						<dt>身份证图片</dt>
						<dd><mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.idcard_img"></mm_upload_img></dd>
						<dt>身份证号</dt>
						<dd><mm_input type="text" v-model="form.idcard"></mm_input></dd>
						<dt>实名认证</dt>
						<dd><mm_radio v-model="form.idcard_state" :options="idcard_state"></mm_radio></dd>
						<dt>生日</dt>
						<dd><mm_input type="text" v-model="form.birthday"></mm_input></dd>
						<dt>年龄</dt>
						<dd><mm_number v-model="form.age" :min="0" :max="150"></mm_number></dd>
						<dt>省份</dt>
						<dd><mm_select v-model="form.province_id" :options="$to_kv(list_province,'province_id')" @change="change"></mm_select></dd>
						<dt>所在城市</dt>
						<dd><mm_select v-model="form.city_id" :options="$to_kv(list_city,'city_id')"></mm_select></dd>
						<dt>姓名</dt>
						<dd><mm_input type="text" v-model="form.name"></mm_input></dd>
						<dt>职业</dt>
						<dd><mm_input type="text" v-model="form.job"></mm_input></dd>
						<dt>毕业学校</dt>
						<dd><mm_input type="text" v-model="form.school"></mm_input></dd>
						<dt>所学专业</dt>
						<dd><mm_input type="text" v-model="form.major"></mm_input></dd>
						<dt>公司地址</dt>
						<dd><mm_input type="text" v-model="form.company_address"></mm_input></dd>
						<dt>详细地址</dt>
						<dd><mm_input type="text" v-model="form.address"></mm_input></dd>
						<dt>工作范围</dt>
						<dd><mm_input type="text" v-model="form.job_scope"></mm_input></dd>
						<dt>公司经营范围</dt>
						<dd><mm_input type="text" v-model="form.company_business"></mm_input></dd>
						<dt>性别</dt>
						<dd><mm_radio v-model="form.sex" :options="sex"></mm_radio></dd>
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
			url_submit: '/apis/user/info?',
			url_get_obj: '/apis/user/info',
			field: 'user_id',
			query: {
				user_id: 0
			},
			form: {
				user_id: 0,
				// 性别
				sex: 0,
				// 身份实名认证
				idcard_state: 0,
				// 年龄
				age: 0,
				// 省份ID
				province_id: 0,
				// 所在城市ID
				city_id: 0,
				// 生日
				birthday: '',
				// 姓名
				name: '',
				// 职业
				job: '',
				// 毕业学校
				school: '',
				// 所学专业
				major: '',
				// 身份证号
				idcard: '',
				// 公司地址
				company_address: '',
				// 详细地址
				address: '',
				// 工作范围
				job_scope: '',
				// 公司经营范围
				company_business: '',
				// 身份证图片
				idcard_img: ''
			},
			sex: [
				{
					name: '保密',
					value: '0'
				},
				{
					name: '男',
					value: '1'
				},
				{
					name: '女',
					value: '2'
				}
			],
			idcard_state: [
				{
					name: '未认证',
					value: '1'
				},
				{
					name: '认证中',
					value: '2'
				},
				{
					name: '认证通过',
					value: '3'
				}
			],
			list_province:[],
			list_city:[]
		};
	},
	methods: {
		get_province(){
			var _this = this;
			this.$get("/apis/sys/address_province",null,function(json,status){
				if (json.result) {
					_this.list_province.clear();
					_this.list_province.addList(json.result.list);
				}
			});
		},
		change(){
			this.get_city(this.form.province_id)
		}
		,
		get_city(province_id){
			var _this = this;
			this.list_city.clear();
			this.$get("/apis/sys/address_city?",{province_id:province_id },function(json,status){
				if (json.result) {
					_this.list_city.addList(json.result.list);
				}
			});
		}
	},
	created() {
		this.get_province();
	}
};
</script>

<style>
/* 页面 */
#user_info_form {
}

/* 表单 */
#user_info_form .mm_form {
}

/* 筛选栏栏 */
#user_info_form .mm_filter {
}

/* 操作栏 */
#user_info_form .mm_action {
}

/* 模态窗 */
#user_info_form .mm_modal {
}

/* 表格 */
#user_info_form .mm_table {
}

/* 数据统计 */
#user_info_form .mm_data_count {
}
</style>
