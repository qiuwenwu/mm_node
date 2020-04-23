<template>
	<main id="activity_action_log_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>用户账户 —— 编辑</h5>
					</header>
					<dl>
						<dt>头像</dt>
						<dd>
							<mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.avatar"></mm_upload_img>
						</dd>
						<dt>昵称</dt>
						<dd>
							<label>
								<input type="text" v-model="form.nickname" placeholder="由2-16个字符组成" />
							</label>
						</dd>
						<dt>会员级别</dt>
						<dd>
							<mm_select v-model="form.vip" :options="$to_kv(['',1,2,3,4,5])"></mm_select>
						</dd>
						<dt>管理级别</dt>
						<dd>
							<mm_select v-model="form.gm" :options="$to_kv(['',1,2,3,4,5])"></mm_select>
						</dd>
						<dt>商户级别</dt>
						<dd><mm_select v-model="form.mc" :options="$to_kv(['',1,2,3,4,5])"></mm_select></dd>
						<dt>个性签名</dt>
						<dd>
							<textarea v-model="form.signature" placeholder="由2-16个字符组成" />
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
	import mm_upload_img from '/src/components/form/mm_upload_img.vue';
		
	import mixin from '/src/mixins/page.js';
	
	export default {
		mixins: [mixin],
		components: {
			mm_upload_img
		},
		data() {
			return {
				url_submit: "/apis/user/account?",
				url_get_obj: "/apis/user/account",
				query: {
					user_id: 0
				},
				form: {
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 页面 */
	#activity_action_log_form {}

	/* 表单 */
	#activity_action_log_form .mm_form {}
	
	/* 筛选栏栏 */
	#activity_action_log_form .mm_filter {}

	/* 操作栏 */
	#activity_action_log_form .mm_action {}

	/* 模态窗 */
	#activity_action_log_form .mm_modal {}

	/* 表格 */
	#activity_action_log_form .mm_table {}

	/* 数据统计 */
	#activity_action_log_form .mm_data_count {}
</style>