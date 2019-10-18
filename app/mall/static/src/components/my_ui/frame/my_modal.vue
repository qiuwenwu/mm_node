<template>
	<div class="my_modal">
		<slot></slot>
		<my_mask :style="{'backgroundColor':backgroundColor}"></my_mask>
	</div>
</template>

<script>
	export default {
		props: {
			backgroundColor: {
				type: String,
				default: "rgba(102, 102, 102, 0.5)"
			},
		}
	}
</script>

<style>
</style>
