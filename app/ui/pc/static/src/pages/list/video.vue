<template>
	<!-- 视频 -->
	<mm_page class="page_video">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">视频<span>&lt; 返回</span></div>
				</mm_view>
				<div class="list_video">
					<mm_video v-for="(o, k) in list" :key="k" :obj="o"></mm_video>
				</div>
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
