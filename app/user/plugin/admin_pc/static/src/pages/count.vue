<template>
	<main id="count">
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
					// 等级——最小值
					"level_min": 0,
					// 等级——最大值
					"level_max": 0,
					// IQ智商——最小值
					"iq_min": 0,
					// IQ智商——最大值
					"iq_max": 0,
					// 信用度——最小值
					"credit_min": 0,
					// 信用度——最大值
					"credit_max": 0,
					// 积分——最小值
					"credit_points_min": 0,
					// 积分——最大值
					"credit_points_max": 0,
					// 经验值——最小值
					"exp_min": 0,
					// 经验值——最大值
					"exp_max": 0,
					// 钱——最小值
					"money_min": 0,
					// 钱——最大值
					"money_max": 0,
					// 货币——最小值
					"coin_min": 0,
					// 货币——最大值
					"coin_max": 0
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
