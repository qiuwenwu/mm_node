<template>
	<main id="activity_item_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ form.user_id ? '修改' : '创建' }}奖品</h5>
					</header>
					<dl>
						<dt>物品图片</dt>
						<dd>
							<mm_upload_img width="10rem" height="10rem" name="img" type="text" v-model="form.img_cover"></mm_upload_img>
						</dd>
						<dt>类型</dt>
						<dd>
							<input type="text" v-model="form.type" placeholder="用于分类搜索" />
						</dd>
						<dt>名称</dt>
						<dd>
							<input type="text" v-model="form.name" placeholder="用于搜索是什么物品" />
						</dd>
						<dt>标题</dt>
						<dd>
							<input type="text" v-model="form.title" placeholder="前端显示的物品标题" />
						</dd>
						<dt>描述</dt>
						<dd>
							<textarea v-model="form.descrtption" placeholder="介绍该物品是什么, 有什么用" />
						</dd>
						<dt>价值</dt>
						<dd>
							<mm_number v-model="form.price" :num="1" />
						</dd>
						<dt>剩余数量</dt>
						<dd>
							<mm_number v-model="form.num" :num="1" />
						</dd>
					</dl>
					<footer>
						<div class="mm_group">
							<button class="btn_default" type="button" @click="cancel">取消</button>
							<button class="btn_primary" type="button" @click="submit()">提交</button>
						</div>
					</footer>
				</mm_form>
			</mm_col>
		</mm_grid>
	</main>
</template>


<script>
	import mm_upload_img from '/src/components/form/mm_upload_img.vue';
		
	import mixin from '/src/mixins/page.js';
	
	export default {
		mixins: [mixin],
		components: {
			mm_upload_img
		},
		data() {
			return {
				url_submit: "/apis/activity/item?",
				url_get_obj: "/apis/activity/item",
				field: "item_id",
				query: {
					item_id: 0
				},
				form: {
					// 物品ID
					item_id: 0,
					// 物品价值
					"price":0,
					// 物品剩余数量
					"num": 0,
					// 物品名称
					"name":"",
					// 物品类型
					"type":"",
					// 创建者uin
					"creator_uin":"",
					// 物品标题
					"title":"",
					// 物品描述
					"descrtption":"",
					// 封面图
					"img_cover":""
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 页面 */
	#activity_item_form {}

	/* 表单 */
	#activity_item_form .mm_form {}
	
	/* 筛选栏栏 */
	#activity_item_form .mm_filter {}

	/* 操作栏 */
	#activity_item_form .mm_action {}

	/* 模态窗 */
	#activity_item_form .mm_modal {}

	/* 表格 */
	#activity_item_form .mm_table {}

	/* 数据统计 */
	#activity_item_form .mm_data_count {}
</style>
