<template>
	<main id="admin">
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
					// 管理组ID
					"admin_id": 0,
					// 显示顺序——最小值
					"display_min": 0,
					// 显示顺序——最大值
					"display_max": 0,
					// 管理组名称
					"name": "",
					// 描述
					"description": ""
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
