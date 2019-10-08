<template>
	<div class="mm_reverse">
		<div class="title" v-if="title" v-html="title" @click="set"></div>
		<div class="value" v-bind:class="{'disabled': disabled }">
			<slot>
				<div class="figure" v-bind:class="{ 'reverse_arrow' : display !== '1' }" @click="set">
					<span class="up" v-bind:class="{'active': seleted === 0 }"></span>
					<span class="down" v-bind:class="{'active': seleted === 1 }"></span>
				</div>
			</slot>
		</div>
		<div class="tip" v-if="tip">{{ tip }}</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/form.js'

	export default {
		template: __template__,
		mixins: [mixin],
		methods: {
			set() {
				var n = this.seleted;
				n += 1;
				var lt = this.options;
				var v = "";
				if (n < lt.length) {
					v = lt[n];
				} else if (n > lt.length) {
					n = 0;
					v = lt[0];
				}
				var val = this.value;
				var has = false;
				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];
					if (val.indexOf(o) !== -1) {
						val = val.replace(o, v);
						has = true;
						val = val.replace(",,", ",");
						break;
					}
				}
				if (!has) {
					val += "," + v;
				}
				if (val.indexOf(',') === 0) {
					val = val.substring(1);
				}
				this.$emit('input', val);
				if(this.func){
					this.func(val);
				}
			}
		},
		computed: {
			seleted(){
				var lt = this.options;
				var val = this.value;
				var seleted = 2;
				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];
					if (val.indexOf(o) !== -1) {
						seleted = i;
						break;
					}
				}
				return seleted
			}
		}
	}
</script>

<style>
</style>
