<template>
	<mm_page id="root_index">
		<mm_body>
			<!-- 桌面应用 -->
			桌面应用
		</mm_body>
	</mm_page>
</template>

<script>
	import mm_pinyinlite from '/js/mm_pinyinlite.js';
	import Vue from 'Vue';

	export default {
		data: function() {
			return {
				web: this.$store.state.web
			}
		}
	};
</script>

<style>

</style>
