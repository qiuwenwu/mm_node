<template>
	<!-- 文章 -->
	<mm_page id="page_article">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>文章</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<div class="list_article">
						<mm_article v-for="(o, k) in list" :key="k" :obj="o"></mm_article>
					</div>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					title: "",

				}]
			}
		}
	}
</script>

<style>
</style>
