<template>
	<main id="activity_info">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>活动信息</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="活动名称 / 标题 / 描述 / 类型" @blur="search()" />
								</mm_col>
								<mm_col>
									<mm_select v-model="query.prize" title="奖品" :options="$to_kv(item_group, 'item_id')" @change="search()" />
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./info_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name">
										<mm_reverse title="活动名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_type">
										<mm_reverse title="活动形式" v-model="query.orderby" field="type" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_num">
										<mm_reverse title="活动周期" v-model="query.orderby" field="period_num" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_num">
										<mm_reverse title="中奖人数" v-model="query.orderby" field="num_winner" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_time">
										<mm_reverse title="开始时间" v-model="query.orderby" field="time_start" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="time_end">
										<mm_reverse title="结束时间" v-model="query.orderby" field="time_end" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o.activity_id)" @click="select_change(o.activity_id)" /></th>
									<th scope="row">{{ o.activity_id }}</th>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="type">{{ o.type }}</span></td>
									<td><span class="num">{{ o.period_num }}</span> <span>{{ unit_group[o.period_unit] }}/期</span></td>
									<td><span class="num">{{ o.num_winner }}</span> <span>/{{ o.num_people }}</span></td>
									<td><span class="time">{{ $to_time(o.time_start) }}</span></td>
									<td><span class="time">{{ $to_time(o.time_end) }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./info_form?activity_id=' + o.activity_id">修改</mm_btn>
										<mm_btn class="btn_danger" :url="'./user_log?activity_id=' + o.activity_id">查看</mm_btn>
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
						<dt>中奖人数</dt>
						<dd>
							<mm_number v-model="form.num_winner" :num="1" />
						</dd>
						<dt>参与人数</dt>
						<dd>
							<mm_number v-model="form.num_people" :num="1" />
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
				url_get_list: "/apis/activity/info",
				url_del: "/apis/activity/info?method=del&",
				url_set: "/apis/activity/info?method=set&",
				field: "activity_id",
				query_set: {
					activity_id: ''
				},
				unit_group: ['', '日', '周', '月', '年'],
				item_group: [],
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
					// 奖品
					prize: "",
					// 活动ID
					"activity_id": 0,
					// 活动周期数——最小值
					"period_num_min": 0,
					// 活动周期数——最大值
					"period_num_max": 0,
					// 参与人数——最小值
					"num_people_min": 0,
					// 参与人数——最大值
					"num_people_max": 0,
					// 中奖人数——最小值
					"num_winner_min": 0,
					// 中奖人数——最大值
					"num_winner_max": 0,
					// 创建时间——开始时间
					"time_create_min": "",
					// 创建时间——结束时间
					"time_create_max": "",
					// 更新时间——开始时间
					"time_update_min": "",
					// 更新时间——结束时间
					"time_update_max": "",
					// 开始时间——开始时间
					"time_start_min": "",
					// 开始时间——结束时间
					"time_start_max": "",
					// 结束时间——开始时间
					"time_end_min": "",
					// 结束时间——结束时间
					"time_end_max": "",
					// 活动名称
					"name": "",
					// 活动标题
					"title": "",
					// 活动详情
					"content": ""
				},
				form: {
					// 活动周期数
					"period_num": 0,
					// 参与人数
					"num_people": 0,
					// 中奖人数
					"num_winner": 0,
					// 创建时间
					"time_create": "",
					// 更新时间
					"time_update": "",
					// 开始时间
					"time_start": "",
					// 结束时间
					"time_end": "",
					// 活动名称
					"name": "",
					// 活动类型
					"type": "",
					// 活动周期单位
					"period_unit": "",
					// 创建者uin
					"uin_creator": "",
					// 活动标题
					"title": "",
					// 活动描述
					"descrtption": "",
					// 活动详情
					"content": "",
					// 一等奖
					"prize_1": "",
					// 二等奖
					"prize_2": "",
					// 三等奖
					"prize_3": "",
					// 特等奖
					"prize_t": ""
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
			this.$get('~/apis/activity/item?', null, function(json) {
				if (json.result) {
					_this.item_group.clear();
					_this.item_group.addList(json.result.list)
				}
			});
		}
	}
</script>

<style>
	/* 页面 */
	#activity_info {}

	/* 表单 */
	#activity_info .mm_form {}

	/* 筛选栏栏 */
	#activity_info .mm_filter {}

	/* 操作栏 */
	#activity_info .mm_action {}

	/* 模态窗 */
	#activity_info .mm_modal {}

	/* 表格 */
	#activity_info .mm_table {}

	/* 数据统计 */
	#activity_info .mm_data_count {}
</style>
