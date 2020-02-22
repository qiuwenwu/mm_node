<template>
	<div class="page_param">
		<div class="pc" v-if="obj.config.name">
			<div class="mm_tabs" v-if="obj.config.type !== 'web'">
				<span class="bg_grey">支持方法</span>
				<a href="javascript:void(0)" v-for="(o, i) in tabs" :key="i" :class="{'active': i === index}" @click="index = i">
					{{ o }}
				</a>
				<a class="save" @click="">搜索</a>
				<input class="search" v-model="keyword" placeholder="搜索关键词"></input>
			</div>
			<div class="mm_collapse mm_collapse_default" v-if="list_headers.length > 0">
				<header>
					协议头参数<span>（Headers）</span>
				</header>
				<mm_body>
					<table class="mm_table table-bordered table-sm table-hover">
						<thead>
							<tr>
								<th width="150">参数</th>
								<th width="100">类型</th>
								<th width="70">必填</th>
								<th>说明</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(o, k) in list_headers" :key="k">
								<td><strong>{{ o.name }}</strong></td>
								<td>{{ o.type }}</td>
								<td>{{ o.required ? '是' : '否' }}</td>
								<td>{{ o.title }}
									<p>{{ o.description }}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</main>
			</div>

			<div class="mm_collapse mm_collapse_info" v-if="list_query.length > 0">
				<header>
					URL请求参数<span>（Query）</span>
				</header>
				<mm_body>
					<table class="mm_table table-bordered table-sm table-hover">
						<thead>
							<tr>
								<th width="150">参数</th>
								<th width="100">类型</th>
								<th width="70">必填</th>
								<th width="140">范围</th>
								<th>说明</th>
								<th width="70">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(o, k) in list_query" :key="k" :class="{'active': select_query == k }" @click="select_query = k">
								<td><strong>{{ o.name }}</strong></td>
								<td>{{ o.type }}</td>
								<td>{{ o.required ? '是' : '否' }}</td>
								<td>
									<mm_group v-if="o.type == 'number'">
										<mm_input type="number" class="range" @blur="save()" v-model.number="o.number.range[0]" v-if="o.number.range.length > 1"></mm_input>
										<mm_input type="number" class="range" @blur="save()" v-model.number="o.number.min" v-else></mm_input>
										<div class="range_x">~</div>
										<mm_input type="number" class="range" @blur="save()" v-model.number="o.number.range[1]" v-if="o.number.range.length > 1"></mm_input>
										<mm_input type="number" class="range" @blur="save()" v-model.number="o.number.max" v-else></mm_input>
									</mm_group>
									<mm_group v-else-if="o.type == 'string'">
										<mm_input type="number" class="range" @blur="save()" v-model.number="o.string.range[0]" v-if="o.string.range.length > 1"></mm_input>
										<mm_input type="text" class="range" @blur="save()" v-model="o.string.min" v-else></mm_input>
										<div class="range_x">~</div>
										<mm_input type="number" class="range" @blur="save()" v-model.number="o.string.range[1]" v-if="o.string.range.length > 1"></mm_input>
										<mm_input type="text" class="range" @blur="save()" v-model="o.string.max" v-else></mm_input>
									</mm_group>
								</td>
								<td>
									<mm_input class="title" @blur="save()" v-model="o.title"></mm_input>
									<mm_input class="desc" @blur="save()" v-model="o.description"></mm_input>
								</td>
								<td>
									<div class="handle">
										<mm_btn type="warning-x" @click.native="del_item('query', o.name)">删除</mm_btn>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</main>
			</div>

			<div class="mm_collapse  mm_collapse_primary" v-if="list_body.length > 0">
				<div class="mm_head">
					正文请求参数<span>（Body）</span>
				</div>
				<div class="mm_body center">
					<table class="mm_table table-bordered table-sm table-hover">
						<thead>
							<tr>
								<th width="150">参数</th>
								<th width="100">类型</th>
								<th width="70">必填</th>
								<th width="140">范围</th>
								<th>说明</th>
								<th width="70">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(o, k) in list_body" :key="k" :class="{'active': select_body == k }" @click="select_body = k">
								<td><strong>{{ o.name }}</strong></td>
								<td>{{ o.type }}</td>
								<td>{{ o.required ? '是' : '否' }}</td>
								<td>
									<mm_group v-if="o.type == 'number'">
										<mm_input type="number" class="range" v-model.number="o.number.range[0]" v-if="o.number.range.length > 1"></mm_input>
										<mm_input type="number" class="range" v-model.number="o.number.min" v-else></mm_input>
										<div class="range_x">~</div>
										<mm_input type="number" class="range" v-model.number="o.number.range[1]" v-if="o.number.range.length > 1"></mm_input>
										<mm_input type="number" class="range" v-model.number="o.number.max" v-else></mm_input>
									</mm_group>
									<mm_group v-else-if="o.type == 'string'">
										<mm_input type="number" class="range" v-model.number="o.string.range[0]" v-if="o.string.range.length > 1"></mm_input>
										<mm_input type="text" class="range" v-model="o.string.min" v-else></mm_input>
										<div class="range_x">~</div>
										<mm_input type="number" class="range" v-model.number="o.string.range[1]" v-if="o.string.range.length > 1"></mm_input>
										<mm_input type="text" class="range" v-model="o.string.max" v-else></mm_input>
									</mm_group>
								</td>
								<td>
									<mm_input class="title" v-model="o.title"></mm_input>
									<mm_input class="desc" v-model="o.description"></mm_input>
								</td>
								<td>
									<div class="handle">
										<mm_btn type="warning-x" @click.native="del_item('body', o.name)">删除</mm_btn>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="desc center" v-if="list_query.length === 0 && list_body.length === 0 && obj.config.type !== 'web'">无需传参</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			query: {
				type: Object,
				default: function() {
					return {};
				}
			},
			display: {
				type: String,
				default: "1"
			}
		},
		data() {
			return {
				url_set: "/api/dev/api?method=set&",
				url_get_obj: "/api/dev/api?",
				obj: {
					"config": {
						"name": "",
						"title": "",
						"description": "",
						"path": "",
						"type": "",
						"func_file": "",
						"func_name": "",
						"method": "",
						"cache": 0,
						"client_cache": false,
						"param_path": "",
						"sql_path": "",
						"check_param": true,
						"contentType": "json"
					},
					"filename": "",
					"onOff": true,
					"param": {
						config: {
							add: {
								body: [],
								body_required: []
							},
							del: {
								query: [],
								query_required: []
							},
							set: {
								query: [],
								query_required: [],
								body: [],
								body_required: []
							},
							get: {
								query: [],
								query_required: []
							},
							post: {
								query: [],
								query_required: [],
								body: [],
								body_required: []
							},
							list: []
						},
						filename: ""
					},
					"sql": {
						config: {
							convert: {},
							del_repeat: {},
							field: "{0}",
							field_default: "",
							field_hide: [],
							filter: {},
							func_file: "",
							func_name: "",
							key: "",
							method: "",
							name: "",
							orderby: "{0}",
							orderby_default: "",
							page_size: 30,
							query: {},
							query_default: {},
							separator: "|",
							table: "",
							update: {},
							where: {}
						},
						filename: ""
					},
					"oauth": {

					}
				},
				tabs: [],
				index: 0,
				options_method: [{
						name: "GET / POST",
						value: "ALL"
					},
					{
						name: "GET",
						value: "GET"
					},
					{
						name: "POST",
						value: "POST"
					}
				],
				options_type: [{
						name: "json",
						value: "json"
					},
					{
						name: "xml",
						value: "xml"
					},
					{
						name: "text",
						value: "text"
					},
					{
						name: "html",
						value: "html"
					}
				],
				keyword: "",
				select_query: -1,
				select_body: -1
			}
		},
		methods: {
			set(o) {
				var query = this.query;
				o.name = query.name;
				this.$post(this.url_set + $.toUrl(query), o, function(json, status) {
					var res = json.result;
					if (res) {
						if (!res.bl) {
							$.toast(res.tip);
						}
					} else if (json.error) {
						$.toast(json.error.message);
					} else {
						$.toast('服务端连接失败！');
					}
				});
			},
			set_list(list, arr, required) {
				if (arr) {
					var params = this.obj.param.config.list;
					if (this.keyword) {
						var len = arr.length;
						for (var i = 0; i < len; i++) {
							var k = arr[i];
							if (k.indexOf(this.keyword) !== -1) {
								var o = params.getObj({
									name: k
								});
								if (o) {
									o.required = required;
									list.push(o);
								}
							}
						}
					} else {
						var len = arr.length;
						for (var i = 0; i < len; i++) {
							var k = arr[i];
							var o = params.getObj({
								name: k
							});
							if (o) {
								o.required = required;
								list.push(o);
							}
						}
					}
				};
			},
			set_data() {
				var m = "";
				var sql = this.obj.sql;

				if (sql && sql.config) {
					m = sql.config.method;
				}

				if (!m) {
					var config = this.obj.config;
					m = config.method ? config.method.toLowerCase() : 'get';
					if (m === 'all') {
						m = "get post"
					}
				}

				var tabs = m.split(' ');
				var len = tabs.length;
				for (var i = 0; i < len; i++) {
					if (tabs[i] === 'get') {
						this.index = i;
						break;
					}
				}
				this.tabs = tabs;
			},
			save() {
				this.$post('/api/dev/api?method=set_param&' + $.toUrl(this.query), this.obj.param.config, function(json, status) {
					var res = json.result;
					if (res) {
						// $.toast(res.tip);
					} else if (json.error) {
						$.toast(json.error.message);
					} else {
						$.toast('服务端连接失败！');
					}
				});
			},
			del_item(type, name) {
				var method = this.tabs[this.index];
				var arr = this.obj.param.config[method][type];
				var len = arr.length;
				for (var i = 0; i < len; i++) {
					var n = arr[i];
					if (n == name) {
						arr.splice(i, 1)
						break;
					}
				}
			}
		},
		computed: {
			oauth() {
				var badge = '';
				var o = this.obj.config.oauth;
				if (o && o.signIn) {
					if (o.vip || o.gm || o.mc || o.user_group.length || o.user_admin.length) {
						badge = "需要权限"
					} else {
						badge = "需要登录"
					}
				}
				return badge;
			},
			list_headers() {
				var list = [];
				var cg = this.obj.config.oauth;
				if (cg) {
					if (cg.signIn) {
						list.push({
							name: "x-oauth-token",
							type: "string",
							required: false,
							title: "临时访问牌"
						});
					};
				}
				return list;
			},
			list_body() {
				var list = [];
				var method = this.tabs[this.index];
				var obj = this.obj.param.config[method];
				if (obj) {
					if (obj.body_required) {
						this.set_list(list, obj.body_required, true)
					};
					if (obj.body) {
						this.set_list(list, obj.body)
					};
				}
				return list;
			},
			list_query() {
				var list = [];
				var method = this.tabs[this.index];
				var obj = this.obj.param.config[method];
				if (obj) {
					if (obj.query_required) {
						this.set_list(list, obj.query_required, true)
					};
					if (obj.query) {
						this.set_list(list, obj.query)
					};
				}
				return list;
			}
		},
		created() {
			var _this = this;
			this.$get(this.url_get_obj, this.query, function(json, status) {
				if (json.result) {
					$.push(_this.obj, json.result);
					_this.set_data()
				}
			});
		}
	}
