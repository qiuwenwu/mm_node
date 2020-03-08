<template>
	<main id="group">
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
					// 用户组ID
					"group_id": 0,
					// 显示顺序——最小值
					"display_min": 0,
					// 显示顺序——最大值
					"display_max": 0,
					// 等级划分——最小值
					"level_min": 0,
					// 等级划分——最大值
					"level_max": 0,
					// 升级所需经验——最小值
					"exp_min": 0,
					// 升级所需经验——最大值
					"exp_max": 0,
					// 折扣——最小值
					"discount_min": 0,
					// 折扣——最大值
					"discount_max": 0,
					// 奖励比例——最小值
					"bonus_min": 0,
					// 奖励比例——最大值
					"bonus_max": 0,
					// 用户名称
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
