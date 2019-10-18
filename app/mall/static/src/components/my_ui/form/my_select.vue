<template>
	<div class="my_select">
		<select name="" id="" :style="{'width':width}" v-model="label">
			<slot></slot>
		</select>
	</div>
</template>

<script>
	export default {
		props: {
			width: {
				type: String,
				default: "9.375rem"
			},
			label: {
				type: String,
				default: "请选择"
			}
		}
	}
</script>

<style>
</style>
