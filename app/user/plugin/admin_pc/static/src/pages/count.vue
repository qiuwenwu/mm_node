<template>
	<main id="user_group">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow"><h5>用户统计</h5></header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col><mm_input v-model="query.keyword" title="关键词" desc="用户名 / 昵称" @blur="search()" /></mm_col>
								<mm_col><mm_select v-model="select.type" title="类型" :options="$to_kv(list_type, 'value')" @change="reset_type()" /></mm_col>
								<mm_col></mm_col>
								<mm_col>
									<mm_input type="number" v-model="select.min" title="范围" @blur="range()"></mm_input>
									<div>—</div>
									<mm_input type="number" v-model="select.max" @blur="range()"></mm_input>
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class=""><mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ disabled: !selects }">批量修改</mm_btn></div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name"><span>用户名</span></th>
									<th scope="col" class="th_name"><span>昵称</span></th>
									<th scope="col" class="th_level"><mm_reverse title="等级" v-model="query.orderby" field="level" :func="search"></mm_reverse></th>
									<th scope="col" class="th_iq"><mm_reverse title="IQ智商" v-model="query.orderby" field="iq" :func="search"></mm_reverse></th>
									<th scope="col" class="th_credit"><mm_reverse title="信用度" v-model="query.orderby" field="credit" :func="search"></mm_reverse></th>
									<th scope="col" class="th_credit_points">
										<mm_reverse title="积分" v-model="query.orderby" field="credit_points" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_exp"><mm_reverse title="经验值" v-model="query.orderby" field="exp" :func="search"></mm_reverse></th>
									<th scope="col" class="th_money"><mm_reverse title="钱" v-model="query.orderby" field="money" :func="search"></mm_reverse></th>
									<th scope="col" class="th_coin"><mm_reverse title="货币" v-model="query.orderby" field="coin" :func="search"></mm_reverse></th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row">{{ o[field] }}</th>
									<td>
										<span class="name">{{ o.username }}</span>
									</td>
									<td>
										<span class="name">{{ o.nickname }}</span>
									</td>
									<td>
										<span class="level">{{ o.level }}</span>
									</td>
									<td>
										<span class="iq">{{ o.iq }}</span>
									</td>
									<td>
										<span class="credit">{{ o.credit }}</span>
									</td>
									<td>
										<span class="credit_points">{{ o.credit_points }}</span>
									</td>
									<td>
										<span class="exp">{{ o.exp }}</span>
									</td>
									<td>
										<span class="money">{{ o.money }}</span>
									</td>
									<td>
										<span class="coin">{{ o.coin }}</span>
									</td>
									<td>
										<mm_btn class="btn_primary" :url="'./count_form?user_id=' + o[field]">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid col="4" class="mm_data_count">
							<mm_col><mm_select v-model="query.size" :options="$to_size()" @change="search()" /></mm_col>
							<mm_col width="50">
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</mm_col>
							<mm_col>
								<div class="right plr">
									<span class="fl">共 {{ count }} 条</span>
									<span>当前</span>
									<input class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
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
				<header class="bg_white"><h5>批量修改</h5></header>
				<mm_body>
					<dl>
						<dt>等级</dt>
						<dd><mm_number v-model="form.level" :min="0" :max="1000"></mm_number></dd>
						<dt>IQ智商</dt>
						<dd><mm_number v-model="form.iq" :min="80" :max="200"></mm_number></dd>
						<dt>信用度</dt>
						<dd><mm_number v-model="form.credit" :min="0" :max="2147483647"></mm_number></dd>
						<dt>积分</dt>
						<dd><mm_number v-model="form.credit_points" :min="0" :max="2147483647"></mm_number></dd>
						<dt>经验值</dt>
						<dd><mm_number v-model="form.exp" :min="0" :max="2147483647"></mm_number></dd>
						<dt>钱</dt>
						<dd><mm_number v-model="form.money"></mm_number></dd>
						<dt>货币</dt>
						<dd><mm_number v-model="form.coin"></mm_number></dd>
					</dl>
				</mm_body>
				<footer>
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show = false">取消</button>
						<button class="btn_primary" type="button" @click="set_bath()">提交</button>
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
			url_get_list: '/apis/user/count',
			url_del: '/apis/user/count?method=del&',
			url_set: '/apis/user/count?method=set&',
			field: 'user_id',
			query_set: {
				user_id: ''
			},
			user_group: [],
			// 查询条件
			query: {
				// 排序
				orderby: '',
				// 页码
				page: 1,
				// 页面大小
				size: 10,
				// 关键词
				keyword: '',
				// 用户ID
				user_id: 0,
				// 等级——最小值
				level_min: 0,
				// 等级——最大值
				level_max: 0,
				// IQ智商——最小值
				iq_min: 0,
				// IQ智商——最大值
				iq_max: 0,
				// 信用度——最小值
				credit_min: 0,
				// 信用度——最大值
				credit_max: 0,
				// 积分——最小值
				credit_points_min: 0,
				// 积分——最大值
				credit_points_max: 0,
				// 经验值——最小值
				exp_min: 0,
				// 经验值——最大值
				exp_max: 0,
				// 拓展积分1——最小值
				extcredits1_min: 0,
				// 拓展积分1——最大值
				extcredits1_max: 0,
				// 拓展积分2——最小值
				extcredits2_min: 0,
				// 拓展积分2——最大值
				extcredits2_max: 0,
				// 拓展积分3——最小值
				extcredits3_min: 0,
				// 拓展积分3——最大值
				extcredits3_max: 0,
				// 拓展积分4——最小值
				extcredits4_min: 0,
				// 拓展积分4——最大值
				extcredits4_max: 0,
				// 拓展积分5——最小值
				extcredits5_min: 0,
				// 拓展积分5——最大值
				extcredits5_max: 0,
				// 拓展积分6——最小值
				extcredits6_min: 0,
				// 拓展积分6——最大值
				extcredits6_max: 0,
				// 拓展积分7——最小值
				extcredits7_min: 0,
				// 拓展积分7——最大值
				extcredits7_max: 0,
				// 拓展积分8——最小值
				extcredits8_min: 0,
				// 拓展积分8——最大值
				extcredits8_max: 0,
				// 钱——最小值
				money_min: 0,
				// 钱——最大值
				money_max: 0,
				// 货币——最小值
				coin_min: 0,
				// 货币——最大值
				coin_max: 0
			},
			form: {},
			// 视图模型
			vm: {},
			select: {
				type: '',
				min: '',
				max: ''
			},
			list_type: [
				{ name: '等级', value: 'level' },
				{ name: '智商', value: 'iq' },
				{ name: '信用度', value: 'credit' },
				{ name: '积分', value: 'credit_points' },
				{ name: '经验值', value: 'exp' },
				{ name: '钱', value: 'money' },
				{ name: '货币', value: 'coin' }
			]
		};
	},
	methods: {
		range() {
			var type = this.select.type;
			this.query[type + '_min'] = this.select.min;
			this.query[type + '_max'] = this.select.max;
			this.search();
		},
		reset_type() {
			this.select.min = '';
			this.select.max = '';
			for (var k in this.query) {
				if (k.endWith('_min') || k.endWith('_max')) {
					this.query[k] = 0;
				}
			}
			this.search();
		},
		get_user(user_id, list) {
			var _this = this;
			this.$get('/apis/user/account?', { user_id }, function(json, status) {
				if(json.result){
					var lt = json.result.list;
					for (var i = 0; i < lt.length; i++) {
						var o = lt[i];
						var obj = list.getObj({user_id:o.user_id});
						if(obj){
							obj.username = o.username;
							obj.nickname = o.nickname;
						}
					}
					_this.list = list;
				}
			});
		},
		get_list_after(json, status) {
			if (json.list) {
				var arr = json.list.toArr('user_id');
				this.get_user(arr.join('|'), json.list);
			}
			return json.list;
		}
	},
	created() {
		var _this = this;
		this.$get('~/apis/user/group?', null, function(json) {
			if (json.result) {
				_this.user_group.clear();
				_this.user_group.addList(json.result.list);
			}
		});
	}
};
</script>

<style>
/* 页面 */
#user_group {
}

/* 表单 */
#user_group .mm_form {
}

/* 筛选栏栏 */
#user_group .mm_filter {
}

/* 操作栏 */
#user_group .mm_action {
}

/* 模态窗 */
#user_group .mm_modal {
}

/* 表格 */
#user_group .mm_table {
}

/* 数据统计 */
#user_group .mm_data_count {
}
</style>
