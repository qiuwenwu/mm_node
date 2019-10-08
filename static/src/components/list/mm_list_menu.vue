<template>
	<!-- 表单列表 -->
	<div class="mm_list_menu">
		<nuxt-link class="mm_block" v-for="(o, k) in list" :key="k" to="/pages/home/article_list?title=关于我们">
			<div class="menu_title">{{ o[vm.title] }}</div>
			<div class="menu_desc">
				<slot>{{ o[vm.desc] }}</slot>
			</div>
			<div class="menu_tip">{{ o[vm.tip] }}</div>
		</nuxt-link>
	</div>
</template>

<script>
	import mixin from '/src/mixins/list'

	export default {
		mixins: [mixin],
		data() {}
	}
</script>

<style>
</style>
