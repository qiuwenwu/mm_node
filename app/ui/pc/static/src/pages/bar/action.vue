<template>
	<mm_page class="page_action">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">文章<span>&lt; 返回</span></div>
				</mm_view>
				<mm_view :func="func"></mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			func(name, param1, param2) {

			}
		}
	}
</script>

<style>
</style>
