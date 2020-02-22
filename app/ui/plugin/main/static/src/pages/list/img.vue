<template>
	<!-- 图片 -->
	<mm_page id="page_img">
		<header>
			<mm_grid>
				<mm_col>
					<mm_view url="/">
						<h3>
							<span>图片</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col>
					<mm_view>
						<h5>样式一</h5>
						<mm_list col="4" id="list_img">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>

					<mm_view>
						<h5>样式一</h5>
						<mm_list col="4" id="list_img2">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>
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
						title: "测试1",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试2",
						image: "/img/default.png",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/"
					},
					{
						title: "测试3",
						image: "/img/default.png",
						tip: "12集全",
						tag: "独播",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/"
					},
					{
						title: "测试1",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试2",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试3",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试1",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试2",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试3",
						image: "/img/default.png",
						url: "/"
					}
				]
			}
		}
	}
</script>

<style>
	#page_img #list_img2 .mm_img {
		border: none;
		box-shadow: none;
	}

	#page_img #list_img2 .title {
		text-align: left;
		margin-left: 0;
	}

	#page_img #list_img2 .tip {
		position: absolute;
		bottom: 2.5rem;
		right: 0;
		text-align: right;
		color: #fff;
	}
</style>
