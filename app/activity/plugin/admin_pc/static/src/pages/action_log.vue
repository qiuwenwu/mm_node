<template>
	<main id="activity_action_log">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>活动操作日志</h5>
					</header>
					<mm_body>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_username">
										<mm_reverse title="UIN" v-model="query.orderby" field="uin" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="方法" v-model="query.orderby" field="func_name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_time">
										<mm_reverse title="操作时间" v-model="query.orderby" field="time_create" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_time">
										<mm_reverse title="修改时间" v-model="query.orderby" field="time_update" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o.action_id)" @click="select_change(o.action_id)" /></th>
									<th scope="row">{{ o.action_id }}</th>
									<td><span class="name">{{ o.uin }}</span></td>
									<td><span class="name">{{ o.func_name }}</span></td>
									<td><span class="time">{{ $to_time(o.time_create) }}</span></td>
									<td><span class="time">{{ $to_time(o.time_update) }}</span></td>
									<td>
										<mm_btn class="btn_warning" @click.native="del_show(o, 'action_id')">删除</mm_btn>
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
				url_get_list: "/apis/activity/action_log",
				url_del: "/apis/activity/action_log?method=del&",
				url_set: "/apis/activity/action_log?method=set&",
				field: "action_id",
				query_set: {
					action_id: ''
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
					// 操作行为ID
					"action_id": 0,
					// 创建时间——开始时间
					"time_create_min": "",
					// 创建时间——结束时间
					"time_create_max": "",
					// 更新时间——开始时间
					"time_update_min": "",
					// 更新时间——结束时间
					"time_update_max": "",
					// 参操函数名
					"func_name": ""
				},
				form: {},
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
	#activity_action_log {}

	/* 表单 */
	#activity_action_log .mm_form {}

	/* 筛选栏栏 */
	#activity_action_log .mm_filter {}

	/* 操作栏 */
	#activity_action_log .mm_action {}

	/* 模态窗 */
	#activity_action_log .mm_modal {}

	/* 表格 */
	#activity_action_log .mm_table {}

	/* 数据统计 */
	#activity_action_log .mm_data_count {}
</style>
