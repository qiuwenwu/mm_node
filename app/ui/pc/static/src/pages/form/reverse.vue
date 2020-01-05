<template>
	<mm_page class="page_reverse">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">反转器<span>&lt; 返回</span></div>
				</mm_view>
					
				<div class="h5">样式一</div>
				<mm_view>
					<mm_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback"></mm_reverse>
					<mm_reverse title="人气" v-model="query.orderby" :options="options_hot" :func="callback"></mm_reverse>
				</mm_view>
				
				<div class="h5">样式二</div>
				<mm_view>
					<mm_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback" display="2"></mm_reverse>
					<mm_reverse title="人气" v-model="query.orderby" :options="options_hot" :func="callback" display="2"></mm_reverse>
				</mm_view>
					
				<div class="h5"> </div>
				<mm_view>
					排序方式 {{ query.orderby }}
				</mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data()
		{
			return {
				query: {
					orderby: "`create_time` asc"
				},
				options_time:["`create_time` asc", "`create_time` desc"],
				options_hot:["`hot` asc", "`hot` desc"]
			}
		},
		methods:{
			callback(val) {
				// 可用于查询
				console.log('当前值', val);
			}
		}
	}
</script>

<style>
</style>
