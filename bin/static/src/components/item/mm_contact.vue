<template>
	<!-- 用户 -->
	<div class="mm_contact">
		<mm_icon :src="obj[vm.icon]"></mm_icon>
		<div class="name">{{ obj[vm.name] }}</div>
		<div class="remark" v-class="{'show': edit}" @click="run('remark', obj)">备注</div>
		<div class="del" v-class="{'show': edit}" @click="run('del', obj)">删除</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		data() {
			return {
				edit: false
			};
		}
	}
</script>

<style>
</style>
