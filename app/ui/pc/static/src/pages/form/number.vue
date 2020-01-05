<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">计数器<span>&lt; 返回</span></div>
				</mm_view>

				<div class="h5">样式一</div>
				<mm_view class="pc">
					<mm_number v-model="value" :min="min" :max="max" :num="num"></mm_number>
				</mm_view>

				<div class="h5">样式二</div>
				<mm_view class="mobile">
					<mm_number v-model="value" :min="min" :max="max" :num="num"></mm_number>
				</mm_view>
				
				<div class="h5"></div>
				<mm_view class="">
					{{ value }}
				</mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				value: 5,
				min: 5,
				max: 150,
				// 每次增减数
				num: 5
			}
		}
	}
</script>

<style>
</style>