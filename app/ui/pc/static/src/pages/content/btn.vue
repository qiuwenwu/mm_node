<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">按钮<span>&lt; 返回</span></div>
				</mm_view>
				
				<div class="h5">按钮颜色——带背景</div>
				<mm_view class="">
					<mm_btn type="default">默认</mm_btn>
					<mm_btn type="primary">主要</mm_btn>
					<mm_btn type="info">信息</mm_btn>
					<mm_btn type="success">成功</mm_btn>
					<mm_btn type="warning">错误</mm_btn>
					<mm_btn type="danger">警告</mm_btn>
				</mm_view>
				
				<div class="h5">按钮——不带背景</div>
				<mm_view class="">
					<mm_btn type="default-x">默认</mm_btn>
					<mm_btn type="primary-x">主要</mm_btn>
					<mm_btn type="info-x">信息</mm_btn>
					<mm_btn type="success-x">成功</mm_btn>
					<mm_btn type="warning-x">错误</mm_btn>
					<mm_btn type="danger-x">警告</mm_btn>
				</mm_view>
					
				<div class="h5">全屏宽按钮</div>
				<mm_view class="">
					<mm_group>
						<mm_btn type="default">默认</mm_btn>
					</mm_group>

					<mm_group>
						<mm_btn type="warning">错误</mm_btn>
						<mm_btn type="success">成功</mm_btn>
					</mm_group>

					<mm_group>
						<mm_btn type="primary">主要</mm_btn>
						<mm_btn type="info">信息</mm_btn>
						<mm_btn type="danger">警告</mm_btn>
					</mm_group>
				</mm_view>

				<div class="h5">全屏宽按钮圆角</div>
				<mm_view class="btn-3">
					<mm_group class="b-a mtb">
						<mm_btn type="default">默认</mm_btn>
					</mm_group>
					<mm_group class="b-a mtb">
						<mm_btn type="warning">错误</mm_btn>
						<mm_btn type="success">成功</mm_btn>
					</mm_group>
					<mm_group class="b-a mtb">
						<mm_btn type="primary">主要</mm_btn>
						<mm_btn type="info">信息</mm_btn>
						<mm_btn type="danger">警告</mm_btn>
					</mm_group>
				</mm_view>
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
</style>
