<template>
	<div class="app">
		<dev_header v-show="user.token">页头</dev_header>
		<div class="dev_bodyer">
			<router-view></router-view>
		</div>
		<dev_footer v-show="user.token">页脚</dev_footer>
		<dev_float v-show="user.token">浮动栏</dev_float>
	</div>
</template>

<script>
	import Vue from 'Vue';

	// 全局组件
	import dev_ui from './ui';

	// 导入局部组件
	import dev_header from './components/dev_header.vue';
	import dev_footer from './components/dev_footer.vue';
	import dev_float from './components/dev_float.vue';

	export default {
		template: __template__,
		components: {
			dev_header,
			dev_footer,
			dev_float
		},
		data: function() {
			return {
				user: this.$store.state.user
			}
		}
	};
</script>

<style>
	[class^=page_] {
		min-height: 100vh;
		padding: 2rem 0 1.75rem 0;
		position: relative;
	}

	.diy_left>div {
		float: left;
	}

	.diy_right>div {
		float: right;
	}
</style>
