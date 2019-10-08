<template>
	<!-- 基础列表 -->
	<div class="mm_list_base">
		<div class="item_icon" v-if="icon" v-html="icon"></div>
		<div class="item_icon" v-else-if="icon">
			<img :src="icon" />
		</div>
		<div class="item_title" v-if="item_title"></div>
		<slot></slot>
		<div class="item_tip" v-if="item_tip"></div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/list'

	export default {
		mixins: [mixin],
		data() {
		}
	}
</script>

<style>

</style>
