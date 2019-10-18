<template>
	<div class="my_code">
		<label class="myFlex" :style="{ height: height }">
			<input type="text" :placeholder="placeholder" @blur="$emit('input', $event.target.value)" />
			<button @click="getCode" :disabled="disabled" :class="[disabled == true ? 'active' : '']" ref="refContent">{{ message }}</button>
		</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: this.btnMsg,
				disabled: false
			};
		},
		props: {
			value: {
				type: String,
				default: '4rem'
			},
			height: {
				type: String,
				default: '4rem'
			},
			placeholder: {
				type: String,
				default: '请输入验证码'
			},
			btnMsg: {
				type: String,
				default: '获取验证码'
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				var time = 60;
				var _this = this;
				var timerId = setInterval(function() {
					if (time > 1) {
						time--;
						_this.message = '剩余' + time + 's';
						_this.disabled = true;
						_this.$refs.refContent.style.cursor = 'not-allowed';
					} else {
						_this.disabled = false;
						_this.message = '重新获取验证码';
						_this.$refs.refContent.style.cursor = 'pointer';
						clearInterval(timerId);
					}
				}, 1000);
			}
		}
	};
</script>

<style></style>
