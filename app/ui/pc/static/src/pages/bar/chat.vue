<template>
	<mm_page class="page_chat">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">文章<span>&lt; 返回</span></div>
				</mm_div>

				<mm_chat :func="func"></mm_chat>
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
