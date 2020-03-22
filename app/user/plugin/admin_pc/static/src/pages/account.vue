<template>
	<main id="account">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>超级美眉</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="用户名/手机号/邮箱/姓名" @blur="search()" />
								</mm_col>
								<mm_col width="25">
									<mm_select v-model="query.user_group" title="用户组" :options="$to_kv(user_group, 'group_id')" @change="search()" />
								</mm_col>
								<mm_col width="25">
									<mm_select v-model="query.state" title="状态" :options="$to_kv(states)" @change="search()" />
								</mm_col>
								<!-- <mm_col width="25">
									<mm_select v-model="query.vip" title="会员级别" :options="[0,1,2,3,4,5]" />
								</mm_col> -->
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./account_form">添加</mm_btn>
								<mm_btn class="font_default">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name">
										<mm_reverse title="用户名" v-model="query.orderby" field="username" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="昵称" v-model="query.orderby" field="nickname" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_phone">
										<mm_reverse title="手机" v-model="query.orderby" field="phone" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_email">
										<mm_reverse title="邮箱" v-model="query.orderby" field="email" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_state">
										<mm_reverse title="状态" v-model="query.orderby" field="state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="has_selected(o.user_id)" /></th>
									<th scope="row">{{ o.user_id }}</th>
									<td><span class="name">{{ o.username }}</span></td>
									<td><span class="name">{{ o.nickname }}</span></td>
									<td><span class="time">{{ o.phone }}</span></td>
									<td><span class="email">{{ o.email }}</span></td>
									<td><span class="state" v-bind:class="colors[o.state]">{{ states[o.state] }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./account_form?user_id=' + o.user_id">修改</mm_btn>
										<mm_btn class="btn_warning" @click="del(o)">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid col="4">
							<mm_col>
								<mm_select v-model="query.size" @change="search()" />
							</mm_col>
							<mm_col width="50">
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</mm_col>
							<mm_col>
								<div>
									<span>共 {{ count }} 条</span><span></span>
								</div>
							</mm_col>
						</mm_grid>
					</footer>
				</mm_view>
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
				// 列表请求地址
				url_get_list: "/apis/user/account",
				query_set: {
					user_id: ''
				},
				// 状态
				states: ['全部', '正常', '异常', '已冻结', '已注销'],
				colors: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
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
					// 用户组
					user_group: 0,
					// 用户ID
					"user_id": 0,
					// 账户状态——最小值
					"state": 0,
					// 会员级别——最小值
					"vip_min": 0,
					// 会员级别——最大值
					"vip_max": 0,
					// 管理员级别——最小值
					"gm_min": 0,
					// 管理员级别——最大值
					"gm_max": 0,
					// 商家级别——最小值
					"mc_min": 0,
					// 商家级别——最大值
					"mc_max": 0,
					// 创建时间——开始时间
					"create_time_min": "",
					// 创建时间——结束时间
					"create_time_max": "",
					// 上次登录时间——开始时间
					"login_time_min": "",
					// 上次登录时间——结束时间
					"login_time_max": "",
					// 手机号码认证
					"phone_state": 0,
					// 用户名
					"username": "",
					// 昵称
					"nickname": "",
					// 邮箱认证
					"email_state": 0
				},
				// 视图模型
				vm: {}
			}
		},
		methods: {
			has_selected(id) {
				var ids = '|' + this.selects + '|';
				return ids.indexOf('|' + id + '|') !== -1;
			}
		},
		created(func) {
			var _this = this;
			this.$get('~/apis/user/group?', null, function(json) {
				if (json.result) {
					_this.user_group.clear();
					_this.user_group.addList(json.result.list);
				}
			});
		}
	}
</script>

<style>
	/* {title} */
	#id {}

	/* 标题栏 */
	#id #title {}

	/* 搜索栏 */
	#id #search {}

	/* 排序栏 */
	#id #sort {}

	/* 列表 */
	#id #table {}

	/* 选择栏 */
	#id #options {}
</style>
