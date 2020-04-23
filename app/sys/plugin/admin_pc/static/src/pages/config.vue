<template>
	<main id="sys_config">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>系统配置</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="用户名 / 手机号 / 邮箱 / 姓名" @blur="search()" />
								</mm_col>
								<mm_col width="25">
									<mm_select v-model="query.user_group" title="用户组" :options="$to_kv(user_group, 'group_id')" @change="search()" />
								</mm_col>
								<mm_col width="25">
									<mm_select v-model="query.state" title="状态" :options="$to_kv(states)" @change="search()" />
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./config_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_type">
										<mm_reverse title="类型" v-model="query.orderby" field="type" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_title">
										<mm_reverse title="标题" v-model="query.orderby" field="title" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_value">
										<mm_reverse title="变量值" v-model="query.orderby" field="value" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_description">
										<mm_reverse title="变量描述" v-model="query.orderby" field="description" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row">{{ o[field] }}</th>
									<td><span class="type">{{ type[o.type] }}</span></td>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="name">{{ o.title }}</span></td>
									<td><span class="time">{{ o.value }}</span></td>
									<td><span class="email">{{ o.description }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./config_form?config_id=' + o[field]">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
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
				url_get_list: "/apis/sys/config",
				url_del: "/apis/sys/config?method=del&",
				url_set: "/apis/sys/config?method=set&",
				field: "config_id",
				query_set: {
					"config_id": ""
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
				},
				form: {},
				// 状态
				states: ['', '正常', '异常', '已冻结', '已注销'],
				type: {"string":"文本型", "number":"数字型", "boolean":"布尔型"},
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
	#sys_config {}

	/* 表单 */
	#sys_config .mm_form {}

	/* 筛选栏栏 */
	#sys_config .mm_filter {}

	/* 操作栏 */
	#sys_config .mm_action {}

	/* 模态窗 */
	#sys_config .mm_modal {}

	/* 表格 */
	#sys_config .mm_table {}

	/* 数据统计 */
	#sys_config .mm_data_count {}
</style>
