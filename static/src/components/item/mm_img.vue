<template>
	<!-- 表单 -->
	<router-link class="mm_menu" :to="obj[vm.url]">
		<div class="title">{{ obj[vm.title] }}</div>
		<div class="message" v-show="obj[vm.message] > 0">{{ obj[vm.message] }}</div>
		<div class="desc">{{ obj[vm.desc] }}</div>
		<div class="tip">{{ obj[vm.tip] }}</div>
	</router-link>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		data() {}
	}
</script>

<style>
</style>
