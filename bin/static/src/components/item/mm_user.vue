<template>
	<!-- 用户 -->
	<div class="small">
		<mm_icon :src="obj[vm.icon]"></mm_icon>
		<div class="title">{{ obj[vm.name] }}</div>
		<div class="collect" :show="show" @click="run('collect', obj)">关注</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		data() {
			return {};
		}
	}
</script>

<style>
</style>
