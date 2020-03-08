<template>
	<main id="sns">
		<mm_grid>
			<mm_col width="100">
				<mm_view>
					<header class="arrow">
						<h5>超级美眉</h5>
					</header>
					<mm_body>

					</mm_body>
				</mm_view>
			</mm_col>
		</mm_grid>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "",
				// 查询条件
				query: {
					// 用户ID
					"user_id": 0,
					// QQ认证
					"qq_state": 0,
					// 微信认证
					"wechat_state": 0,
					// MM认证
					"mm_state": 0,
					// 百度认证
					"baidu_state": 0,
					// 淘宝认证
					"taobao_state": 0
				},
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * @description 滚动刷新
			 * @param {Number} n 滚动的方向，-1是向上， 1是向下
			 */
			scoll(n) {
				this.go(n);
			}
		}
	}
</script>

<style>
	/* {title} */
	#id {}

	/* 标题栏 */
	#id #title {}

	/* 搜索栏 */
	#id #search {}

	/* 排序栏 */
	#id #sort {}

	/* 列表 */
	#id #table {}

	/* 选择栏 */
	#id #options {}
</style>
