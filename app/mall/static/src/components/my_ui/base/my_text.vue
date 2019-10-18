<template>
	<div class="my_text">{{msg}}</div>
</template>

<script>
	export default {
		props: {
			msg: {
				ype: String,
				default: '我是文本'
			}
		},
		mounted() {
			this.$emit('input', this.msg)
		}
	}
</script>

<style>
</style>
