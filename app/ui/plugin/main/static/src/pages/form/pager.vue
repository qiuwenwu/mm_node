<template>
	<mm_page id="page_pager">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>分页器</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">

					<mm_view>
						<h5 @click="$copy(code_1)">样式一</h5>
						<mm_pager v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
					</mm_view>

					<mm_view>
						<h5 @click="$copy(code_2)">样式二</h5>
						<mm_pager class="mm_pager-x" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
					</mm_view>

					<mm_view>
						<h5 @click="$copy(code_3)">样式三</h5>
						<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
					</mm_view>

					<mm_view>
						<h5 @click="$copy(code_4)">样式四</h5>
						<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
					</mm_view>

					<mm_view>
						<p>当前：弟 {{ query.page }} 页</p>
						<p>每页显示：{{ query.size }} 条</p>
						<p>总计：{{ count }} 条</p>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
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
				count: 2000,
				code_1: `
<mm_pager v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
`,
				code_2: `
<mm_pager class="mm_pager-x" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
`,
				code_3: `
<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"></mm_pager>
`,
				code_4: `
<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
`
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
