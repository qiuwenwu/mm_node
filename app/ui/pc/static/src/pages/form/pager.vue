<template>
	<mm_page class="page_pager">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">分页器<span>&lt; 返回</span></div>
				</mm_view>

				<div class="h5">样式一</div>
				<mm_view class="">
					<mm_pager v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
				</mm_view>

				<div class="h5">样式二</div>
				<mm_view class="">
					<mm_pager class="mm_pager-x" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
				</mm_view>

				<div class="h5">样式三</div>
				<mm_view class="">
					<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
				</mm_view>

				<div class="h5">样式四</div>
				<mm_view class="">
					<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
				</mm_view>

				<div class="h5"></div>
				<mm_view class="">
					<p>当前：弟 {{ query.page }} 页</p>
					<p>每页显示：{{ query.size }} 条</p>
					<p>总计：{{ count }} 条</p>
				</mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				query: {
					page: 1,
					size: 30
				},
				count: 2000
			}
		},
		methods: {
			goTo(page) {
				// 可用来做 翻页动画，大于之前页往左翻，小于之前页右翻
				console.log("当前页", page);
				console.log("之前页", this.query.page);
			}
		}
	}
</script>

<style>
</style>
