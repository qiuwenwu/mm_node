<template>
	<option :value="label" class="my_select_item">
		<slot>{{label}}</slot>
	</option>
	</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: "请选择"
			}
		}
	}
</script>

<style>
</style>
