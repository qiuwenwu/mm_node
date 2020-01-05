<template>
	<mm_page class="page_card">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">块<span>&lt; 返回</span></div>
				</mm_view>

				<mm_view class="swiper_test">
					<div class="h5">默认块</div>
					<mm_swiper_crad :list="list"></mm_swiper_crad>
				</mm_view>
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
