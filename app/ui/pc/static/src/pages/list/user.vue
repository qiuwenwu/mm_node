<template>
	<!-- 用户 -->
	<mm_page class="page_user">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">用户<span>&lt; 返回</span></div>
				</mm_view>
				<div class="list_user">
					<mm_user v-for="(o, k) in list" :key="k" :obj="o"></mm_user>
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
