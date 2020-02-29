<template>
	<mm_page id="page_color">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>颜色</span>
							<span class="fr">&lt; 返回</span>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_view>
						<h5>炫彩</h5>
						<mm_list col="5">
							<mm_item><a href="javascript:void(0)" class="wave linear_red-1"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_red-2"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_yellow-1"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_yellow-2"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_green-1"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_green-2"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_blue-1"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_blue-2"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_purple-1"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_purple-2"></a></mm_item>
						</mm_list>
					</mm_view>
					<mm_view>
						<h5>炫彩(无高光)</h5>
						<mm_list col="5">
							<mm_item><a href="javascript:void(0)" class="wave linear_red"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_yellow"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_green"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_blue"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave linear_purple"></a></mm_item>
						</mm_list>
					</mm_view>

					<mm_view>
						<h5>常规</h5>
						<mm_list col="5">
							<mm_item><a href="javascript:void(0)" class="wave bg_red"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave bg_yellow"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave bg_green"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave bg_blue"></a></mm_item>
							<mm_item><a href="javascript:void(0)" class="wave bg_purple"></a></mm_item>
						</mm_list>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
</script>

<style>
	#page_color .mm_item a {
		display: block;
		width: 4rem;
		height: 4rem;
		margin: .5rem auto;
		border-radius: .5rem;
	}
</style>
