<template>
	<div class="my_switch">
		<input type="checkbox" class="checkbox_switch" name="" id="" v-model="switchStatus" :style="{'width':width,'height':height}">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				switchStatus: false
			}
		},
		props: {
			type: {
				type: String,
				default: 'checkbox'
			},
			label: {
				type: String,
				default: '健身'
			},
			width: {
				type: String,
				default: '4rem'
			},
			height: {
				type: String,
				default: '2rem'
			}
		}
	}
</script>

<style>
</style>
