<template>
	<main id="activity_user_info_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>审核用户</h5>
					</header>
					<dl>
						<dt>姓名</dt>
						<dd>
							<span>{{ obj.name }}</span>
						</dd>
						<dt>身份证号</dt>
						<dd>
							<span>{{ obj.idcard }}</span>
						</dd>
						<dt>身份证正面</dt>
						<dd>
							<mm_icon :src="obj.idcard_img_a || '/img/default.png'"></mm_icon>
						</dd>
						<dt>身份证反面</dt>
						<dd>
							<mm_icon :src="obj.idcard_img_b || '/img/default.png'"></mm_icon>
						</dd>
						<dt>出院证明</dt>
						<dd>
							<mm_icon :src="obj.idcard_img_b || '/img/default.png'"></mm_icon>
						</dd>
						<dt>备注</dt>
						<dd>
							<span>{{ obj.note || '无' }}</span>
						</dd>
					</dl>
					<footer>
						<div class="mm_group">
							<button class="btn_warning" type="button" @click="form.state = 3;submit()">未通过</button>
							<button class="btn_success" type="button" @click="form.state = 2;submit()">通过</button>
						</div>
					</footer>
				</mm_form>
			</mm_col>
		</mm_grid>
	</main>
</template>

<script>
	import mm_upload_img from '/src/components/form/mm_upload_img.vue';

	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {
			mm_upload_img
		},
		data() {
			return {
				url_submit: "/apis/activity/user_info?",
				url_get_obj: "/apis/activity/user_info",
				field: "info_id",
				query: {
					info_id: 0
				},
				form: {
					// 用户信息ID
					info_id: 0,
					// 用户验证状态
					"state": 0,
					// 手机号码
					"phone": "",
					// 紧急联系人号码
					"liaison_phone": "",
					// 参与人姓名
					"name": "",
					// 身份证号
					"idcard": "",
					// 紧急联系人姓名
					"liaison_name": "",
					// 用户唯一标识
					"uin_user": "",
					// 审核人uin
					"uin_checker": "",
					// 所在位置
					"location": "",
					// 详细地址
					"address": "",
					// 身份证正面照
					"idcard_img_a": "",
					// 身份证反面照
					"idcard_img_b": "",
					// 其他补充信息
					"note": ""
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 页面 */
	#activity_user_info_form {}

	/* 表单 */
	#activity_user_info_form .mm_form {}

	/* 筛选栏栏 */
	#activity_user_info_form .mm_filter {}

	/* 操作栏 */
	#activity_user_info_form .mm_action {}

	/* 模态窗 */
	#activity_user_info_form .mm_modal {}

	/* 表格 */
	#activity_user_info_form .mm_table {}

	/* 数据统计 */
	#activity_user_info_form .mm_data_count {}
</style>
