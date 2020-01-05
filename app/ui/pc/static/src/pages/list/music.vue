<template>
	<!-- 音乐 -->
	<mm_page class="page_video">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">音乐<span>&lt; 返回</span></div>
				</mm_view>
					<div class="list_music">
						<mm_music v-for="(o, k) in list" :key="k" :obj="o"></mm_music>
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