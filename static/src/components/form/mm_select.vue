<template>
	<!-- 选择框 -->
	<div class="mm_select">
		<div class="title" v-if="title" v-html="title"></div>
		<div class="value" v-bind:class="{'disabled': disabled }">
			<select v-if="type == 'text'" :value="value" @change="set" :disabled="disabled">
				<option v-for="(o, idx) in options" :key="idx" :value="o[field]">{{ o.name }}</option>
			</select>
			<a href="javascript:void(0)" class="click" v-else-if="type === 'click'" v-bind:class="{ 'current': sw }">
				<div :class="{'selected': !$slots.default}" @click="sw = !sw">
					<slot>
						{{ val_name }}
					</slot>
				</div>
				<div class="mm_box">
					<ul>
						<li v-for="(o, idx) in options" :key="idx" @click="click_fun(o[field]);sw = false" :class="{ 'active': value === o[field] }">{{ o.name }}</li>
					</ul>
				</div>
			</a>
			<a href="javascript:void(0)" v-bind:class="type" v-else>
				<div class="selected">
					<slot>
						{{ val_name }}
					</slot>
				</div>
				<div class="mm_box">
					<ul>
						<li v-for="(o, idx) in options" :key="idx" @click="click_fun(o[field])" :class="{ 'active': value === o[field] }">{{ o.name }}</li>
					</ul>
				</div>
			</a>
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
				var val = e.target.value;
				this.$emit("input", val);
				if (this.value !== val) {
					this.$emit("change");
				}
			},
			click_fun(value) {
				this.$emit('input', value);
				this.func(value);
			}
		},
		computed: {
			val_name() {
				var k = this.field;
				var v = this.value;
				var lt = this.options;
				var name = "";
				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];
					if (o[k] === v) {
						name = o.name;
						break;
					}
				}
				return name;
			}
		}
	}
</script>

<style>
</style>
