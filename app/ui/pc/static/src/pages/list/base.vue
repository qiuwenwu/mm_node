<template>
	<!-- 基础 -->
	<mm_page class="page_base">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">基础<span>&lt; 返回</span></div>
				</mm_view>
				<div class="list_base">
					<mm_base v-for="(o, k) in list" :key="k" :obj="o"></mm_base>
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
