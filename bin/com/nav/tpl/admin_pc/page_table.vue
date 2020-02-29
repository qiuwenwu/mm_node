<template>
	<mm_page id="id">
		<!-- 栅格 -->
		<mm_grid>
			<mm_col width="100">
				<mm_card>
					<!-- 标题栏 -->
					<div class="head">{title}</div>

					<!-- 搜索栏 -->
					<mm_search id="search" v-model="query.keyword" :func="search"></mm_search>

					<!-- 表格 -->
					<mm_table id="table">
						<mm_thead :list="sort" :func="search"></mm_thead>
						<mm_tbody :list="list" :func="func"></mm_tbody>
					</mm_table>

					<!-- 分页器 -->
					<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
				</mm_card>
			</mm_col>
		</mm_grid>
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
			 * @description 查询数据
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get(query, func) {
				this.get_main(query, func);
				// 如果页面需要其他查询，可将函数写在这
			},
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
