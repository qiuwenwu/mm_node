<template>
	<!-- 表单列表 -->
	<div class="mm_list_form">
		<slot></slot>
	</div>
</template>

<script>
	import mixin from '/src/mixins/list'

	export default {
		mixins: [mixin],
		data() {}
	}
</script>

<style>
</style>
