<template>
	<mm_page id="page_btn">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>按钮</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_view>
						<h5>按钮颜色——带背景</h5>
						<mm_btn type="default">默认</mm_btn>
						<mm_btn type="primary">主要</mm_btn>
						<mm_btn type="info">信息</mm_btn>
						<mm_btn type="success">成功</mm_btn>
						<mm_btn type="warning">错误</mm_btn>
						<mm_btn type="danger">警告</mm_btn>
					</mm_view>

					<mm_view>
						<h5>按钮——不带背景</h5>
						<mm_btn type="default-x">默认</mm_btn>
						<mm_btn type="primary-x">主要</mm_btn>
						<mm_btn type="info-x">信息</mm_btn>
						<mm_btn type="success-x">成功</mm_btn>
						<mm_btn type="warning-x">错误</mm_btn>
						<mm_btn type="danger-x">警告</mm_btn>
					</mm_view>

					<mm_view>
						<h5>全屏宽按钮</h5>
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

					<mm_view class="btn-3">
						<h5>全屏宽按钮圆角</h5>
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
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
</script>

<style>
	#page_btn .h3 {
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid #dbdbdb;
	}

	#page_btn .h3 span {
		float: right;
		color: #999;
		font-size: 1rem;
		padding-top: 0.75rem;
	}
</style>
