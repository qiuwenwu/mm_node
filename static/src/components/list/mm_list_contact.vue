<template>
	<!-- 用户列表 -->
	<mm_list col="1" class="small">
		<mm_item v-for="(o, k) in list" :key="k" :to="o[vm.url]">
			<mm_side v-if="o[vm.icon]">
				<mm_icon :src="o[vm.icon]"></mm_icon>
			</mm_side>
			<mm_main>
				<mm_title>{{ o[vm.name] }}</mm_title>
			</mm_main>
		</mm_item>
	</mm_list>
</template>

<script>
	import mixin from '@/mixins/list'

	export default {
		mixins: [mixin],
		data() {}
	}
</script>

<style>
</style>
