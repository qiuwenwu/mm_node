<template>
	<!-- 表单列表 -->
	<div class="mm_list_menu">
		<nuxt-link class="mm_div" v-for="(o, k) in list" :key="k" :to="o[vm.url]">
			<div class="title">{{ o[vm.title] }}<span class="message" v-show="o[vm.message] > 0">{{ o[vm.message] }}</span></div>
			<div class="desc">
				<slot>{{ o[vm.desc] }}</slot>
			</div>
			<div class="tip">{{ o[vm.tip] }}</div>
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
