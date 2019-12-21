<template>
	<mm_page class="page_card">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">块<span>&lt; 返回</span></div>
				</mm_div>
				
				<mm_div class="swiper_test">
					<div class="h5">默认块</div>
					<mm_swiper_crad :list="list"></mm_swiper_crad>
				</mm_div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	

	export default {
		data() {
			list: [{

			}]
		}
	}
</script>

<style>
</style>
