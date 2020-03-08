<template>
	<main id="count_form">
		<header></header>
		<section></section>
		<footer></footer>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_obj: "",
				form: {
					// 等级
					"level": 0,
					// IQ智商
					"iq": 0,
					// 信用度
					"credit": 0,
					// 积分
					"credit_points": 0,
					// 经验值
					"exp": 0,
					// 拓展积分1
					"extcredits1": 0,
					// 拓展积分2
					"extcredits2": 0,
					// 拓展积分3
					"extcredits3": 0,
					// 拓展积分4
					"extcredits4": 0,
					// 拓展积分5
					"extcredits5": 0,
					// 拓展积分6
					"extcredits6": 0,
					// 拓展积分7
					"extcredits7": 0,
					// 拓展积分8
					"extcredits8": 0,
					// 钱
					"money": 0,
					// 货币
					"coin": 0
				},
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * @description 查询数据
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get: function get(query, func) {
				this.get_main(query, func);
				// 如果页面需要其他查询，可将函数写在这
			}
		}
	}
</script>

<style>
	/* {title} */
	#id {}

	/* 搜索栏 */
	#id #search {}

	/* 排序栏 */
	#id #sort {}

	/* 列表 */
	#id #obj {}
</style>
