<template>
	<!-- 图标 -->
	<div class="mm_icon" v-if="src.indexOf('<') !== -1" v-html="src"></div>
	<div class="mm_icon" v-else-if="src"><img :src="src" mode="mode" /></div>
	<div class="mm_icon" v-else></div>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ""
			},
			height: {
				type: String,
				default: ""
			},
			auto: 
			{
				type: String,
				default: ""
			}
		},
		data() {
			var mode = "";
			if(this.auto){
				mode = "widthFix";
			}
			return {
				mode: mode
			}
		}
	}
</script>

<style>
</style>
