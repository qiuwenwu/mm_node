<template>
	<!-- 视图 -->
	<div class="mm_view" :contenteditable="edit">
		<slot>
			<div class="mm_title" v-if="title">{{ title }}</div>
			<div class="mm_value">{{ value }}</div>
		</slot>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			value: {
				type: String,
				default: ""
			},
			edit: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
</style>
