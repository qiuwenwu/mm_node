<template>
	<!-- 轮播图 -->
	<div class="swiper-container mm_slide_text" autoplay circular vertical>
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(o, idx) in list" :key="idx">
				<nuxt-link class="mm_view" :to="o[vm.url]">
					{{ o[vm.title] }}
				</nuxt-link>
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
				var swiper = new Swiper('.mm_slide_text', {
					autoplay: this.autoplay,
					direction: 'vertical'
				});
			}
		},
		mounted() {
			setTimeout(this.doing, 1000)
		}
	}
</script>

<style>
	.mm_slide_text {
		line-height: 2.5rem;
		height: 2.5rem;
	}

	.mm_slide_text .mm_view {
		color: #666;
		padding: 0 1rem;
		font-size: 85%;
	}
</style>
