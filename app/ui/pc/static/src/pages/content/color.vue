<template>
	<mm_page class="page_color">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">颜色<span>&lt; 返回</span></div>
				</mm_view>
				
				<div class="h5">炫彩</div>
				<mm_grid col="5">
					<mm_col><a href="javascript:void(0)" class="wave linear_red-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_red-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_yellow-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_yellow-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_green-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_green-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_blue-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_blue-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_purple-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_purple-2"></a></mm_col>
				</mm_grid>
					
				<div class="h5">炫彩(无高光)</div>
				<mm_grid col="5">
					<mm_col><a href="javascript:void(0)" class="wave linear_red"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_yellow"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_green"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_blue"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear_purple"></a></mm_col>
				</mm_grid>
					
				<div class="h5">常规</div>
				<mm_grid col="5">
					<mm_col><a href="javascript:void(0)" class="wave bg_red"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg_yellow"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg_green"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg_blue"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg_purple"></a></mm_col>
				</mm_grid>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
</script>

<style>
	.page_btn .h3 {
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid #dbdbdb;
	}
	
	.page_btn .h3 span {
		float: right;
		color: #999;
		font-size: 1rem;
		padding-top: 0.75rem;
	}
	
	.page_color .mm_col a {
		display: block;
		width: 4rem;
		height: 4rem;
		margin: .5rem auto;
		border-radius: .5rem;
	}
</style>
