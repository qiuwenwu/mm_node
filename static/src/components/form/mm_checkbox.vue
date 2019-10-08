<template>
	<!-- 复选框 -->
	<div class="mm_checkbox">
		<div class="title" v-if="title" v-html="title"></div>
		<div class="value" v-bind:class="{'disabled': disabled }">
			<label v-for="(o, idx) in options" :key="idx" :class="{ 'active': has(o[field]), 'disabled': o.disabled }" @click="selected(o[field])">
				<span class="figure"></span>
				<span class="name">{{ o.name }}</span>
			</label>
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
			selected(val) {
				var arr = this.value.split(',');
				var idx = arr.indexOf(val);
				if (idx !== -1) {
					arr.splice(idx, 1)
				} else {
					arr.push(val);
				}
				var val = arr.join(',');
				if (val.indexOf(',') === 0) {
					val = val.substring(1);
				}
				this.$emit('input', val);
			},
			has(val) {
				var arr = this.value.split(',');
				return arr.indexOf(val) !== -1;
			}
		}
	}
</script>

<style>
</style>
