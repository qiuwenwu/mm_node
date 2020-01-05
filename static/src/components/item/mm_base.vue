<template>
	<!-- 基础 -->
	<div class="mm_base">
		<mm_icon :src="obj[vm.icon]">
		<div class="title" v-if="obj[vm.title]">{{ obj[vm.title] }}</div>
		<div class="desc" v-if="obj[vm.desc]">{{ obj[vm.desc] }}</div>
		<div class="tip" v-if="obj[vm.tip]">{{ obj[vm.tip] }}</div>
		<slot></slot>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		data() {
			return {
			};
		}
	}
</script>

<style>

</style>
