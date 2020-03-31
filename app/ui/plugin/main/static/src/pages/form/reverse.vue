<template>
	<mm_page id="page_reverse">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>反转器</span>
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
						<mm_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback"></mm_reverse>
						<mm_reverse title="人气" v-model="query.orderby" :options="options_hot" :func="callback"></mm_reverse>
					</mm_view>

					<mm_view>
						<h5 @click="$copy(code_2)">样式二</h5>
						<mm_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback" display="2"></mm_reverse>
						<mm_reverse title="人气" v-model="query.orderby" :options="options_hot" :func="callback" display="2"></mm_reverse>
					</mm_view>

					<mm_view>
						排序方式 {{ query.orderby }}
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
					orderby: "`create_time` asc"
				},
				options_time: ["`create_time` asc", "`create_time` desc"],
				options_hot: ["`hot` asc", "`hot` desc"],
				code_1: `
<mm_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback"></mm_reverse>
`,
				code_2: `
<mm_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback" display="2"></mm_reverse>
`
			}
		},
		methods: {
			callback(val) {
				// 可用于查询
				console.log('当前值', val);
			}
		}
	}
</script>

<style>
</style>
