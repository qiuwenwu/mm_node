<template>
	<mm_page id="id" :func="scoll">
		<!-- 页头 -->
		<header>
			<!-- 标题栏 -->
			<div id="title"></div>

			<!-- 搜索栏 -->
			<mm_search id="search" :func="search"></mm_search>
			
			<!-- 排序栏 -->
			<mm_sort id="sort" :sort="sort" :func="search"></mm_sort>
		</header>

		<!-- 页主体 -->
		<mm_body>
			<!-- 列表栏 -->
			<mm_list id="list">
				<mm_item v-for="(o, i) in list" :key="i"></mm_item>
			</mm_list>
		</main>

		<!-- 页脚 -->
		<mm_foot>
			<!-- 工具栏 -->
			<mm_tool v-once></mm_tool>
		</mm_foot>

		<!-- 模态窗 -->
		<mm_modal>
			<!-- 选择栏 -->
			<mm_options id="options" :func="search"></mm_options>
		</mm_modal>
	</mm_page>
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
				query: {},
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 查询数据
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get(query, func) {
				this.get_main(query, func);
				// 如果页面需要其他查询，可将函数写在这
			},
			/**
			 * 滚动刷新
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
	#id #list {}

	/* 选择栏 */
	#id #options {}
</style>
