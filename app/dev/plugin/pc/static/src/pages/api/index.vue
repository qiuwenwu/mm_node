<template>
	<div class="page_api" id="api_index">
		<mm_side class="dev_side" id="app_dev_side" :func="set_width">
			<mm_body class="dev_body">
				<div v-if="scope_list.length > 0">
					<div class="plugin_count">共<span>{{ scope_list.length }}</span>个作用域</div>
					<mm_list class="scope_list" col="1">
						<mm_item v-for="(o, idx) in scope_list" :key="idx" :class="{'active': query.scope === o }" @click.native="set_scope(o)">{{ o }}</mm_item>
					</mm_list>
				</div>
			</mm_body>
		</mm_side>
		<div class="dev_main">
			<mm_body class="dev_body" v-if="!query.name">
				<div class="pc inline" name="search">
					<div class="buttons">
						<mm_btn type="info" @click.native="update()">更新</mm_btn>
					</div>
					<mm_input title="搜索" v-model="keyword"></mm_input>
				</div>
				<mm_table class="table-hover table-striped" v-if="list.length">
					<thead class="table-sm">
						<tr>
							<th width="50">#</th>
							<th width="210">接口名称</th>
							<th width="200">标题</th>
							<th>描述</th>
							<th width="140">操作</th>
						</tr>
					</thead>
					<tbody v-show="list_api.length > 0">
						<tr v-for="(o, k) in list_api" :key="k" :class="{'active': select_index == k }" @click="select_index = k">
							<th>{{ k + 1 }}</th>
							<td><a href="javascript:void(0);" @click="set_name(o.name);">{{ o.name }}</a></td>
							<td><input v-model="o.title" @blur="set({title: o.title, name: o.name})"></input></td>
							<td><input v-model="o.description" @blur="set({description: o.description, name: o.name})"></input></td>
							<td>
								<mm_btn type="info-x btn-sm" @click.native="set_show(o.name)">查看</mm_btn>
							</td>
						</tr>
						<tr v-show="list_api.length === 0">
							<td>
								没有符合条件项
							</td>
						</tr>
					</tbody>
				</mm_table>
				<mm_view class="none" v-else>
					<div class="h5">该作用域下没有接口</div>
				</mm_view>
			</mm_body>
			<mm_body class="dev_body" v-else>
				<div class="head"><strong>{{ api_title }}</strong> <span class="desc">接口明细</span>
					<mm_btn type="info" class="fr" @click.native="query.name = '';set_name('')"><i class="fa-chevron-left"></i> 返回</mm_btn>
				</div>
				<page_param :query="query"></page_param>
			</mm_body>
		</div>
		<mm_modal v-model="show" mask="true">
			<mm_head>
				<span class="h4">{{ obj.title }}</span>
			</mm_head>
			<mm_body class="pc">
				<mm_grid>
					<mm_col width="20">
						<span>路由</span>
					</mm_col>
					<mm_col width="80">
						<mm_input title="请求路径" v-model="obj.path"></mm_input>
						<mm_select title="请求方式" v-model="obj.method" :options="options_method"></mm_select>
						<mm_select title="返回类型" v-model="obj.contentType" :options="options_type"></mm_select>
						<mm_number title="缓存时长" v-model.number="obj.cache" :min="0"></mm_number>
						<mm_select title="缓存方式" v-model="obj.client_cache" :options="options_cache"></mm_select>
					</mm_col>
				</mm_grid>
				<mm_grid>
					<mm_col width="20">
						<span>权限</span>
					</mm_col>
					<mm_col width="80">
						<mm_switch title="开放域" v-model="obj.oauth.scope" type="bool"></mm_switch>
						<mm_switch title="需要登录" v-model="obj.oauth.signIn" type="bool"></mm_switch>
						<mm_number title="会员权限" v-model.number="obj.oauth.vip" :min="0" :max="5"></mm_number>
						<mm_number title="管理权限" v-model.number="obj.oauth.gm" :min="0" :max="5"></mm_number>
						<mm_number title="商户权限" v-model.number="obj.oauth.mc" :min="0" :max="5"></mm_number>
						<mm_input title="用户组" v-model="user_group"></mm_input>
						<mm_input title="管理组" v-model="user_admin"></mm_input>
					</mm_col>
				</mm_grid>
				<mm_btn class="btn-save" type="primary" @click.native="set_sub()">保存</mm_btn>
			</mm_body>
		</mm_modal>
	</div>
</template>

