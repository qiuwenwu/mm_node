<template>
	<!-- 消息 -->
	<mm_page class="page_message">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">消息<span>&lt; 返回</span></div>
				</mm_view>
					<div class="list_message">
						<mm_message v-for="(o, k) in list" :key="k" :obj="o"></mm_message>
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
