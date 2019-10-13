<template>
	<div class="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'Vue';

	export default {
		template: __template__,
		components: {},
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
