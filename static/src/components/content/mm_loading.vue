<template>
	<div class="mm_loading">
		<div class="load">
			<slot>
				<img src="/img/loading.svg" :style="'width:' + wh + ';height:' + ht" v-if="display == 1" />
				<div class="progress" :style="'width:' + wh + ';height:' + ht" v-else></div>
			</slot>
		</div>
		<div class="state">{{ title }}<span class="value" v-show="value"> {{ value }}</span></div>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default: 0
			},
			title: {
				type: String,
				default: '加载中'
			},
			width: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			display: {
				type: String,
				default: '1'
			}
		},
		data() {
			var wh = '';
			var ht = '';
			if (this.width) {
				wh = this.width;
			} else {
				if (this.display == '1') {
					wh = '1.5rem';
				} else if (this.display == '2') {
					wh = '100%';
				}
			}
			if (this.height) {
				wh = this.height;
			} else {
				if (this.display == '1') {
					ht = '1.5rem';
				} else if (this.display == '2') {
					ht = '4px';
				}
			}
			return {
				ht: ht,
				wh: wh
			}
		}
	}
</script>

<style>
</style>
