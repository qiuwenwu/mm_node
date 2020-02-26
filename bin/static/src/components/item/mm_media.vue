<template>
	<!-- 媒体 -->
	<div class="mm_media">
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
