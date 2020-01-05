<template>
	<!-- 商品 -->
	<div class="mm_goods">
		<mm_icon :src="obj[vm.icon]"></mm_icon>
		<div class="title">{{ obj[vm.title] }}</div>
		<div class="desc">{{ obj[vm.desc] }}</div>
		<div class="tag" v-html="obj[vm.tag]"></div>
		<div class="price">{{ obj[vm.price] }}</div>
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
