<template>
	<main id="activity_user_log">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>活动参与记录</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="姓名 / 手机号 / 省市区" @blur="search()" />
								</mm_col>
								<mm_col width="50">
									<mm_select v-model="query.activity_id" title="活动" :options="$to_kv(activity_group, 'activity_id')" @change="search()" />
								</mm_col>
								<mm_col width="50">
									<mm_select v-model="query.state" title="状态" :options="$to_kv(states)" @change="search()" />
								</mm_col>
								<mm_col width="50">
									<mm_select v-model="query.prize" title="奖品" :options="$to_kv(item_group, 'item_id')" @change="search()" />
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_success-x" v-bind:class="{ 'disabled': !selects }" @click.native="set_prize()">微信通知</mm_btn>
								<mm_btn class="btn_primary-x" v-bind:class="{ 'disabled': !selects }" @click.native="show = true">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name">
										<mm_reverse title="活动名称" v-model="query.orderby" field="activity_id" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_uin">
										<span>参与者uin</span>
									</th>
									<th scope="col" class="th_name">
										<span>姓名</span>
									</th>
									<th scope="col" class="th_time">
										<mm_reverse title="报名时间" v-model="query.orderby" field="time_create" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_title">
										<span>中奖情况</span>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="状态" v-model="query.orderby" field="state" :func="search"></mm_reverse>
									</th>
									<!-- <th scope="col" class="th_handle">操作</th> -->
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o.log_id)" @click="select_change(o.log_id)" /></th>
									<th scope="row">{{ o.log_id }}</th>
									<td><span class="name">{{ get_name(activity_group, o.activity_id, 'activity_id') }}</span></td>
									<td><span class="uin">{{ o.uin_user }}</span></td>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="time">{{ $to_time(o.time_create) }}</span></td>
									<td>
										<p class="title" v-if="o.prize_1">一等奖 > {{ get_name(item_group, o.prize_1, 'item_id') }}</p>
										<p class="title" v-if="o.prize_2">二等奖 > {{ get_name(item_group, o.prize_2, 'item_id') }}</p>
										<p class="title" v-if="o.prize_3">三等奖 > {{ get_name(item_group, o.prize_3, 'item_id') }}</p>
										<p class="title" v-if="o.prize_t">特等奖 > {{ get_name(item_group, o.prize_t, 'item_id') }}</p>
									</td>
									<td><span class="state" v-bind:class="colors[o.state]">{{ states[o.state] }}</span></td>
								<!-- 	<td>
										<mm_btn class="btn_primary" :url="'./user_log_form?log_id=' + o.log_id">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, 'log_id')">删除</mm_btn>
									</td> -->
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
						<dt>一等奖</dt>
						<dd>
							<mm_select v-model="form.prize_1" :options="$to_kv(item_group, 'item_id')" />
						</dd>
						<dt>二等奖</dt>
						<dd>
							<mm_select v-model="form.prize_2" :options="$to_kv(item_group, 'item_id')" />
						</dd>
						<dt>三等奖</dt>
						<dd>
							<mm_select v-model="form.prize_3" :options="$to_kv(item_group, 'item_id')" />
						</dd>
						<dt>特等奖</dt>
						<dd>
							<mm_select v-model="form.prize_t" :options="$to_kv(item_group, 'item_id')" />
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
			
		<mm_modal v-model="show_msg" mask="true">
			<mm_view class="card bg_no">
				<header class="bg_white">
					<h5><span class="font_success">微信通知</span></h5>
				</header>
				<mm_body>
					<dl>
						<dt>中奖名单</dt>
						<dd>
							<p><span class="font_danger">一等奖</span><span v-for="(o, k) in wechat.prize_winner" :key="k" v-if="o.prize_1"> {{ o.name }}</span></p>
							<p><span class="font_success">二等奖</span><span v-for="(o, k) in wechat.prize_winner" :key="k" v-if="o.prize_2"> {{ o.name }}</span></p>
							<p><span class="font_info">三等奖</span><span v-for="(o, k) in wechat.prize_winner" :key="k" v-if="o.prize_3"> {{ o.name }}</span></p>
							<p><span class="font_grey">特等奖</span><span v-for="(o, k) in wechat.prize_winner" :key="k" v-if="o.prize_t"> {{ o.name }}</span></p>
						</dd>
						<dt>通知内容</dt>
						<dd>
							<textarea v-model="wechat.message" placeholder="告诉中奖者已中奖, 或告知中奖者奖品已派送等。变量{prize}代表什么奖, {item}代表奖品" />
						</dd>
					</dl>
				</mm_body>
				<footer>
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show_msg = false">取消</button>
						<button class="btn_success" type="button" @click="send_msg()">发送</button>
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
				url_get_list: "/apis/activity/user_log",
				url_del: "/apis/activity/user_log?method=del&",
				url_set: "/apis/activity/user_log?method=set&",
				field: "log_id",
				query_set: {
					log_id: ''
				},
				wechat: {
					prize_winner: [],
					message: ""
				},
				item_group: [],
				activity_group: [],
				// 微信通知弹窗状态
				show_msg: false,
				// 查询条件
				query: {
					// 排序
					orderby: "",
					// 选中项
					prize: "0",
					// 选中状态
					state: "0",
					// 页码
					page: 1,
					// 页面大小
					size: 10,
					// 关键词
					keyword: "",
					// 活动ID
					activity_id: "0",
					// 奖项
					prize: "0",
					// 参与者记录
					"log_id": 0,
					// 领取状态——最小值
					"state_min": 0,
					// 领取状态——最大值
					"state_max": 0,
					// 更新时间——开始时间
					"time_update_min": "",
					// 更新时间——结束时间
					"time_update_max": "",
					// 创建时间——开始时间
					"time_create_min": "",
					// 创建时间——结束时间
					"time_create_max": ""
				},
				form: {
					// 活动ID
					"activity_id": 0,
					// 领取状态
					"state": 0,
					// 更新时间
					"time_update": "",
					// 创建时间
					"time_create": "",
					// 用户唯一标识
					"uin_user": "",
					// 颁奖者uin
					"uin_prize winners": "",
					// 一等奖
					"prize_1": 0,
					// 二等奖
					"prize_2": 0,
					// 三等奖
					"prize_3": 0,
					// 特等奖
					"prize_t": 0
				},
				// 状态 1待抽奖，2待派送，3已寄出，4已签收，5已领奖
				states: ['', '待抽奖', '待派送', '已寄出', '已签收', '已领奖'],
				colors: ['', 'font_info', 'font_yellow', ' font_success', 'font_default'],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			set_prize(){
				var lt = this.list;
				var s =  '|' + this.selects + '|';
				var w = this.wechat.prize_winner;
				w.clear();
				
				var activity_group = this.activity_group;
				var item_group = this.item_group;
				for(var i = 0; i < lt.length; i++){
					var o = lt[i];
					if(this.select_has(o.log_id)){
						if(o.prize_1){
							var obj = Object.assign({}, o);
							obj.prize = '一等奖';
						 	obj.activity = this.get_name(activity_group, o.activity_id, 'activity_id');
							obj.item_id = activity_group.getVal('prize_1', { activity_id: o.activity_id });
							obj.item = this.get_name(item_group, obj.item_id, 'item_id');
							w.push(obj);
						}
						else if(o.prize_2){
							var obj = Object.assign({}, o);
							obj.prize = '二等奖';
							obj.activity = this.get_name(activity_group, o.activity_id, 'activity_id');
							obj.item_id = activity_group.getVal('prize_2', { activity_id: o.activity_id });
							obj.item = this.get_name(item_group, obj.item_id, 'item_id');
							w.push(obj);
						}
						else if(o.prize_3){
							var obj = Object.assign({}, o);
							obj.prize = '三等奖';
							obj.activity = this.get_name(activity_group, o.activity_id, 'activity_id');
							obj.item_id = activity_group.getVal('prize_3', { activity_id: o.activity_id });
							obj.item = this.get_name(item_group, obj.item_id, 'item_id');
							w.push(obj);
						}
						else if(o.prize_t){
							var obj = Object.assign({}, o);
							obj.prize = '特等奖';
							obj.activity = this.get_name(activity_group, o.activity_id, 'activity_id');
							obj.item_id = activity_group.getVal('prize_t', { activity_id: o.activity_id });
							obj.item = this.get_name(item_group, obj.item_id, 'item_id');
							w.push(obj);
						}
					}
				}
				this.show_msg = true;
			},
			/**
			 * @description 获取到列表事件
			 * @param {Object} res 响应结果
			 */
			get_list_after(res) {
				this.page_now = this.query.page;
				var arr = this.list.toArr('uin_user', '|');
				var query = {
					uin_user: arr.join('|').replace('|', '')
				};
				var _this = this;
				this.$get('~/apis/activity/user_info?', query, function(json) {
					if (json.result) {
						var arr = json.result.list;
						var list = _this.list;
						for(var i = 0; i < arr.length; i++){
							var o = arr[i];
							var oj = list.getObj({ uin_user: o.uin_user });
							if(oj){
								oj.name = o.name;
							}
						}
					}
				});
			},
			/**
			 * 发送微信消息
			 */
			send_msg() {
				var _this = this;
				this.$post('~/api/wechat/send_msg', this.wechat, function(json){
					// if (json.result) {
					// 	_this.$post(_this.url_set, { state: 2 }, function(json){
					// 		_this.search();
					// 	})
					// }
				});
			}
		},
		created() {
			var _this = this;
			this.$get('~/apis/activity/item?', null, function(json) {
				if (json.result) {
					_this.item_group.clear();
					_this.item_group.addList(json.result.list)
				}
			});
			this.$get('~/apis/activity/info?', null, function(json) {
				if (json.result) {
					_this.activity_group.clear();
					_this.activity_group.addList(json.result.list)
				}
			});
		}
	}
</script>

<style>
	/* 页面 */
	#activity_user_log {}

	/* 表单 */
	#activity_user_log .mm_form {}

	/* 筛选栏栏 */
	#activity_user_log .mm_filter {}

	/* 操作栏 */
	#activity_user_log .mm_action {}

	/* 模态窗 */
	#activity_user_log .mm_modal {}

	/* 表格 */
	#activity_user_log .mm_table {}

	/* 数据统计 */
	#activity_user_log .mm_data_count {}
</style>
