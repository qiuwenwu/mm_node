<template>
	<!-- 号码 -->
	<div class="mm_number">
		<!-- 列表项 -->
		<mm_item class="hover">
			<mm_div>
				<mm_side>侧边
				
					<div class="title">标题</div>
					<div class="desc">描述</div>
					<mm_keyword>关键词</mm_keyword>
				
			</mm_div>
			<!-- 盒子 -->
			<mm_box>
				<mm_group>
					<button class="btn">测试</button>
					<button class="btn">按钮</button>
				</mm_group>
			</mm_box>
		
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		data() {}
	}
</script>

<style>
</style>
