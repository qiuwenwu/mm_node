<template>
	<main id="info_form">
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
					// 性别
					"sex": 0,
					// 身份实名认证
					"idcard_state": 0,
					// 年龄
					"age": 0,
					// 省份ID
					"province_id": 0,
					// 所在城市ID
					"city_id": 0,
					// 生日
					"birthday": "",
					// 姓名
					"name": "",
					// 职业
					"job": "",
					// 毕业学校
					"school": "",
					// 所学专业
					"major": "",
					// 身份证号
					"idcard": "",
					// 公司地址
					"company_address": "",
					// 详细地址
					"address": "",
					// 工作范围
					"job_scope": "",
					// 公司经营范围
					"company_business": "",
					// 身份证图片
					"idcard_img": ""
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
