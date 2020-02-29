<template>
	<mm_page id="page_root">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view>
						<h3>
							<span>MM-UI组件示例</span>
							<router-link to="/design"><span>点击查看</span> <span class="font_info">设计规范</span> <span>&gt;</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid col="3" class="center grid_min-1">
				<mm_col width="100">
					<div>基础组件</div>
				</mm_col>
				<mm_col>
					<mm_view>
						<h4>内容容器</h4>
						<mm_list col="1">
							<mm_item class="arrow" v-for="(o, idx) in content" :key="idx" :url="o.url"><span>{{ o.title }}</span> <span>{{ o.name }}</span></mm_item>
						</mm_list>
					</mm_view>
				</mm_col>
				<mm_col>
					<mm_view>
						<h4>布局容器</h4>
						<mm_list col="1">
							<mm_item class="arrow" v-for="(o, idx) in layout" :key="idx" :url="o.url"><span>{{ o.title }}</span> <span>{{ o.name }}</span></mm_item>
						</mm_list>
					</mm_view>
				</mm_col>
				<mm_col>
					<mm_view>
						<h4>表单组件</h4>
						<mm_list col="1">
							<mm_item class="arrow" v-for="(o, idx) in form" :key="idx" :url="o.url"><span>{{ o.title }}</span> <span>{{ o.name }}</span></mm_item>
						</mm_list>
					</mm_view>
				</mm_col>
			</mm_grid>
			<mm_grid col="3" class="center grid_min-1">
				<mm_col width="100">
					<div class="mt">复合组件</div>
				</mm_col>
				<mm_col>
					<mm_view>
						<h4>栏</h4>
						<mm_list col="1">
							<mm_item class="arrow" v-for="(o, idx) in bar" :key="idx" :url="o.url"><span>{{ o.title }}</span> <span>{{ o.name }}</span></mm_item>
						</mm_list>
					</mm_view>
				</mm_col>
				<mm_col>
					<mm_view>
						<h4>列表</h4>
						<mm_list col="1">
							<mm_item class="arrow" v-for="(o, idx) in list" :key="idx" :url="o.url"><span>{{ o.title }}</span> <span>{{ o.name }}</span></mm_item>
						</mm_list>
					</mm_view>
				</mm_col>
				<mm_col>
					<mm_view>
						<h4>轮播</h4>
						<mm_list col="1">
							<mm_item class="arrow" v-for="(o, idx) in swiper" :key="idx" :url="o.url"><span>{{ o.title }}</span> <span>{{ o.name }}</span></mm_item>
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
				content: [{
						title: "按钮",
						name: "mm_btn",
						url: "/content/btn"
					},
					{
						title: "图标",
						name: "mm_icon",
						url: "/content/icon"
					},
					{
						title: "加载",
						name: "mm_loading",
						url: "/content/loading"
					},
					{
						title: "源代码",
						name: "mm_pre",
						url: "/content/pre"
					},
					{
						title: "颜色",
						name: "mm_color",
						url: "/content/color"
					}
				],
				layout: [{
						title: "栅格",
						name: "mm_grid",
						url: "/layout/grid"
					},
					{
						title: "列表",
						name: "mm_list",
						url: "/layout/list"
					},
					{
						title: "表格",
						name: "mm_table",
						url: "/layout/table"
					},
					{
						title: "组合框",
						name: "mm_group",
						url: "/layout/group"
					},
					{
						title: "块",
						name: "mm_view",
						url: "/layout/div"
					},
					{
						title: "模态窗",
						name: "mm_modal",
						url: "/layout/modal"
					}
				],
				form: [{
						title: "复选框",
						name: "mm_checkbox",
						url: "/form/checkbox"
					},
					{
						title: "单选框",
						name: "mm_radio",
						url: "/form/radio"
					},
					{
						title: "输入框",
						name: "mm_input",
						url: "/form/input"
					},
					{
						title: "计数器",
						name: "mm_number",
						url: "/form/number"
					},
					{
						title: "选择框",
						name: "mm_select",
						url: "/form/select"
					},
					{
						title: "开关",
						name: "mm_switch",
						url: "/form/switch"
					},
					{
						title: "反转器",
						name: "mm_reverse",
						url: "/form/reverse"
					},
					{
						title: "分页器",
						name: "mm_pager",
						url: "/form/pager"
					}
				],
				expand: [{
						title: "导航",
						name: "mm_nav",
						url: "/expand/nav"
					},
					{
						title: "选项卡",
						name: "mm_tab",
						url: "/expand/tab"
					},
					{
						title: "折叠项",
						name: "mm_folding",
						url: "/expand/folding"
					}
				],
				bar: [{
						title: "标题栏",
						name: "mm_title",
						url: "/bar/title"
					},
					{
						title: "搜索栏",
						name: "mm_search",
						url: "/bar/search"
					},
					{
						title: "筛选栏",
						name: "mm_filter",
						url: "/bar/filter"
					},
					{
						title: "标签栏",
						name: "mm_tag",
						url: "/bar/tag"
					},
					{
						title: "排序栏",
						name: "mm_sort",
						url: "/bar/sort"
					},
					{
						title: "统计栏",
						name: "mm_count",
						url: "/bar/count"
					},
					{
						title: "购买栏",
						name: "mm_buy",
						url: "/bar/buy"
					},
					{
						title: "操作栏",
						name: "mm_action",
						url: "/bar/action"
					},
					{
						title: "聊天栏",
						name: "mm_chat",
						url: "/bar/chat"
					}
				],
				list: [{
						title: "图片列表",
						name: "mm_img",
						url: "/list/img"
					},
					{
						title: "文章列表",
						name: "mm_article",
						url: "/list/article"
					},
					{
						title: "通讯录列表",
						name: "mm_contact",
						url: "/list/contact"
					},
					{
						title: "消息列表",
						name: "mm_message",
						url: "/list/message"
					},
					{
						title: "新闻列表",
						name: "mm_news",
						url: "/list/news"
					},
					{
						title: "号码列表",
						name: "mm_number",
						url: "/list/number"
					},
					{
						title: "商品列表",
						name: "mm_goods",
						url: "/list/goods"
					},
					{
						title: "问答列表",
						name: "mm_question",
						url: "/list/question"
					},
					{
						title: "用户列表",
						name: "mm_user",
						url: "/list/user"
					},
					{
						title: "视频列表",
						name: "mm_video",
						url: "/list/video"
					},
					{
						title: "音乐列表",
						name: "mm_music",
						url: "/list/music"
					}
				],
				swiper: [{
						title: "卡片轮播",
						name: "mm_slide_card",
						url: "/slide/card"
					},
					{
						title: "图片轮播",
						name: "mm_slide_img",
						url: "/slide/img"
					},
					{
						title: "文本轮播",
						name: "mm_slide_text",
						url: "/slide/text"
					},
					{
						title: "页面轮播",
						name: "mm_slide_page",
						url: "/slide/page"
					},
					{
						title: "菜单轮播",
						name: "mm_slide_menu",
						url: "/slide/menu"
					}
				]
			}
		}
	}
</script>

<style>
	

	#page_root h3 a {
		font-size: 1rem;
		float: right;
		padding-top: .5rem;
		color: #999;
	}

	#page_root h3 .font_info {
		font-weight: 600;
	}

	#page_root h4 {
		margin: auto;
		padding-bottom: 1rem;
	}

	#page_root .mm_item {
		color: #333;
		text-align: left;
		padding: 0.5rem 1.5rem;
		border: 1px solid #DBDBDB;
		margin-top: -1px;
		}
	#page_root .mm_item span:last-child {
		color: #999;
		float: right;
	}

	#page_root .mm_item:hover {
		background: #f9f9f9;
	}

	
</style>
