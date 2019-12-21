<template>
	<!-- 常见问题 -->
	<div class="mm_question">
		<mm_div :url="obj[vm.url]" v-for="(o, k) in list" :key="k">
			<div class="mini">
				<mm_item>
					<div class="title">{{ obj[vm.title] }}</div>
					<div class="desc">{{ obj[vm.desc] }}</div>
				
			</div>
		</mm_div>
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

	.mm_question .mm_div ~ .mm_div {
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
