<template>
	<!-- 商品 -->
	<mm_page class="page_goods">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">商品<span>&lt; 返回</span></div>
				</mm_view>
				<div class="list_goods">
					<mm_goods v-for="(o, k) in list" :key="k" :obj="o"></mm_goods>
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
