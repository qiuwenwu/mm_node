<template>
	<div class="mm_loading" v-show="show">
		<slot>
			<div class="mm_loading_img"><img src="/img/loading.svg" /></div>
			<div class="mm_loading_state">{{ title }}<span class="mm_loading_value" v-show="value"> {{ value }}</span></div>
		</slot>
	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			value: {
				type: Number,
				default: 0
			},
			title: {
				type: String,
				default: '加载中'
			}
		}
	}
</script>

<style>
</style>
