<template>
	<!-- 消息 -->
	<div class="mm_message">
		<slot></slot>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		data() { return {};}
	}
</script>

<style>
</style>
