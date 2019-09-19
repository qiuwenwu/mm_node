<template>
	<!-- 常见问题列表 -->
	<div class="mm_list_question">
		<mm_div :url="o[vm.url]" v-for="(o, k) in list" :key="k">
			<mm_list col="1" class="mini">
				<mm_item>
					<mm_title>{{ o[vm.title] }}</mm_title>
					<mm_desc>{{ o[vm.desc] }}</mm_desc>
				</mm_item>
			</mm_list>
		</mm_div>
	</div>
</template>

<script>
	import mixin from '@/mixins/list'

	export default {
		mixins: [mixin]
	}
</script>

<style>
	.mm_list_question .mm_item {
		border-bottom: none;
		margin-bottom: 2rem;
	}

	.mm_list_question .mm_div ~ .mm_div {
		margin-top: 0.5rem;
	}

	.mm_list_question .mm_title {
		color: #333;
	}
	.mm_list_question .mm_desc {
		float: left;
		margin-top: 1rem;
	}
</style>
