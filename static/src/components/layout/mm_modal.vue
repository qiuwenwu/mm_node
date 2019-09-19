<template>
	<!-- 模态窗 -->
	<div class="mm_modal" v-bind:class="{ 'show' : show }">
		<slot></slot>
		<!-- 遮罩 -->
		<mm_mask v-if="display" @click.native="close()"></mm_mask>
	</div>
</template>

<script>
	export default {
		model: {
			prop: 'show',
			event: 'input' // 设置$emit通知，当为input时发起通知v-model
		},
		props: {
			display: {
				type: String,
				default: "true"
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			close() {
				this.$emit('input', false);
			}
		}
	}
</script>

<style>
</style>
