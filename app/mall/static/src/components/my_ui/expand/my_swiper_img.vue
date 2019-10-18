<template>
	<div class="my_swiper_img swiper-container" :id="name">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in imglist" :key="index">
				<router-link :to="item[vm.url]">
					<my_icon :src="item[vm.img]"></my_icon>
				</router-link>
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	import '/css/swiper.min.css';
	export default {
		mounted() {
			if (this.imglist.length > 0) {
				var tag = '.my_swiper_img';
				if (this.name !== '') {
					tag = '#' + this.name;
				}
				var mySwiper = new Swiper(tag, {
					loop: true,
					pagination: {
						el: '.swiper-pagination'
					}
				});
			}
		},
		props: {
			name: {
				type: String,
				default: ''
			},
			imglist: {
				type: Array,
				default: function() {
					return [];
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						url: 'url',
						title: 'title',
						img: 'img'
					};
				}
			}
		}
	};
</script>

<style></style>
