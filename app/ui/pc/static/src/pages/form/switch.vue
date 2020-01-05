<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">开关<span>&lt; 返回</span></div>
				</mm_view>
				
				<div class="h5">样式一（PC）</div>
				<mm_view class="pc">
					<mm_switch title="开关" v-model="value"></mm_switch>
				</mm_view>
				
				<div class="h5">样式二（PC）</div>
				<mm_view class="pc">
					<mm_switch title="开关" v-model="value" display="false"></mm_switch>
				</mm_view>
					
				<div class="h5">样式三（mobile）</div>
				<mm_view class="mobile">
					<mm_switch title="开关" v-model="value"></mm_switch>
				</mm_view>
				
				<div class="h5">样式四（mobile）</div>
				<mm_view class="mobile">
					<mm_switch title="开关" v-model="value" display="false"></mm_switch>
				</mm_view>
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
