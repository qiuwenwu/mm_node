<template>
	<!-- 图片 -->
	<div class="mm_img">
		<mm_icon :src="obj[vm.image]" :desc="obj[vm.tip]"></mm_icon>
		<div>
			<h5 v-html="obj[vm.title]"></h5>
			<p v-html="obj[vm.description]" v-if="obj[vm.description]"></p>
		</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin]
	}
</script>

<style>
</style>
