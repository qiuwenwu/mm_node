<template>
	<!-- 常见问题 -->
	<div class="mm_question" :url="obj[vm.url]" :key="k">
		<div class="title">{{ obj[vm.title] }}</div>
		<div class="desc">{{ obj[vm.desc] }}</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin]
	}
</script>

<style>
	.mm_question .mm_item {
		border-bottom: none;
		margin-bottom: 2rem;
	}

	.mm_question .mm_view~.mm_view {
		margin-top: 0.5rem;
	}

	.mm_question .div {
		color: #333;
	}

	.mm_question .mm_desc {
		float: left;
		margin-top: 1rem;
	}
</style>
