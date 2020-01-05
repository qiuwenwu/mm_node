<template>
	<!-- 媒体 -->
	<mm_page class="page_media">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">媒体<span>&lt; 返回</span></div>
				</mm_view>
					<div class="list_media">
						<mm_media v-for="(o, k) in list" :key="k" :obj="o"></mm_media>
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
