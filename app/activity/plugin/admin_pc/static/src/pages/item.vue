<template>
	<main id="activity_item">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>活动奖品</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="物品名称 / 类型 / 标题 / 描述" @blur="search()" />
								</mm_col>
								<!-- <mm_col width="25">
									<mm_input v-model="query.price_min"></mm_input>
								</mm_col> -->
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./item_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name">
										<mm_reverse title="物品名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_type">
										<mm_reverse title="类型" v-model="query.orderby" field="type" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_title">
										<mm_reverse title="标题" v-model="query.orderby" field="title" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_num">
										<mm_reverse title="剩余数量" v-model="query.orderby" field="num" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o.item_id)" @click="select_change(o.item_id)" /></th>
									<th scope="row">{{ o.item_id }}</th>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="type">{{ o.type }}</span></td>
									<td><span class="title">{{ o.title }}</span></td>
									<td><span class="num">{{ o.num }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./item_form?item_id=' + o.item_id">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, 'item_id')">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid col="4" class="mm_data_count">
							<mm_col>
								<mm_select v-model="query.size" :options="$to_size()" @change="search()" />
							</mm_col>
							<mm_col width="50">
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</mm_col>
							<mm_col>
								<div class="right plr">
									<span class="fl">共 {{ count }} 条</span>
									<span>当前</span>
									<input class="pager_now" v-model.number="page_now" @blur="goTo(page_now)"
									 @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
							</mm_col>
						</mm_grid>
					</footer>
				</mm_view>
			</mm_col>
		</mm_grid>
		<mm_modal v-model="show" mask="true">
			<mm_view class="card bg_no">
				<header class="bg_white">
					<h5>批量修改</h5>
				</header>
				<mm_body>
					<dl>
						<dt>昵称</dt>
						<dd>
							<label>
								<input type="text" v-model="form.nickname" placeholder="由2-16个字符组成" />
							</label>
						</dd>
						<dt>状态</dt>
						<dd>
							<mm_select v-model="form.state" :options="$to_kv(states)" />
						</dd>
					</dl>
				</mm_body>
				<footer>
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show = false">取消</button>
						<button class="btn_primary" type="button" @click="batchSet()">提交</button>
					</div>
				</footer>
			</mm_view>
		</mm_modal>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "/apis/activity/item",
				url_del: "/apis/activity/item?method=del&",
				url_set: "/apis/activity/item?method=set&",
				field: "item_id",
				query_set: {
					item_id: ''
				},
				user_group: [],
				// 查询条件
				query: {
					// 排序
					orderby: "",
					// 页码
					page: 1,
					// 页面大小
					size: 10,
					// 关键词
					keyword: "",
					// 物品ID
					"item_id": 0,
					// 物品价值——最小值
					"price_min": 0,
					// 物品价值——最大值
					"price_max": 0,
					// 创建时间——开始时间
					"time_create_min": "",
					// 创建时间——结束时间
					"time_create_max": "",
					// 更新时间——开始时间
					"time_update_min": "",
					// 更新时间——结束时间
					"time_update_max": "",
					// 物品剩余数量——最小值
					"num_min": 0,
					// 物品剩余数量——最大值
					"num_max": 0,
					// 物品名称
					"name": "",
					// 物品标题
					"title": ""
				},
				form: {
					// 物品价值
					"price": 0,
					// 创建时间
					"time_create": "",
					// 更新时间
					"time_update": "",
					// 物品剩余数量
					"num": 0,
					// 物品名称
					"name": "",
					// 物品类型
					"type": "",
					// 创建者uin
					"creator_uin": "",
					// 物品标题
					"title": "",
					// 物品描述
					"descrtption": "",
					// 封面图
					"img_cover": ""
				},
				// 状态
				states: ['', '正常', '异常', '已冻结', '已注销'],
				colors: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
				// 视图模型
				vm: {}
			}
		},
		methods: {},
		created() {
			var _this = this;
			this.$get('~/apis/user/group?', null, function(json) {
				if (json.result) {
					_this.user_group.clear();
					_this.user_group.addList(json.result.list)
				}
			});
		}
	}
</script>

<style>
	/* 页面 */
	#activity_item {}

	/* 表单 */
	#activity_item .mm_form {}

	/* 筛选栏栏 */
	#activity_item .mm_filter {}

	/* 操作栏 */
	#activity_item .mm_action {}

	/* 模态窗 */
	#activity_item .mm_modal {}

	/* 表格 */
	#activity_item .mm_table {}

	/* 数据统计 */
	#activity_item .mm_data_count {}
</style>
