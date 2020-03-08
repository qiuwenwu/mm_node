<template>
	<main id="sns_form">
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
					// QQ号
					"qq": "",
					// QQ认证
					"qq_state": 0,
					// 微信号
					"wechat": "",
					// 微信认证
					"wechat_state": 0,
					// MM号
					"mm": "",
					// MM认证
					"mm_state": 0,
					// 百度账号
					"baidu": "",
					// 百度认证
					"baidu_state": 0,
					// 淘宝账号
					"taobao": "",
					// 淘宝认证
					"taobao_state": 0
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
