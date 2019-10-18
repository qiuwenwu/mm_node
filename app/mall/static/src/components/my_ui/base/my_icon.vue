<template>
	<!-- 图标 -->
	<div class="my_icon" v-if="src.indexOf('<') !== -1" v-html="src" @click="chooseOption"></div>
	<img class="my_icon" v-else-if="src" :src="src" mode="mode" @click="chooseOption" />
	<div class="my_icon" v-else @click="chooseOption">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			auto: {
				type: String,
				default: ''
			}
		},
		data() {
			var mode = '';
			if (this.auto) {
				mode = 'widthFix';
			}
			return {
				mode: mode
			};
		},
		methods: {
			chooseOption() {
				this.$emit('chooseOption')
			}
		}
	};
</script>

<style></style>
