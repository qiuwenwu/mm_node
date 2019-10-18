<template>
	<div class="my_news" :style="'height:' + height">
		<img :src="icon" v-if="icon.indexOf('fa-') === -1" />
		<i :class="'fa' + icon" v-else></i>
		<ul>
			<slot></slot>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			height: {
				type: String,
				default: '1.875rem'
			},
			icon: {
				type: String,
				default: 'fa-volume-up'
			}
		}
	};
</script>

<style></style>
