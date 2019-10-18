<template>
	<div class="my_transfer_item" ref="childOption" @click="childCheck">
		<my_checkbox type="checkbox" :label="label"></my_checkbox>
	</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: '健身'
			}
		},
		methods: {
			childCheck() {
				var child = this.$refs.childOption.children;
				this.$emit('childCheck', child.length)
			}
		}
	}
</script>
<style>
</style>