<script>
	import page_param from './param.vue';

	import mixin from 'page';

	export default {
		template: __template__,
		mixins: [mixin],
		components: {
			page_param
		},
		data: function() {
			return {
				url_set: "/api/dev/api?method=set&",
				url_get_list: "/api/dev/api?",
				scope_list: [],
				query: {
					scope: "client",
					name: ""
				},
				tab: "list",
				keyword: "",
				select_index: -1,
				field: "name",
				obj: {
					"name": "",
					"title": "",
					"description": "",
					"path": "",
					"type": "",
					"contentType": "",
					"func_file": "",
					"func_name": "",
					"method": "GET",
					"cache": 0,
					"client_cache": false,
					"param_path": "",
					"sql_path": "",
					"check_param": true,
					"oauth": {
						"scope": true,
						"signIn": false,
						"vip": 0,
						"gm": 0,
						"mc": 0,
						"user_admin": [],
						"user_group": []
					},
					"onOff": true,
					"filename": ""
				},
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
				user_group: "",
				user_admin: "",
				options_cache: [{
						"name": "客户端缓存",
						"value": true
					},
					{
						"name": "服务端缓存",
						"value": false
					}
				]
			}
		},
		methods: {
			set_sub() {
				var o = {
					"name": "",
					"path": "",
					"contentType": "",
					"method": "GET",
					"cache": 0,
					"client_cache": false,
					"oauth": {
						"scope": true,
						"signIn": false,
						"vip": 0,
						"gm": 0,
						"mc": 0,
						"user_admin": [],
						"user_group": []
					}
				};
				$.push(o, this.obj);
				var _this = this;
				this.set(o, null, function(msg) {
					$.toast(msg);
					if (msg.indexOf('成功') !== -1) {
						_this.show = false;
					}
				});
			},
			set_before(param) {
				this.query_set = {
					scope: this.query.scope,
					name: param.name
				};
				// var pm = Object.assign({
				// 	name: this.obj.name
				// }, o);
				return param;
			},
			set_show(name) {
				var _this = this;
				$.clear(_this.obj);
				this.$get("~/dev/api?scope=" + this.query.scope + "&name=" + name, null, function(json) {
					if (json.result) {
						_this.show = true;
						$.push(_this.obj, json.result.config);
						_this.obj.onOff = json.result.onOff
					} else if (json.error) {
						$.toast(json.error.msg);
					}
				});
			},
			set_width(width) {
				$('#app_dev_side .app_list').width(width);
			},
			set_scope(scope) {
				this.list.clear();
				var query = this.query;
				if (this.scope_list.indexOf(scope) !== -1) {
					query.scope = scope;
					query.name = "";
					this.get_list();
				} else {
					query.scope = "";
				}
				$.route.push('?' + this.toUrl(query));
			},
			set_name(name) {
				this.query.name = name;
				$.route.push('?' + $.toUrl(this.query));
			},
			get_obj_check(param) {
				if (!param.name) {
					return "缺少name"
				} else {
					return null;
				}
			},
			get_list_before(param) {
				return {
					scope: this.query.scope
				};
			},
			init_after(func) {
				// 获取接口域
				var _this = this;
				this.$get(this.url_get_list, null, function(json, status) {
					if (json.result) {
						_this.scope_list = json.result.scope;
					}
					if (func) {
						func();
					}
				});
			},
			update() {
				var _this = this;
				this.$get(this.url_get_list + 'scope=' + this.query.scope + '&method=update&dir=/', null, function(json) {
					if (json.result) {
						_this.toast(json.result.tip);
						_this.list.clear();
						_this.get_list();
					} else if (json.error) {
						_this.toast(json.error.message);
					} else {
						_this.toast('服务端请求失败');
					}
				});
			}
		},
		computed: {
			list_api() {
				var kw = this.keyword;
				if (kw) {
					var list = [];
					var lt = this.list;
					kw = '*' + kw + '*';
					var len = lt.length;
					for (var i = 0; i < len; i++) {
						var o = lt[i];
						if (o.name.has(kw) || o.title.has(kw)) {
							list.push(o);
						}
					}
					return list;
				} else {
					return this.list;
				}
			},
			api_title() {
				var query = this.query;
				var title = this.list.getVal('title', {
					name: query.name
				});
				if (title) {
					return title;
				} else {
					return query.name;
				}
			}
		}
	};
</script>

<style>
	#api_index .mm_switch {
		padding: 0.5rem 0;
	}

	#api_index .from_default {
		padding: 1.5rem 1rem;
		border-radius: 0.25rem;
	}

	#api_index .from_default .mm_body {
		padding: 1rem 0;
	}

	#api_index .from_default .mm_grid {
		padding: 1rem 0;
	}

	#api_index .from_default .btn-save {
		width: calc(100% - 10rem);
		margin: 1rem auto;
		display: block;

	}

	#api_index .from_default .mm_col_20 {
		border-right: 2px solid #dbdbdb;
	}

	#api_index .from_default .mm_col_20 span {
		text-align: center;
		top: 40%;
		left: 25%;
		transform: translate(-50%, -50%);
	}

	#api_index .from_default .mm_head {
		padding-bottom: 1rem;
	}

	#api_index .none {
		padding: 1rem;
	}

	.scope_list .mm_item {
		padding: 0.5rem 1rem;
		border-top: 1px solid #DBDBDB;
		border-bottom: 1px solid #DBDBDB;
		margin-top: -1px;
		font-size: 0.875rem;
	}

	.scope_list .mm_item:active {
		background: #FEFEFE;
	}

	.plugin_count {
		text-align: center;
		color: #666;
		line-height: 2rem;
		font-size: 0.875rem;
		background: rgb(246, 248, 250);
	}

	.plugin_count span {
		margin: 0 .25rem;
	}

	.scope_list .mm_item:hover {
		color: #000;
		background: rgb(248, 248, 250);
	}

	.scope_list .active {
		position: relative;
		color: #38f;
	}

	.scope_list .active:before {
		position: absolute;
		right: 1rem;
		top: calc(50% - 3px);
		transform: translateY(-50%);
		content: "";
		border: solid #38f;
		border-width: 0 1px 1px 0;
		display: inline-block;
		padding: 3px;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		color: #38f;
	}

	#api_index .mm_table input {
		width: 100%;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		background: no-repeat;
	}

	#api_index .buttons {
		float: right;
		padding-top: 0.5rem;
		padding-right: 1rem;
	}

	#api_index .dev_body .head {
		padding: .5rem 1rem;
		border-bottom: 1px solid #DBDBDB;
		overflow: hidden;
		font-size: 1.25rem;
	}

	#api_index tr.active {
		background-color: rgba(51, 136, 255, 0.1);
	}
</style>
