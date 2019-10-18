<template>
	<div class="my_textarea">
		<textarea name="" id="" :rows="rows" :placeholder="placeholder" :style="{ width: width }" @blur="changeNumber"
		 :maxlength="number" :disabled="num == 0">
    </textarea>
		<span>0/{{ num }}</span>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '100%'
			},
			rows: {
				type: String,
				default: '3'
			},
			placeholder: {
				type: String,
				default: '请输入...'
			},
			number: {
				type: Number,
				default: 100
			}
		},
		methods: {
			changeNumber(e) {
				this.$emit('input', e.target.value)
			}
		},
		computed: {
			num() {
				return this.number - this.value.length;
			}
		}
	};
</script>

<style></style>
