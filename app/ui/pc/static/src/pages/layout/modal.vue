<template>
	<mm_page class="page_modal">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">模态窗<span>&lt; 返回</span></div>
				</mm_div>

				<div class="h5">点击按钮测试</div>
				<mm_div class="">
					<mm_btn type="info" @click.native="show1 = !show1, show2 = false">带遮罩 {{ show1 }}</mm_btn>
					<mm_btn type="info" @click.native="show2 = !show2, show1 = false">不带遮罩 {{ show2 }}</mm_btn>
				</mm_div>

				<div class="h5">出入场方式 {{ value }}</div>
				<mm_radio v-model="value" :options="options"></mm_radio>
			</mm_warp>
		</mm_body>
		<mm_modal v-model="show1" mask="true" :display="value">
			<mm_div class="b-a bg_white">
				<mm_head class="bg_info">块头</mm_head>
				<mm_body>
					<p>&nbsp;</p>内容主体<p>&nbsp;</p>
				</mm_body>
				<mm_foot class="bg_light">块脚</mm_foot>
			</mm_div>
		</mm_modal>
		<mm_modal v-model="show2" :display="value">
			<mm_div class="ba b-a">
				<mm_head class="bg_info">块头 <span class="fr" @click="show2 = false">×</span></mm_head>
				<mm_body>
					<p>&nbsp;</p>内容主体<p>&nbsp;</p>
				</mm_body>
				<mm_foot class="bg_light">块脚</mm_foot>
			</mm_div>
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
	.page_modal .mm_head {
		padding: 0 1rem;
	}

	.page_modal .mm_foot {
		padding: 0 1rem;
	}

	.page_modal .mm_body {
		padding: 1rem;
	}
</style>
