<template>
	<main id="activity_info_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<header class="arrow">
						<h5>{{ query.activity_id ? '修改' : '创建' }}活动</h5>
					</header>
					<dl>
						<dt>活动名称</dt>
						<dd>
							<mm_input type="text" v-model="form.name" placeholder="用于前端搜索是什么活动" />
						</dd>
						<dt>活动标题</dt>
						<dd>
							<mm_input type="text" v-model="form.title" placeholder="用于前端页面显示是什么活动" />
						</dd>
						<dt>活动简介</dt>
						<dd>
							<textarea v-model="form.descrtption"  placeholder="用于前端介绍活动" />
						</dd>
						<dt>活动形式</dt>
						<dd>
							<mm_input type="text" v-model="form.type" desc="抽奖 / 竞猜 / 转发" />
						</dd>
						<dt>开始时间</dt>
						<dd>
							<mm_input type="datetime" v-model="form.time_start" desc="格式为 2019-12-31 16:00:00" />
						</dd>
						<dt>结束时间</dt>
						<dd>
							<mm_input type="datetime" v-model="form.time_end" desc="格式为 2019-12-31 16:00:00" />
						</dd>
						<dt>活动周期</dt>
						<dd>
							<input type="number" style="width:5rem;text-align: center;margin-top: -3px;position: relative; top: -1px; " v-model="form.period_num" /> <mm_select v-model="form.period_unit" :options="$to_kv(['', '日', '周', '月','年'])" /><span> /期</span>
						</dd>
						<dt>中奖人数</dt>
						<dd>
							<mm_number v-model="form.num_winner" :num="1" />
						</dd>
						<dt>参与人数</dt>
						<dd>
							<mm_number v-model="form.num_people" :num="100" />
						</dd>
						<dt>一等奖</dt>
						<dd>
							<select v-model="form.prize_1">
								<option :value="'0'"></option>
								<option v-for="(o, k) in item_group" :key="k" :value="o.item_id">{{ o.name }}</option>
							</select>
						</dd>
						<dt>二等奖</dt>
						<dd>
							<select v-model="form.prize_2">
								<option :value="'0'"></option>
								<option v-for="(o, k) in item_group" :key="k" :value="o.item_id">{{ o.name }}</option>
							</select>
						</dd>
						<dt>三等奖</dt>
						<dd>
							<select v-model="form.prize_3">
								<option :value="'0'"></option>
								<option v-for="(o, k) in item_group" :key="k" :value="o.item_id">{{ o.name }}</option>
							</select>
						</dd>
						<dt>特等奖</dt>
						<dd>
							<select v-model="form.prize_t">
								<option :value="'0'"></option>
								<option v-for="(o, k) in item_group" :key="k" :value="o.item_id">{{ o.name }}</option>
							</select>
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
	import mixin from '/src/mixins/page.js';
	
	export default {
		mixins: [mixin],
		data() {
			return {
				url_submit: "/apis/activity/info?",
				url_get_obj: "/apis/activity/info?",
				field: "activity_id",
				query: {
					activity_id: 0
				},
				item_group: [],
				form: {
					activity_id: 0,
					// 活动周期数
					"period_num":0,
					// 参与人数
					"num_people":100000,
					// 中奖人数
					"num_winner":10,
					// 开始时间
					"time_start": "2020-01-01 00:00:00",
					// 结束时间
					"time_end": "2020-01-01 00:00:00",
					// 活动名称
					"name":"",
					// 活动类型
					"type":"",
					// 活动周期单位
					"period_unit":"day",
					// 创建者uin
					"uin_creator":"",
					// 活动标题
					"title":"",
					// 活动描述
					"descrtption":"",
					// 活动详情
					"content":"",
					// 一等奖
					"prize_1":"",
					// 二等奖
					"prize_2":"",
					// 三等奖
					"prize_3":"",
					// 特等奖
					"prize_t":""
				}
			};
		},
		methods: {
			
		},
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
	#activity_info_form {}

	/* 表单 */
	#activity_info_form .mm_form {}
	
	/* 筛选栏栏 */
	#activity_info_form .mm_filter {}

	/* 操作栏 */
	#activity_info_form .mm_action {}

	/* 模态窗 */
	#activity_info_form .mm_modal {}

	/* 表格 */
	#activity_info_form .mm_table {}

	/* 数据统计 */
	#activity_info_form .mm_data_count {}
</style>
