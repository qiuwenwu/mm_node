<template>
	<mm_page id="page_chat">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>聊天输入栏</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<div class="h3">文章<span>&lt; 返回</span></div>
					</mm_view>

					<mm_view :func="func"></mm_view>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			func(name, param1, param2) {

			}
		}
	}
</script>

<style>
</style>