</script>

<style>
	.page_param .search {
		border-left: 1px solid #DBDBDB;
		padding: 0.45rem 0.5rem;
		float: right;
	}

	.page_param .mm_tabs {
		margin: 2rem 1rem;
		border: 1px solid #DBDBDB;
	}

	.page_param .mm_tabs a,
	.page_param .mm_tabs span {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-right: 1px solid #DBDBDB;
	}

	.page_param .mm_tabs a:hover {
		color: #26d2ff;
	}

	.page_param .mm_tabs .fr {
		color: #999;
	}

	.page_param .copy_btn {
		position: absolute;
		right: 1rem;
		top: 2rem;
	}

	.save {
		float: right;
		background: #DBDBDB;
		padding-left: 1rem !important;
		padding-right: 1rem !important;
	}

	.page_param .mm_tabs .active {
		color: #26d2ff;
	}

	.mm_collapse {
		padding: 0 1rem;
	}

	.mm_collapse .mm_head {
		padding: 0.25rem 1rem;
	}

	.mm_collapse_info .mm_head {
		color: #fff;
		background-color: #26d2ff;
	}

	.mm_collapse_primary .mm_head {
		color: #fff;
		background-color: #38f;
	}

	.mm_table td,
	.mm_table th {
		vertical-align: middle;
		text-align: center;
	}

	.page_param>.pc {
		max-width: 75rem;
	}

	.mm_table .desc,
	.mm_table p {
		color: #999;
		font-size: 0.875rem;
	}

	.mm_table .desc {
		padding-top: 0 !important;
	}

	.mm_table .desc input {
		color: #999;
	}

	.mm_table .title {
		display: inline-block;
		padding: 0;
	}

	.mm_table .title input {
		border: none;
		text-align: center;
		padding: 0 !important;
	}

	.mm_table .handle {
		display: none;
	}

	.mm_table tr:hover .handle {
		display: block;
	}

	.mm_table .range {
		display: initial;
		float: left;
	}

	.mm_table .range input {
		min-width: 6rem;
		text-align: center;
	}

	.mm_table .range_x {
		padding: 0 0.25rem;
		padding-top: 0.5rem;
	}

	.page_param .mm_table tr.active {
		background-color: rgba(51, 136, 255, 0.1);
	}
</style>
