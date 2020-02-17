<template>
	<!-- 轮播图 -->
	<div class="swiper-container mm_slide_img" indicator-dots autoplay circular :interval="5000">
		<div class="swiper-slide" v-for="(o, idx) in list" :key="idx">
			<mm_view :to="o[vm.url]">
				<mm_icon :src="o[vm.img]"></mm_icon>
			</mm_view>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js';
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
				var swiper = new Swiper('.mm_slide_img', {
					pagination: {
						el: '.swiper-pagination',
						autoplay: this.autoplay
					}
				});
			}
		},
		mounted() {
			setTimeout(this.doing, 1000)
		}
	}
</script>

<style>
	.mm_slide_img {
		height: 8.75rem;
	}
</style>
