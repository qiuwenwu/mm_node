<template>
	<main id="sys_app_refresh_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}应用刷新</h5>
					</header>
					<dl>
						<dt>应用ID</dt>
						<dd>
							<mm_input type="text" v-model="form.appid"></mm_input>
						</dd>
						<dt>刷新令牌</dt>
						<dd>
							<mm_input type="text" v-model="form.refresh_token"></mm_input>
						</dd>
						<dt>用户ID</dt>
						<dd>
							<mm_input type="text" v-model="form.user_id"></mm_input>
						</dd>
						<dt>创建时间</dt>
						<dd>
							<mm_input type="text" v-model="form.time_create"></mm_input>
						</dd>
						<dt>更新时间</dt>
						<dd>
							<mm_select v-model="form.time_update" ></mm_select>
						</dd>
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
				url_submit: "/apis/sys/app_refresh?",
				url_get_obj: "/apis/sys/app_refresh",
				field: "refresh_id",
				query: {
					"refresh_id": 0
				},
				form: {}
			}
		},
		methods: {

		}
	}
</script>

<style>
	/* 页面 */
	#sys_app_refresh_form {}

	/* 表单 */
	#sys_app_refresh_form .mm_form {}

	/* 筛选栏栏 */
	#sys_app_refresh_form .mm_filter {}

	/* 操作栏 */
	#sys_app_refresh_form .mm_action {}

	/* 模态窗 */
	#sys_app_refresh_form .mm_modal {}

	/* 表格 */
	#sys_app_refresh_form .mm_table {}

	/* 数据统计 */
	#sys_app_refresh_form .mm_data_count {}
</style>
