<template>
	<!-- 滑动盒子 -->
	<div class="swiper-container mm_swiper_box">
		<slot></slot>
	</div>
</template>

<script>
	import mixin from '/src/mixins/list';
	import Swiper from "swiper";
	export default {
		mixins: [
			mixin
		],
		props: {
			autoplay: {
				type: "",
				default: true
			}
		},
		methods: {
			doing() {
				var swiper = new Swiper('.mm_swiper_box', {
					autoplay: this.autoplay
				});
			}
		},
		mounted() {
			setTimeout(this.doing, 1000)
		}
	}
</script>

<style>
</style>
