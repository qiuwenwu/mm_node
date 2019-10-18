<template>
	<div :class="'my_grid' + 'col' + number">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			number: {
				type: Number,
				default: 1
			}
		},
		created() {
			if (this.number) {
				if (this.number.indexOf('_') == -1) {
					this.number = '_' + this.number
				}
			}
		}
	}
</script>

<style>
</style>
