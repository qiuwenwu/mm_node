<template>
	<div class="my_swiper_card swiper-container" :id="name">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in cardList" :key="index">
				<router-link :to="item[vm.url]">{{ item[vm.title] }}</router-link>
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
			if (this.cardList.length > 0) {
				var tag = '.my_swiper_card';
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
			cardList: {
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
