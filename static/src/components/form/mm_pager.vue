<template>
	<!-- 分页器 -->
	<div class="mm_pager">
		<a href="javascript:void(0);" v-if="display == '2'" class="first" @click="first" v-bind:class="{ 'disabled': page == 1 }">
			<span v-html="icons[0]"></span>
		</a>
		<a href="javascript:void(0);" class="previous" @click="previous" v-bind:class="{ 'disabled' : page <= 1 }">
			<span v-html="icons[1]"></span>
		</a>
		<a href="javascript:void(0);" v-for="(p, i) in pages" :key="i" v-bind:class="{'active': page == p }" @click="set(p)">{{ p }}</a>
		<a href="javascript:void(0);" class="next" v-bind:class="{ 'disabled': page >= count }" @click="next">
			<span v-html="icons[2]"></span>
		</a>
		<a href="javascript:void(0);" v-if="display == '2'" class="last" v-bind:class="{ 'disabled': page == count }" @click="last">
			<span v-html="icons[3]"></span>
		</a>
	</div>
</template>

<script>
	import mixin from '/src/mixins/form.js'

	export default {
		template: __template__,
		model: {
			prop: 'page',
			event: 'input'
		},
		props: {
			display: {
				type: String,
				default: '1'
			},
			count: {
				type: Number,
				default: 1
			},
			num: {
				type: Number,
				default: 5
			},
			page: {
				type: Number,
				default: 1
			},
			func: {
				type: Function,
				default: function(page) {}
			},
			icons: {
				type: Array,
				default: function() {
					return ["<<", "<", ">", ">>"]
				}
			}
		},
		data() {
			return {
				pe: this.page
			}
		},
		computed: {
			ct() {
				return Math.ceil(this.count);
			},
			pages() {
				var pe = this.page;
				var arr = [pe];
				var len = this.num;
				var end = this.ct;
				for (var i = 0; i < len; i++) {
					var right = pe + i + 1;
					if (right <= end) {
						arr.push(right);
					}
					var left = pe - i - 1;
					if (left > 0) {
						arr.push(left);
					}
				}
				return arr.splice(0, len).sort(function(a, b) {
					return a - b;
				});
			}
		},
		methods: {
			goTo(page) {
				if (this.func) {
					this.func(page);
				}
				this.$emit('input', page);
			},
			first() {
				this.pe = 1;
				this.goTo(this.pe);
			},
			previous() {
				this.pe = this.page - 1;
				if (this.pe < 1) {
					this.pe = 1
				};
				this.goTo(this.pe);
			},
			set(p) {
				this.pe = p;
				this.goTo(this.pe);
			},
			next() {
				this.pe = this.page + 1;
				if (this.pe > this.ct) {
					this.pe = this.ct;
				};
				this.goTo(this.pe);
			},
			last() {
				this.pe = this.ct;
				this.goTo(this.pe);
			}
		}
	}
</script>

<style>
</style>
