<template>
	<!-- 新闻 -->
	<div class="mm_news" :to="obj[vm.url]" :key="k">
		<mm_icon :src="obj[vm.icon]"></mm_icon>
		<div class="title">{{ obj[vm.title] }}</div>
		<div class="desc"><span class="time">{{ obj.createTime }}</span></div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin]
	}
</script>

<style>
	.mm_news .mm_side~.mm_main {
		min-height: 3.5rem;
	}
</style>
