<template>
	<div class="page_api" id="api_index">
		<mm_side class="dev_side" id="app_dev_side" :func="set_width">
			<mm_head class="dev_head">
				<div></div>
			</mm_head>
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
			<mm_head class="dev_head">
				<div></div>
			</mm_head>
			<mm_body class="dev_body" v-show="!query.name">
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
							<td><input v-model="o.title" @blur="set(o)"></input></td>
							<td><input v-model="o.description" @blur="set(o)"></input></td>
							<td>
								<mm_btn type="info-x btn-sm" @click="set_name(o.name);">查看</mm_btn>
							</td>
						</tr>
						<tr v-show="list_api.length === 0">
							<td>
								没有符合条件项
							</td>
						</tr>
					</tbody>
				</mm_table>
				<div v-else>
					<mm_div class="none">
						<div class="h5">该作用域下没有接口</div>
					</mm_div>
				</div>
			</mm_body>
			<mm_body class="dev_body" v-if="query.name">
				<div class="head"><strong>{{ api_title }}</strong> <span class="desc">接口明细</span><mm_btn type="info" class="fr" @click.native="query.name = '';set_name('')"><i
						 class="fa-chevron-left"></i> 返回</mm_btn>
				</div>
				<page_param :query="query"></page_param>
			</mm_body>
		</div>
	</div>
</template>

<script>
	import page_param from '/dev/src/components/page_param.vue';

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
				field: "name",
				keyword: "",
				select_index: -1
			}
		},
		methods: {
			/**
			 * @description 设置前
			 * @param {Object} param 参数
			 */
			set_before(param) {
				var url = this.url_set;
				var index = url.indexOf('scope=');
				if (index === -1) {
					this.url_set += '&scope=' + this.query.scope;
				} else {
					this.url_set = this.url_set.substring(0, index) + 'scope=' + this.query.scope;
				};
				return param;
			},
			set_width(width) {
				$('#app_dev_side .app_list').width(width);
			},
			set_scope(scope) {
				this.list.clear();
				if (this.scope_list.indexOf(scope) !== -1) {
					this.query.scope = scope;
					this.query.name = "";
					this.get_list();
				} else {
					this.query.scope = "";
				}
				$.route.push('?' + this.toUrl(this.query));
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
					scope: param.scope
				};
			},
			init_after(func) {
				// 获取接口域
				var _this = this;
				this.$get(this.url_get_list, function(json, status) {
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
				this.$get(this.url_get_list + 'scope=' + this.query.scope + '&method=update&dir=/', function(json) {
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
					for (var i = 0; i < lt.length; i++) {
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
				var title = this.list.getVal('title', {
					name: this.query.name
				});
				if (title) {
					return title;
				} else {
					return this.query.name;
				}
			}
		}
	};
</script>

<style>
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
