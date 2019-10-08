<template>
	<!-- 列表 -->
	<div :class="'mm_list' + cl">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			col: {
				type: String,
				default: ""
			}
		},
		computed: {
			cl() {
				var cl = this.col;
				if (cl && cl.indexOf("_") == -1) {
					cl = "_" + cl;
				}
				return cl
			}
		}
	}
</script>

<style>
</style>
