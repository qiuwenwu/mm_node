<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">选择框<span>&lt; 返回</span></div>
				</mm_div>
				
				<div class="h5">样式一 (原生)</div>
				<mm_div class="pc">
					<mm_select v-model="value" :options="options"></mm_select>
				</mm_div>
				
				<div class="h5">样式二 (鼠标经过 hover)</div>
				<mm_div class="pc">
					<mm_select v-model="value" :options="options" type="hover"></mm_select>
				</mm_div>
				
				<div class="h5">样式三 (获取焦点 focus)</div>
				<mm_div class="pc">
					<mm_select v-model="value" :options="options" type="focus"></mm_select>
				</mm_div>
				
				<div class="h5">样式三 (点击 click)</div>
				<mm_div class="pc">
					<mm_select v-model="value" :options="options" type="click"></mm_select>
				</mm_div>
					
				<div class="h5"></div>
				<mm_div class="">
					{{ value }}
				</mm_div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				value: "3",
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
