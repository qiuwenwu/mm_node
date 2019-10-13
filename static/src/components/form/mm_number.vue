<template>
	<!-- 数字框 -->
	<div class="mm_number">
		<div class="title" v-if="title" v-html="title"></div>
		<div class="value" v-bind:class="{'disabled': disabled }">
			<mm_btn :type="type" @click.native="del"><span class="btn_del"></span></mm_btn>
			<input type="number" :value="value" :min="min" :max="max" @input="set" @blur="setInt" :disabled="disabled"/>
			<mm_btn :type="type" @click.native="add"><span class="btn_add"></span></mm_btn>
		</div>
		<div class="tip" v-if="tip">{{ tip }}</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/form.js';
	export default {
		template: __template__,
		mixins: [mixin],
		methods: {
			setInt(e) {
				var value = e.target.value ? e.target.value : "0";
				var num = Number(value);
				num = parseInt(num / this.num) * this.num;
				this.call(num);
			},
			add() {
				this.call(this.value + this.num);
			},
			del() {
				this.call(this.value - this.num);
			},
			set(e) {
				var value = e.target.value ? e.target.value : "0";
				var num = Number(value);
				e.target.value = this.call(num);
			},
			call(num) {
				if (num > this.max && this.max !== 0) {
					num = this.max
				} else if (num < this.min) {
					num = this.min
				}
				this.$emit('input', num);
				return num;
			}
		}
	}
</script>

<style>
</style>
