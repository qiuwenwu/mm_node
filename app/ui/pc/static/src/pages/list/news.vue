<template>
	<!-- 新闻 -->
	<mm_page class="page_news">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">新闻<span>&lt; 返回</span></div>
				</mm_view>
					<div class="list_news">
						<mm_news v-for="(o, k) in list" :key="k" :obj="o"></mm_news>
					</div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	
	export default {
		data(){
			return { list : [{}] }
		}
	}
</script>

<style>
</style>
