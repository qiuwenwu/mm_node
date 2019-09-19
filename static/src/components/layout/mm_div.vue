<template>
	<!-- 块 -->
	<div class="mm_div" v-if="!url">
		<slot></slot>
	</div>
	<div class="mm_div" @click="openBrowser()" v-else-if="url.indexOf('//') !== -1">
		<slot></slot>
	</div>
	<route-link class="mm_div" :to="url" v-else>
		<slot></slot>
	</route-link>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				type: ""
			}
		},
		methods: {
			openBrowser() {
				if (window) {
					window.open(this.url);
				}
			}
		}
	}
</script>

<style>
</style>
