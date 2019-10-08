<template>
	<!-- 单选框 -->
	<div class="mm_radio">
		<div class="title" v-if="title" v-html="title"></div>
		<div class="value" v-bind:class="{'disabled': disabled }">
			<label v-for="(o, idx) in options" :key="idx" :class="{ 'active': value === o[field] }" @click="$emit('input', $event.target.value)">
				<input type="radio" :name="name" :value="o[field]" />
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
		data() {
			var name = this.name;
			if (!name) {
				name = $.md5(Math.random().toString()).substring(0, 8);
			}
			return {
				name: name
			}
		}
	}
</script>

<style>
</style>
