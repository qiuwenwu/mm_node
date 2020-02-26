<template>
	<!-- 号码 -->
	<div class="mm_number">
		<div class="title">标题</div>
		<div class="desc">描述</div>
		<!-- 列表项 -->
		<div class="box">
			<mm_group>
				<button class="btn">测试</button>
				<button class="btn">按钮</button>
			</mm_group>
		</div>
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
