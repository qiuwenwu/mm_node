<template>
	<!-- 媒体列表 -->
	<div class="mm_list_media">
		<slot></slot>
	</div>
</template>

<script>
	import mixin from '@/mixins/list'

	export default {
		mixins: [mixin],
		data() {}
	}
</script>

<style>
</style>
