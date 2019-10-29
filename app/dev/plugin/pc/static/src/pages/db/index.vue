<template>
	<div class="page_db" id="db_index">
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
				<div></div>
			</mm_head>
			<mm_body class="dev_body">
				<div class="pc inline" name="search">
					<div class="buttons">
						<mm_btn type="info" @click.native="update_db()">更新数据库</mm_btn>
						<mm_btn type="danger" @click.native="update_config()">更新配置</mm_btn>
					</div>
					<mm_input title="搜索" v-model="keyword"></mm_input>
				</div>
				<mm_table class="table-hover table-striped" v-if="list.length">
					<thead class="table-sm">
						<tr>
							<th width="50">#</th>
							<th width="210">数据表名称</th>
							<th width="200">标题</th>
							<th>描述</th>
							<th width="140">操作</th>
						</tr>
					</thead>
					<tbody v-show="list_api.length > 0">
						<tr v-for="(o, k) in list_api" :key="k">
							<th>{{ k + 1 }}</th>
							<td><a href="javascript:void(0);" @click="tab = 'info';set_api(o.name);">{{ o.name }}</a></td>
							<td><input v-model="o.title" @blur="set(o)"></input></td>
							<td><input v-model="o.description" @blur="set(o)"></input></td>
							<td>
								<mm_btn type="info-x btn-sm">查看</mm_btn>
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
						<div class="h5">该作用域下没有数据表</div>
					</mm_div>
				</div>
			</mm_body>
		</div>
	</div>
</template>

<script>
	import mixin from 'page';

	export default {
		template: __template__,
		mixins: [mixin],
		data: function() {
			return {
				url_set: "/api/dev/db?method=set&",
				url_get_obj: "/api/dev/db?",
				url_get_list: "/api/dev/db?",
				scope_list: [],
				query: {
					scope: "sys",
					name: ""
				},
				tab: "",
				obj: {},
				field: "name",
				keyword: ""
			}
		},
		methods: {
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
					this.get_list();
				} else {
					this.query.scope = "";
				}
				$.route.push('?' + this.toUrl(this.query));
			},
			set_name(name) {
				this.query.name = name;
				$.route.push('?' + this.toUrl(this.query));
				this.get_obj();
			},
			get_obj_check(param) {
				if (!param.name) {
					return "缺少name"
				} else {
					return null;
				}
			},
			get_list_before(param) {
				var pm = Object.assign({}, param);
				delete pm.name;
				return pm;
			},
			init() {
				$.push(this.query, this.$route.query);
				var _this = this;
				this.$get(this.url_get_list, function(json, status) {
					if (json.result) {
						_this.scope_list = json.result.scope;
					}
					_this.get();
				});
			},
			update_config() {
				var _this = this;
				this.$get(this.url_get_list + 'method=update_config&table=*', function(json) {
					if (json.result) {
						_this.toast(json.result.tip);
					} else if (json.error) {
						_this.toast(json.error.message);
					} else {
						_this.toast('服务端请求失败');
					}
				});
			},
			update_db() {
				var _this = this;
				this.$get(this.url_get_list + 'scope=' + this.query.scope + '&method=update_db&all=true', function(json) {
					if (json.result) {
						_this.toast(json.result.tip);
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
			}
		}
	};
</script>

<style>
	#db_index .mm_side .line {
		top: 4rem
	}

	#db_index .none {
		background: url('./img/bg.png') no-repeat center center #f6f8fa;
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

	#db_index .mm_table input {
		width: 100%;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		background: no-repeat;
	}

	#db_index .buttons {
		float: right;
		padding-top: 0.5rem;
		padding-right: 1rem;
	}
</style>
