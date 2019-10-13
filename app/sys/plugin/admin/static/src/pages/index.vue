<template>
	<mm_page id="root_index">
		<mm_head>
			<div class="nav">
				<router-link v-for="(o, idx) in nav_main" :key="idx" :to="o.url">{{ o.title }}</router-link>
			</div>
		</mm_head>
		<mm_body>
			
		</mm_body>
	</mm_page>
</template>

<script>
	import mm_pinyinlite from '/js/mm_pinyinlite.js';
	import Vue from 'Vue';

	export default {
		template: __template__,
		data: function() {
			return {
				web: this.$store.state.web
			}
		},
		computed: {
			nav_main() {
				var list = this.web.main;
				list.sortBy('asc', 'display')
				return list;
			}
		}
	};
</script>

<style>
	#root_index .mm_head {
		min-height: 2rem;
		line-height: 2rem;
		background: #24292e;
		color: #fff;
		font-size: 0.875rem;
	}

	#root_index .nav a {
		color: inherit;
		padding: 0.5rem;
	}
</style>
