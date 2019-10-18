<template>
	<div class="my_button" type="default" :disabled="disabled" :style="{ color: color, width: width, backgroundColor: backgroundColor }"
	 @click="change">{{ label }}</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: '默认按钮'
			},
			width: {
				type: String,
				default: '6.25rem'
			},
			backgroundColor: {
				type: String,
				default: 'rgb(255, 255, 255)'
			},
			color: {
				type: String,
				default: '#333'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			change() {
				this.$emit('submitValue')
			}
		}
	};
</script>

<style scoped></style>
