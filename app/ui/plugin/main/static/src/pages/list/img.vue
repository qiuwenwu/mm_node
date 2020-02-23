<template>
	<!-- 图片 -->
	<mm_page id="page_img">
		<header>
			<mm_grid>
				<mm_col width="100">
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
				<mm_col width="100">
					<mm_view>
						<button class="btn_info" @click="border = !border"><span v-if="border">无</span><span v-else>加</span>边框</button>
					</mm_view>
				</mm_col>
				<mm_col width="100">
					<mm_view>
						<h5>样式一</h5>
						<mm_list col="4" id="list_img_1" v-bind:class="{'icon-x': border}">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>

					<mm_view>
						<h5>样式二</h5>
						<mm_list col="4" id="list_img_2" v-bind:class="{'icon-x': border}">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>
						
					<mm_view>
						<h5>样式三</h5>
						<mm_list col="2" id="list_img_2" class="div-ltb" v-bind:class="{'icon-x': border}">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>
						
					<mm_view>
						<h5>样式四</h5>
						<mm_list col="2" id="list_img_2" class="div-rtb" v-bind:class="{'icon-x': border}">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>
					
					<mm_view>
						<h5>样式五</h5>
						<mm_list col="2" id="list_img_2" class="div-ll" v-bind:class="{'icon-x': border}">
							<mm_item v-for="(o, k) in list" :key="k" :url="o.url">
								<mm_img :obj="o"></mm_img>
							</mm_item>
						</mm_list>
					</mm_view>
						
					<mm_view>
						<h5>样式五</h5>
						<mm_list col="2" id="list_img_2" class="div-rr" v-bind:class="{'icon-x': border}">
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
				border: false,
				list: [{
						title: "测试1",
						image: "/img/default.png",
						description: "这是一个图片的描述，为了方便演示排版而写",
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
						title: "测试4",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试5",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试6",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试7",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试8",
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
