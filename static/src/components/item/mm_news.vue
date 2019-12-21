<template>
	<!-- 新闻 -->
	<div class="mm_news">
		<mm_list col="1">
			<mm_item :to="obj[vm.url]" v-for="(o, k) in list" :key="k">
				
					<mm_icon :src="obj[vm.icon]"></mm_icon>
				
				
					<div class="title">{{ obj[vm.title] }}</div>
					<div class="desc"><span class="time">{{ obj.createTime }}</span></div>
				
			
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
	.mm_news .mm_side ~ .mm_main { min-height: 3.5rem; }
</style>
