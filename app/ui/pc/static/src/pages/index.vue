<template>
	<mm_page class="page_root">
		<mm_body>
			<mm_warp>
				<mm_div url="http://ui.elins.cn">
					<div class="h3">MM-UI组件示例</div>
				</mm_div>
				<mm_grid class="center">
					<mm_col>
						<mm_div>
							<div class="h4">内容容器</div>
							<mm_list col="1">
								<mm_item class="arrow" v-for="(o, idx) in list_content" :key="idx" :url="o.url">{{ o.title }} <span>{{ o.name }}</span></mm_item>
							</mm_list>
						</mm_div>
					</mm_col>
					<mm_col>
						<mm_div>
							<div class="h4">布局容器</div>
							<mm_list col="1">
								<mm_item class="arrow" v-for="(o, idx) in list_layout" :key="idx" :url="o.url">{{ o.title }} <span>{{ o.name }}</span></mm_item>
							</mm_list>
						</mm_div>
					</mm_col>
					<mm_col>
						<mm_div>
							<div class="h4">表单组件</div>
							<mm_list col="1">
								<mm_item class="arrow" v-for="(o, idx) in list_form" :key="idx" :url="o.url">{{ o.title }} <span>{{ o.name }}</span></mm_item>
							</mm_list>
						</mm_div>
					</mm_col>
				</mm_grid>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				list_content: [{
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
					}
				],
				list_layout: [{
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
						name: "mm_div",
						url: "/layout/div"
					},
					{
						title: "模态窗",
						name: "mm_modal",
						url: "/layout/modal"
					}
				],
				list_form: [{
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
						title: "滑块",
						name: "mm_slider",
						url: "/form/slider"
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
				]
			}
		}
	}
</script>

<style>
	.page_root .h3 {
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid #dbdbdb;
	}

	.page_root .h4 {
		margin: auto;
		padding-bottom: 1rem;
	}

	.page_root .mm_item {
		color: #333;
		text-align: left;
		padding: 0.5rem 1.5rem;
		border: 1px solid #dbdbdb;
		margin-top: -1px;
	}

	.page_root .mm_item span {
		color: #999;
		float: right;
	}

	.page_root .mm_item:hover {
		background: #f9f9f9;
	}

	.page_root .mm_col>.mm_div {
		margin: 1rem 2rem;
	}
</style>
