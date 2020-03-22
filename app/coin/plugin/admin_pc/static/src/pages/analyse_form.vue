<template>
	<main id="coin_analyse_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}数字货币分析</h5>
					</header>
					<dl>
						<dt>头像</dt>
						<dd>
							<mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.avatar"></mm_upload_img>
						</dd>
						<dt>昵称</dt>
						<dd>
							<mm_input type="text" v-model="form.nickname" desc="由2-16个字符组成"></mm_input>
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
						<dd>
							<mm_select v-model="form.mc" :options="$to_kv(['',1,2,3,4,5])"></mm_select>
						</dd>
						<dt>个性签名</dt>
						<dd>
							<textarea v-model="form.signature" placeholder="由2-16个字符组成"></textarea>
						</dd>
					</dl>
					<footer>
						<div class="mm_group">
							<button class="btn_default" type="reset">重置</button>
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
				url_submit: "/apis/coin/analyse?",
				url_get_obj: "/apis/coin/analyse",
				field: "analyse_id",
				query: {
					"analyse_id": 0
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
	#coin_analyse_form {}

	/* 表单 */
	#coin_analyse_form .mm_form {}

	/* 筛选栏栏 */
	#coin_analyse_form .mm_filter {}

	/* 操作栏 */
	#coin_analyse_form .mm_action {}

	/* 模态窗 */
	#coin_analyse_form .mm_modal {}

	/* 表格 */
	#coin_analyse_form .mm_table {}

	/* 数据统计 */
	#coin_analyse_form .mm_data_count {}
</style>
