<template>
	<div class="dev_dropdown" :id="name">
		<div class="state" @click="run">
			<mm_icon :src="obj.icon"></mm_icon>
			<div class="title" v-html="obj.title"></div>
			<div class="desc" v-html="obj.desc"></div>
			<i class="fa fa-" v-if="$slots.length > 0"></i>
		</div>
		<div class="modal" v-show="show">
			<div class="warp">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: { },
			obj: {
				type: Object,
				default: function() {
					return {
						title: "",
						desc: "",
						icon: ""
					};
				}
			},
			func: {
				type: Function,
				default: null
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			run() {
				if (this.func) {
					this.func();
				} else {
					this.show = true;
				}
			}
		},
		mounted() {

		}
	}
</script>

<style>
</style>
