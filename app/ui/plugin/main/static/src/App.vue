<template>
	<router-view></router-view>
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
	body {
		background: #fff;
	}
	body>div>header h3{ 
		padding-left: .5rem;
		padding-right: .5rem;
	}
	body>div>header {
		background: #fff;
		color: #333;
		padding-top: 3rem;
		border-bottom: 1px solid rgba(125,125,125,0.25);
		padding-bottom: 0.5rem;
	}
	
	main {
		padding: 2rem 0;
	}
	header h3 .fr {
		color: #999;
		font-size: 1rem;
		padding-top: .5rem;
	}
</style>
