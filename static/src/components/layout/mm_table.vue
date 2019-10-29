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
		computed: {
			te(){
				var t = this.type;
				if (t) {
					if (t.indexOf("_") == -1) {
						t = "_" + t;
					}
				}
				return t;
			}
		}
	}
</script>

<style>
</style>
