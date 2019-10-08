<template>
	<table :class="'mm_table' + te">
		<slot></slot>
	</table>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				te: ""
			}
		},
		created() {
			var t = this.type;
			if (t) {
				if (t.indexOf("_") == -1) {
					this.te = "_" + t;
				}
			}
		}
	}
</script>

<style>
</style>
