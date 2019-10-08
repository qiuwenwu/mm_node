<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">开关<span>&lt; 返回</span></div>
				</mm_div>
				
				<div class="h5">样式一（PC）</div>
				<mm_div class="pc">
					<mm_switch title="开关" v-model="value"></mm_switch>
				</mm_div>
				
				<div class="h5">样式二（PC）</div>
				<mm_div class="pc">
					<mm_switch title="开关" v-model="value" display="false"></mm_switch>
				</mm_div>
					
				<div class="h5">样式三（mobile）</div>
				<mm_div class="mobile">
					<mm_switch title="开关" v-model="value"></mm_switch>
				</mm_div>
				
				<div class="h5">样式四（mobile）</div>
				<mm_div class="mobile">
					<mm_switch title="开关" v-model="value" display="false"></mm_switch>
				</mm_div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				value: 1
			}
		}
	}
</script>

<style>
</style>
