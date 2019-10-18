<template>
	<div class="my_datetime" @click="getTime">
		<vue-hash-calendar ref="picker" :model="model"></vue-hash-calendar>
	</div>
</template>

<script>
	export default {
		props: {
			model: {
				type: String,
				default: 'dialog'
			}
		},
		mounted() {
			this.$refs.picker.show();
		},
		methods: {
			getTime() {
				this.$emit('change', '222');
			}
		}
	};
</script>

<style>
	.calendar_day_not {
		color: #bdbdbd !important;
	}
</style>
