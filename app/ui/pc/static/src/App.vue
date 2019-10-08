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
	[class*=page_] {
		min-height: 100vh;
		padding: 2rem 0;
		position: relative;
	}
	
	[class*=page_] .h3 {
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid #dbdbdb;
	}
	
	[class*=page_] .h3 span {
		float: right;
		color: #999;
		font-size: 1rem;
		padding-top: 0.75rem;
	}
	
	[class*=page_] .h5 {
		display: block;
		margin-top: 2rem;
	}
</style>
