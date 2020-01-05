<template>
	<!-- 号码 -->
	<mm_page class="page_number">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">号码<span>&lt; 返回</span></div>
				</mm_view>
					<div class="list_number">
						<mm_number v-for="(o, k) in list" :key="k" :obj="o"></mm_number>
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
