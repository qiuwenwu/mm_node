<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">加载<span>&lt; 返回</span></div>
				</mm_view>
				
				<div class="h5">样式一</div>
				<mm_view class="">
					<mm_loading></mm_loading>
				</mm_view>
					
				<div class="h5">样式二</div>
				<mm_view class="">
					<mm_loading class="loading"></mm_loading>
				</mm_view>
				
				<div class="h5">样式三</div>
				<mm_view class="">
					<mm_loading><i class="fa fa-user"></i></mm_loading>
				</mm_view>
					
				<div class="h5">样式四</div>
				<mm_view class="">
					<mm_loading><img src="/img/logo_round.png" style="width: 2rem;"></mm_loading>
				</mm_view>
					
				<div class="h5">样式五</div>
				<mm_view class="">
					<mm_loading display="2"></mm_loading>
				</mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
</script>

<style>
	.loading { text-align: left; }
	.loading .state { line-height: 1.75; }
	.loading .load { float: left; }
</style>
