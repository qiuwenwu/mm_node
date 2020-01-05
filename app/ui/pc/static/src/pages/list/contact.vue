<template>
	<!-- 联系人 -->
	<mm_page class="page_contact">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">联系人<span>&lt; 返回</span></div>
				</mm_view>
				<div class="list_contact">
					<mm_contact v-for="(o, k) in list" :key="k" :obj="o"></mm_contact>
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
