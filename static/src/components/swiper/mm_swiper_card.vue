<template>
	<!-- 轮播图 -->
	<div class="swiper-container mm_swiper_card" indicatorDots autoplay>
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(o, idx) in list" :key="idx">
				<mm_view :to="o[vm.url]">
					<mm_icon :src="o[vm.img]"></mm_icon>
				</mm_view>
			</div>
			<slot></slot>
		</div>
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
				var swiper = new Swiper('.mm_swiper_card', {
					autoplay: this.autoplay,
					centeredSlides: true,
					slidesPerView: 1.2,
					spaceBetween: 30,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
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
	.mm_swiper_card {
		height: 11.5rem;
	}

	.mm_swiper_card .swiper-slide {
		width: calc(100% - 4rem);
	}

	.mm_swiper_card .mm_icon {
		width: 100%;
		border-radius: 0.5rem;
		height: 10rem;
		margin: auto;
	}
</style>
