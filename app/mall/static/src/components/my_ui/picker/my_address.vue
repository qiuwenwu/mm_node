<template>
	<div class="my_address">
		<v-distpicker type="mobile" @selected="selected"></v-distpicker>
	</div>
</template>

<script>
	import VDistpicker from '/mall/js/v-distpicker.js'; //引入安装好的包
	export default {
		data() {
			return {};
		},
		components: {
			'v-distpicker': VDistpicker
		},
		methods: {
			// 省市区三级联动
			selected(data) {
				this.$emit('selected', data)
			}
		}
	};
</script>

<style></style>
