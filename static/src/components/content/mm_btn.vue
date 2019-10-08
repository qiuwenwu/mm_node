<template>
	<!-- 按钮 -->
	<button :class="'mm_btn' + te" v-if="!url" @click="click_down()">
		<slot></slot>
	</button>
	<button type="button" :class="'mm_btn' + te" @click="openBrowser()" v-else-if="url.indexOf('http:') === 0 || url.indexOf('https:') === 0">
		<slot></slot>
	</button>
	<router-link :class="'mm_btn' + te" :to="url" v-else>
		<slot></slot>
	</router-link>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
			func: {
				type: Function,
				default: function(){}
			}
		},
		data() {
			return {
				te: ""
			}
		},
		methods: {
			openBrowser() {
				if (window) {
					window.open(this.url);
				}
			},
			click_down(){
				if(this.func)
				{
					this.func();
				}
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
