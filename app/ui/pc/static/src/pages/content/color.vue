<template>
	<mm_page class="page_color">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">颜色<span>&lt; 返回</span></div>
				</mm_view>
				
				<div class="h5">炫彩</div>
				<mm_grid col="5">
					<mm_col><a href="javascript:void(0)" class="wave linear-red-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-red-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-yellow-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-yellow-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-green-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-green-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-blue-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-blue-2"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-purple-1"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-purple-2"></a></mm_col>
				</mm_grid>
					
					
				<div class="h5">炫彩(无高光)</div>
				<mm_grid col="5">
					<mm_col><a href="javascript:void(0)" class="wave linear-red"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-yellow"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-green"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-blue"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave linear-purple"></a></mm_col>
				</mm_grid>
					
				<div class="h5">常规</div>
				<mm_grid col="5">
					<mm_col><a href="javascript:void(0)" class="wave bg-red"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg-yellow"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg-green"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg-blue"></a></mm_col>
					<mm_col><a href="javascript:void(0)" class="wave bg-purple"></a></mm_col>
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
