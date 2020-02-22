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
	.mm_page {
		min-height: 100vh;
		padding: 2rem 0;
		position: relative;
	}

	.mm_page>header h3 {
		padding-bottom: .5rem;
		border-bottom: 1px solid #dbdbdb;
	}

	.mm_page>header h3 .fr {
		color: #999;
		font-size: 1rem;
		padding-top: 0.75rem;
	}

	.mm_view>h5 {
		display: block;
		margin-top: 2rem;
		margin-bottom: .5rem;
	}
	
	.mm_col>.mm_view, [class^=mm_col_]>.mm_view {
		margin: 1rem;
	}
	
</style>
