<template>
	<div id="app">
		<dev_head></dev_head>
		<mm_body id="body">
			<router-view></router-view>
		</mm_body>
		<dev_foot></dev_foot>
		<!-- 浮动栏 -->
		<div id="dev_float"></div>
	</div>
</template>

<script>
	import Vue from 'Vue';
	// 全局组件
	import dev_dropdown from './components/expand/dev_dropdown.vue';
	import dev_head from './components/dev_head.vue';
	import dev_foot from './components/dev_foot.vue';

	Vue.component('dev_dropdown', dev_dropdown);
	Vue.component('dev_head', dev_head);
	Vue.component('dev_foot', dev_foot);

	export default {
		data: function() {
			return {}
		}
	};
</script>

<style>
	.mm_page>.mm_body {
		padding: 2rem 0 1.75rem 0;
	}

	.diy_left>div {
		float: left;
	}

	.diy_right>div {
		float: right;
	}

	#body {
		border-top: 1px solid #24292e;
	}

	/* #c9def2 蓝  #e1e4e8 灰  #24292e 黑 #2f363d 经过黑  #000 描边 */
	#foot {
		min-height: 1.75rem;
		background: #fff;
		border-top: 1px solid #e1e4e8;
		font-size: 0.875rem;
		color: #666;
	}

	#foot a {
		color: #26d2ff;
	}

	/* 导航 */
	#foot .nav_bottom {
		line-height: 1.75rem;
	}

	#foot .nav_bottom li {
		float: left;
		padding: 0 0.75rem;
	}

	#foot .nav_bottom li:hover {
		background: #f6f8fa;
	}

	#foot .account {
		white-space: nowrap;
		float: left;
		padding: 0 1rem;
	}

	#foot .user {
		height: 1.75rem;
		line-height: 1.75rem;
		color: #666;
		display: block;
	}

	#foot .avatar {
		float: left;
		width: 1rem;
		height: 1rem;
		font-size: 0.625rem;
		border-radius: 50%;
		border: 2px solid #666;
		line-height: 1rem;
		text-align: center;
		margin-right: 0.5rem;
		margin-top: 0.35rem;
	}

	.mm_side .line {
		top: 4rem;
	}

	.table-sm th {
		padding-left: .75rem;
		padding-right: .75rem;
	}
</style>
