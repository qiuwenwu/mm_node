<template>
	<!-- 复选框 -->
	<div class="mm_checkbox">
		<div class="mm_title" v-if="title">{{ title }}</div>
	</div>
</template>

<script>
	import mixin from '@/mixins/form'

	export default {
		mixins: [mixin]
	}
</script>

<style>
</style>
