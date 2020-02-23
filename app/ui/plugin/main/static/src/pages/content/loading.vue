<template>
	<mm_page id="page_loading">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>加载</span>
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
						<h5>样式一</h5>
						<mm_loading></mm_loading>
					</mm_view>

					
					<mm_view>
						<h5>样式二</h5>
						<mm_loading class="loading"></mm_loading>
					</mm_view>

					
					<mm_view>
						<h5>样式三</h5>
						<mm_loading><i class="fa fa-user"></i></mm_loading>
					</mm_view>

					
					<mm_view>
						<h5>样式四</h5>
						<mm_loading><img src="/img/logo_round.png" style="width: 2rem;"></mm_loading>
					</mm_view>

					
					<mm_view>
						<h5>样式五</h5>
						<mm_loading display="2"></mm_loading>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
</script>

<style>
	#page_loading .loading {
		text-align: left;
	}

	#page_loading .loading .state {
		line-height: 1.75;
	}

	#page_loading .loading .load {
		float: left;
	}
</style>
