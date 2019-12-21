<template>
	<!-- 文章 -->
	<mm_page class="page_article">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">文章<span>&lt; 返回</span></div>
				</mm_div>

				<mm_list class="list_article">
					<mm_article v-for="(o, k) in list" :key="k" :obj="o"></mm_article>
				</mm_list>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	
	
	export default {
		data() {
			return {
				list: [{}]
			}
		}
	}
</script>

<style>
</style>
