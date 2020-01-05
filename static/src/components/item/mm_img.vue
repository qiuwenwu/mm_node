<template>
	<!-- 图片 -->
	<div class="mm_img">
		<mm_icon :src="obj[vm.image]"></mm_icon>
		<div class="title" v-html="obj[vm.title]"></div>
		<div class="message" v-show="obj[vm.message] > 0">{{ obj[vm.message] }}</div>
		<div class="desc" v-html="obj[vm.description]" v-if="obj[vm.description]"></div>
		<div class="tip" v-html="obj[vm.tip]" v-if="obj[vm.tip]"></div>
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
