<template>
	<!-- 格子 -->
	<div :class="'mm_col' + this.wh"><slot></slot></div>
</template>

<script>
	export default {
		props: {
			width: {
				type: String,
				default: ""
			}
		},
		data(){
			return {
				wh: this.width
			}
		},
		created(){
			if(this.wh){
				if(this.wh.indexOf("_") == -1)
				{
					this.wh = "_" + this.wh;
				}
			}
		}
	}
</script>

<style>
</style>
