<template>
	<main id="mall_shop_comment">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>店铺评论</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="用户名 / 手机号 / 邮箱 / 姓名" @blur="search()" />
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./shop_comment_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name">
										<mm_reverse title="店铺" v-model="query.orderby" field="shop" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_nickname">
										<mm_reverse title="名称" v-model="query.orderby" field="nickname" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="留言者" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_onoff">
										<mm_reverse title="启用" v-model="query.orderby" field="available" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_content">
										<mm_reverse title="正文" v-model="query.orderby" field="content" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row">{{ o[field] }}</th>
									<td><span class="name">{{ o.shop }}</span></td>
									<td><span class="name">{{ o.nickname }}</span></td>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="onOff">{{ avas[o.available]}}</span></td>
									<td><span class="content">{{ o.content}}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./shop_comment_form?comment_id=' + o[field]">修改</mm_btn>
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
						<dt>启用</dt>
						<dd>
							<label>
								<mm_switch v-model="form.available" > </mm_switch>
							</label>
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
				url_get_list: "/apis/mall/shop_comment",
				url_del: "/apis/mall/shop_comment?method=del&",
				url_set: "/apis/mall/shop_comment?method=set&",
				field: "comment_id",
				query_set: {
					"comment_id": ""
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
				colors: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
				list_user: [],
				avas:["否","是"],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			get_list_after(json, status) {
				if (json.list) {
					var arr = json.list.toArr('user_id');
					this.get_user(arr.join('|'), json.list);
				}
				return json.list;
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
						var arr = list.toArr('shop_id');
						_this.get_shop(arr.join('|'), list);
					}
				});
			},
			get_shop(shop_id, list) {
				var _this = this;
				this.$get('/apis/mall/shop?', { shop_id }, function(json, status) {
					if(json.result){
						var lt = json.result.list;
						for (var i = 0; i < lt.length; i++) {
							var o = lt[i];
							var obj = list.getObj({shop_id:o.shop_id});
							if(obj){
								obj.shop = o.name;
							}
						}
						_this.list = list;
					}
				});
			}
		},
		created() {
			
		}
	}
</script>

<style>
	/* 页面 */
	#mall_shop_comment {}

	/* 表单 */
	#mall_shop_comment .mm_form {}

	/* 筛选栏栏 */
	#mall_shop_comment .mm_filter {}

	/* 操作栏 */
	#mall_shop_comment .mm_action {}

	/* 模态窗 */
	#mall_shop_comment .mm_modal {}

	/* 表格 */
	#mall_shop_comment .mm_table {}

	/* 数据统计 */
	#mall_shop_comment .mm_data_count {}
</style>
