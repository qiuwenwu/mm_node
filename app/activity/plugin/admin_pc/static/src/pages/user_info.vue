<template>
	<main id="activity_user_info">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>参与者信息</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="姓名 / 手机号 / 省市区" @blur="search()" />
								</mm_col>
								<mm_col width="25">
									<mm_select v-model="query.state" title="状态" :options="$to_kv(states)" @change="search()" />
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_uin">
										<mm_reverse title="uin" v-model="query.orderby" field="uin_user" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="姓名" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_phone">
										<mm_reverse title="手机" v-model="query.orderby" field="phone" :func="search"></mm_reverse>
									</th>
									<!-- <th scope="col" class="th_email">
										<mm_reverse title="邮箱" v-model="query.orderby" field="email" :func="search"></mm_reverse>
									</th> -->
									<th scope="col" class="th_address">
										<mm_reverse title="省市区" v-model="query.orderby" field="location" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="">
										<mm_reverse title="紧急联系人" v-model="query.orderby" field="liaison_name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_phone">
										<mm_reverse title="联系人电话" v-model="query.orderby" field="liaison_phone" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_state">
										<mm_reverse title="状态" v-model="query.orderby" field="state" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o.info_id)" @click="select_change(o.info_id)" /></th>
									<th scope="row">{{ o.info_id }}</th>
									<td><span class="uin">{{ o.uin_user }}</span></td>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="phone">{{ o.phone }}</span></td>
									<!-- <td><span class="email">{{ o.email }}</span></td> -->
									<td><span class="address">{{ o.location }}</span></td>
									<td><span class="title">{{ o.liaison_name }}</span></td>
									<td><span class="phone">{{ o.liaison_phone }}</span></td>
									<td><span class="state" v-bind:class="colors[o.state]">{{ states[o.state] }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./user_info_form?info_id=' + o.info_id">审核</mm_btn>
										<mm_btn class="btn_success" :url="'./user_log?uin_user=' + o.uin_user">查看</mm_btn>
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
				url_get_list: "/apis/activity/user_info",
				url_del: "/apis/activity/user_info?method=del&",
				url_set: "/apis/activity/user_info?method=set&",
				field: "info_id",
				query_set: {
					info_id: ''
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
					// 表单ID
					"info_id":0,
					// 状态
					state: "0",
					// 用户验证状态——最小值
					"state_min":0,
					// 用户验证状态——最大值
					"state_max":0,
					// 参与人姓名
					"name":"",
					// 紧急联系人姓名
					"liaison_name":""
				},
				form: {
					// 用户验证状态
					"state": 0,
					// 手机号码
					"phone": "",
					// 紧急联系人号码
					"liaison_phone": "",
					// 参与人姓名
					"name": "",
					// 身份证号
					"idcard": "",
					// 紧急联系人姓名
					"liaison_name": "",
					// 用户唯一标识
					"uin_user": "",
					// 审核人uin
					"uin_checker": "",
					// 所在位置
					"location": "",
					// 详细地址
					"address": "",
					// 身份证正面照
					"idcard_img_a": "",
					// 身份证反面照
					"idcard_img_b": "",
					// 其他补充信息
					"note": ""
				},
				// 状态
				states: ['', '待审核', '已认证', '未通过', '黑名单'],
				colors: ['', 'font_yellow', 'font_success', 'font_warning', 'font_default'],
				// 视图模型
				vm: {}
			}
		},
		methods: {}
	}
</script>

<style>
	/* 页面 */
	#activity_user_info {}

	/* 表单 */
	#activity_user_info .mm_form {}

	/* 筛选栏栏 */
	#activity_user_info .mm_filter {}

	/* 操作栏 */
	#activity_user_info .mm_action {}

	/* 模态窗 */
	#activity_user_info .mm_modal {}

	/* 表格 */
	#activity_user_info .mm_table {}

	/* 数据统计 */
	#activity_user_info .mm_data_count {}
</style>
