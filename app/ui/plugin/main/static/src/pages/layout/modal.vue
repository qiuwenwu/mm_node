<template>
	<mm_page id="page_modal">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>模态窗</span>
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
						<h5>点击按钮测试</h5>
						<mm_btn class="btn_info" @click.native="show1 = !show1, show2 = false">带遮罩 {{ show1 }}</mm_btn>
						<mm_btn class="btn_info" @click.native="show2 = !show2, show1 = false">不带遮罩 {{ show2 }}</mm_btn>
					</mm_view>

					<mm_view>
						<h5>出入场方式 {{ value }}</h5>
						<mm_radio v-model="value" :options="options"></mm_radio>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
		<mm_modal v-model="show1" mask="true" :display="value">
			<mm_view class="card">
				<header>块头</header>
				<mm_body>
					<p>&nbsp;</p>内容主体<p>&nbsp;</p>
				</mm_body>
				<mm_foot>块脚</mm_foot>
			</mm_view>
		</mm_modal>
		<mm_modal v-model="show2" :display="value">
			<mm_view class="card">
				<header>块头 <span class="fr" @click="show2 = false">×</span></header>
				<mm_body>
					<p>&nbsp;</p>内容主体<p>&nbsp;</p>
				</mm_body>
				<mm_foot>块脚</mm_foot>
			</mm_view>
		</mm_modal>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				value: "default",
				options: [{
					name: "默认",
					value: "default"
				}, {
					name: "中间",
					value: "center"
				}, {
					name: "左边",
					value: "left"
				}, {
					name: "右边",
					value: "right"
				}, {
					name: "上边",
					value: "top"
				}, {
					name: "下边",
					value: "bottom"
				}]
			}
		}
	}
</script>

<style>
	#page_modal .mm_head {
		padding: 0.5rem 1rem;
	}

	#page_modal .mm_foot {
		padding: 0.5rem 1rem;
	}

	#page_modal .main {
		padding: 1rem;
	}
</style>
