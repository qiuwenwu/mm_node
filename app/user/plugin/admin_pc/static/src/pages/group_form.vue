<template>
	<main id="group_form">
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
					// 用户名称
					"name": "",
					// 显示顺序
					"display": 0,
					// 等级划分
					"level": 0,
					// 下级用户组ID
					"next_group_id": 0,
					// 升级所需经验
					"exp": 0,
					// 折扣
					"discount": 0,
					// 奖励比例
					"bonus": 0,
					// 应用
					"app": "",
					// 描述
					"description": "",
					// 图标
					"icon": ""
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
