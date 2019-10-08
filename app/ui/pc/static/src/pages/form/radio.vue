<template>
	<mm_page class="page_radio">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">单选框<span>&lt; 返回</span></div>
				</mm_div>

				<div class="h5">样式一(PC)</div>
				<mm_div class="pc">
					<mm_radio v-model="value" :options="options"></mm_radio>
				</mm_div>

				<div class="h5">样式二(mobile)</div>
				<mm_div class="mobile">
					<mm_radio v-model="value" :options="options"></mm_radio>
				</mm_div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				options: [{
						name: "选项一",
						value: "1",
					},
					{
						name: "选项二",
						value: "2",
					},
					{
						name: "选项三",
						value: "3",
					}
				]
			}
		}
	}
</script>

<style>
</style>
