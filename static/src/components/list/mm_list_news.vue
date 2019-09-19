<template>
	<!-- 新闻列表 -->
	<div class="mm_list_news">
		<mm_list col="1">
			<mm_item :to="o[vm.url]" v-for="(o, k) in list" :key="k">
				<mm_side v-if="o[vm.icon]">
					<mm_icon :src="o[vm.icon]"></mm_icon>
				</mm_side>
				<mm_main>
					<mm_title>{{ o[vm.title] }}</mm_title>
					<mm_desc><span class="time">{{ o.createTime }}</span></mm_desc>
				</mm_main>
			</mm_item>
		</mm_list>
	</div>
</template>

<script>
	import mixin from '@/mixins/list'

	export default {
		mixins: [mixin]
	}
</script>

<style>
	.mm_list_news .mm_side ~ .mm_main { min-height: 3.5rem; }
</style>
