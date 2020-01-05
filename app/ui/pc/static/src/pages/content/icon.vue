<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">图标<span>&lt; 返回</span></div>
				</mm_view>

				<div class="h5">字体图标</div>
				<mm_view class="">
					<mm_icon src="<i class='fa fa-user'></i>"></mm_icon>
				</mm_view>

				<div class="h5">字体图标（镂空）</div>
				<mm_view class="">
					<mm_icon src="<i class='fa fa-user stroke'></i>"></mm_icon>
				</mm_view>

				<div class="h5">图片图标</div>
				<mm_view class="">
					<mm_icon src="/img/logo.png"></mm_icon>
				</mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
</script>

<style>
	.mm_icon { 
		font-size: 4rem;
	}
</style>
