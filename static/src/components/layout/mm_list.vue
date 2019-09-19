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
		data() {
			return {
				cl: this.col
			}
		},
		created() {
			if (this.cl) {
				if (this.cl.indexOf("_") == -1) {
					this.cl = "_" + this.cl;
				}
			}
		}
	}
</script>

<style>
</style>
