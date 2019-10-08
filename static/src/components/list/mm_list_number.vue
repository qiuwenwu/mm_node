<template>
	<!-- 号码列表 -->
	<div class="mm_list_number">
		<!-- 列表项 -->
		<mm_item class="hover">
			<mm_div>
				<mm_side>侧边</mm_side>
				<mm_main>
					<mm_title>标题</mm_title>
					<mm_desc>描述</mm_desc>
					<mm_keyword>关键词</mm_keyword>
				</mm_main>
			</mm_div>
			<!-- 盒子 -->
			<mm_box>
				<mm_group>
					<button class="btn">测试</button>
					<button class="btn">按钮</button>
				</mm_group>
			</mm_box>
		</mm_item>
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
