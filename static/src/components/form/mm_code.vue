<template>
	<!-- 验证码 -->
	<div class="mm_code">
		<mm_side v-if="icon">
			<mm_icon :icon="icon"></mm_icon>
		</mm_side>
		<mm_main>
			<div class="mm_title" v-if="title">{{ title }}</div>
			<slot>
				<mm_group>
					<input type="text" :value="value" :placeholder="desc" @input="$emit('input', $event.target.value)"></input>
					<button :class="'mm_btn_' + type" v-html="btn"></button>
				</mm_group>
			</slot>
		</mm_main>
		<mm_tip v-if="tip" v-html="tip"></mm_tip>
	</div>
</template>

<script>
	import mixin from '@/mixins/form'

	export default {
		mixins: [mixin],
		props: {
			btn: {
				type: String,
				default: "发送验证码"
			}
		},
		computed: {
			ds() {
				if (this.btn.indexOf('s') == -1) {
					return false;
				} else {
					return true;
				}
			}
		}
	}
</script>

<style>
	.mm_code .mm_group {
		border-bottom: none;
	}
</style>
