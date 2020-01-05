<template>
	<!-- 常见问题 -->
	<mm_page class="page_question">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">常见问题<span>&lt; 返回</span></div>
				</mm_view>
					<div class="list_question">
						<mm_question v-for="(o, k) in list" :key="k" :obj="o"></mm_question>
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