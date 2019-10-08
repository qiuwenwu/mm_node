<template>
	<!-- 模态窗 -->
	<div class="mm_modal" v-bind:class="{ 'show' : show }">
		<div v-bind:class="'from_' + display">
			<slot></slot>
		</div>
		<!-- 遮罩 -->
		<div class="mask" v-if="mask && mask != 'false'" @click="close()"></div>
	</div>
</template>

<script>
	export default {
		props: {
			display: {
				type: String,
				default: ""
			},
			show: {
				type: Boolean,
				default: false
			},
			mask: {
				type: String,
				default: ""
			}
		},
		model: {
			prop: 'show',
			event: 'input' // 设置$emit通知，当为input时发起通知v-model
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
