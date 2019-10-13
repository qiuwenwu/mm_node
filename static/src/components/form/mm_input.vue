<template>
	<!-- 输入框 -->
	<div class="mm_input">
		<div class="title" v-if="title" v-html="title"></div>
		<div class="value" v-bind:class="{'disabled': disabled }">
			<input :type="type" :value="value" :min="min" :max="max" :minlength="min_length" :maxlength="max_length"
			 :placeholder="desc" @input="set" :disabled="disabled"/>
			<slot><span class="unit" v-if="unit">{{ unit }}</span></slot>
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
			set(e) {
				if (this.type === 'number') {
					var value = e.target.value ? e.target.value : "0";
					if (value.length > this.max_length && this.max_length !== 0) {
						value = value.substring(0, this.max_length);
					}
					var num = Number(value);
					if (num > this.max && this.max !== 0) {
						num = this.max
					} else if (num < this.min) {
						num = this.min
					}
					e.target.value = num.toString();
					this.$emit('input', num)
				} else {
					this.$emit('input', e.target.value)
				}
			}
		}
	}
</script>

<style>
</style>
