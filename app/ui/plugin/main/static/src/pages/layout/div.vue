<template>
	<mm_page id="page_div">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>块</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_grid class="center">
						<mm_col width="100">
							<h5>默认块</h5>
							<mm_view class="ba">
								<header>块头</header>
								<mm_body>
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</mm_body>
								<footer>块脚</footer>
							</mm_view>
							
							<mm_view class="card bn">
								<header>块头</header>
								<mm_body>
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</mm_body>
								<footer>块脚</footer>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<h5>带圆角块</h5>
							<mm_view class="ba b-a">
								<header>块头</header>
								<mm_body>
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</mm_body>
								<footer>块脚</footer>
							</mm_view>
							<mm_view class="card">
								<header>块头</header>
								<mm_body>
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</mm_body>
								<footer>块脚</footer>
							</mm_view>
						</mm_col>
					</mm_grid>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
</script>

<style>
	#page_div header, #page_div footer{
		background: #FDFDFD;
	}
</style>
