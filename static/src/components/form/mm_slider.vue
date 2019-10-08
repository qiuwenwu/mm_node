<template>
	<!-- 滑块 -->
	<div class="mm_slider">
		<div class="value" v-bind:class="{'disabled': disabled }">
			<div class="mm_slider_btn"></div>
			<div class="mm_slider_rule"></div>
		</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/form.js'

	export default {
		mixins: [mixin],
		data() {
			return {
				pos: {
					left: 0,
					right: 0,
					now: 0,
					isBtn: 0,
					propoWidth: 0
				},
				myDefault: null
			}
		}
	}
</script>

<style>

</style>
