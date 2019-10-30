<template>
	<div class="page_app" id="app_index">
		<mm_side class="dev_side" id="app_dev_side" :func="set_width">
			<mm_head class="dev_head">
				<dev_dropdown v-model="show" :obj="item" v-if="obj" id="app_dropdown">
					<div class="app_list">
						<div class="state">
							<mm_icon :src="item.icon"></mm_icon>
							<div class="title">Current app</div>
							<div class="desc" v-html="item.desc"></div>
							<i class="btn fa-sort-desc"></i>
						</div>
						<div class="state" v-for="(o, idx) in app_list" :key="idx" @click="set_app(o.name)">
							<mm_icon :src="o.icon ? o.icon : '<i class=\'fa-codepen\'></i>'"></mm_icon>
							<div class="title" v-html="o.title"></div>
							<div class="desc" v-html="o.name"></div>
							<div class="description" v-if="o.description" v-html="o.description"></div>
						</div>
					</div>
				</dev_dropdown>
				<div v-else></div>
			</mm_head>
			<mm_body class="dev_body">
				<div v-if="list.length > 0">
					<div class="plugin_count">共<span>{{ list.length }}</span>个插件</div>
					<mm_list class="list" col="1">
						<mm_item v-for="(o, idx) in list" :key="idx" :class="{'active': query.plugin === o.name }" @click.native="set_plugin(o.name)">{{ o.title }}</mm_item>
					</mm_list>
				</div>
				<div class="plugin_tip" v-else>该应用下没有插件</div>
			</mm_body>
		</mm_side>
		<div class="dev_main">
			<mm_head class="dev_head">
				<div></div>
				<div></div>
			</mm_head>
			<mm_body class="dev_body" v-show="obj.config.name && !query.plugin">
				<mm_list class="plugin_tabs">
					<mm_item :class="{ 'active': 'info' === query.tab }" @click.native="set_tab('info')">简介</mm_item>
					<mm_item :class="{ 'active': 'plugin' === query.tab }" @click.native="set_tab('plugin')">插件</mm_item>
					<mm_item :class="{ 'active': 'cmd' === query.tab }" @click.native="set_tab('cmd')">控制台</mm_item>
					<mm_item></mm_item>
				</mm_list>
				<div class="tabs_body">
					<div :class="{ 'show': 'info' === query.tab }">
						<div class="h3">
							<span>{{ obj.config.title }}</span>
						</div>
						<div class="desc">
							{{ obj.config.description }}
						</div>
						<div class="content">
							<mm_list class="plugin_info" col="1">
								<mm_item><span class="h5">应用名称:</span><span>{{ obj.config.name }}</span></mm_item>
								<mm_item><span class="h5">当前版本:</span><span>{{ obj.config.version }}</span>
									<mm_btn type="warning" class="btn-sm" v-if="obj.version_new !== obj.config.version">更新</mm_btn>
								</mm_item>
							</mm_list>
						</div>
					</div>
					<div :class="{ 'show': 'plugin' === query.tab }">
						<mm_table class="table-hover table-striped" v-if="list.length">
							<thead class="table-sm">
								<tr>
									<th width="50">#</th>
									<th width="200">插件名称</th>
									<th>描述</th>
									<th width="240">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, k) in list" :key="k">
									<th>{{ k + 1 }}</th>
									<td><a href="javascript:void(0);" @click="set_plugin(o.name);">{{ o.title }}</a></td>
									<td>{{ o.description }}</td>
									<td>
										<mm_btn type="success btn-sm">安装</mm_btn>
										<mm_btn type="warning btn-sm">卸载</mm_btn>
										<mm_btn type="default btn-sm">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
						<div v-else>
							该应用下没有插件
						</div>
					</div>
					<div :class="{ 'show': 'cmd' === query.tab }">
						<mm_grid class="plugin_window" col="1">
							<mm_col>
								<div class="log">
									<div class="h5"><i class="fa-sticky-note"></i>命令提示符</div>
									<mm_pre id="cmd_code" @keyup.enter.native="keyup">欢迎使用 {{ obj.name }}
										<div></div> >
									</mm_pre>
								</div>
							</mm_col>
							<mm_col>
								<textarea></textarea>
							</mm_col>
						</mm_grid>
					</div>
				</div>
			</mm_body>
			<mm_body class="dev_body" v-show="query.plugin">
				<mm_list class="plugin_tabs">
					<mm_item :class="{ 'active': 'info' === query.tab }" @click.native="set_tab('info')">简介</mm_item>
					<mm_item :class="{ 'active': 'set' === query.tab }" @click.native="set_tab('set')">设置</mm_item>
					<mm_item></mm_item>
				</mm_list>
				<div class="tabs_body">
					<div :class="{ 'show': 'info' === query.tab }">
						<div class="h3">
							<mm_switch class="onOff" v-model="plugin.onOff"></mm_switch>
							<span>{{ plugin.config.title }}</span>
						</div>
						<div class="desc">
							{{ plugin.config.description }}
						</div>
						<div class="content">
							<mm_list class="plugin_info" col="1">
								<mm_item><span class="h5">插件名称:</span><span>{{ plugin.config.name }}</span></mm_item>
								<mm_item><span class="h5">当前版本:</span><span>{{ plugin.config.version }}</span>
									<mm_btn type="warning" class="btn-sm" v-if="plugin.version_new !== plugin.config.version">更新</mm_btn>
								</mm_item>
							</mm_list>
						</div>
					</div>
					<div :class="{ 'show': 'set' === query.tab }">
						<iframe :src="plugin.url" v-if="plugin.url"></iframe>
						<div v-else>没有设置项</div>
					</div>
				</div>
			</mm_body>
		</div>
	</div>
</template>

<script>
	import mm_pre from '/src/components/content/mm_pre.vue';
	import mixin from 'page';

	export default {
		mixins: [mixin],
		components: {
			mm_pre
		},
		data: function() {
			return {
				url_get_obj: "/api/dev/app?scope=sys",
				url_get_list: "/api/dev/plugin",
				query: {
					// 应用名称
					"app": "dev",
					// 插件名称
					"plugin": "",
					// 标签
					"tab": "info"
				},
				app_list: [],
				width: 0,
				obj: {
					config: {
						"title": "",
						"description": "",
						"name": "",
						"app": "",
						"func_file": "",
						"func_name": "",
						"version": "1.0",
						"lang_path": "",
						"icon": "",
						"cmd": "",
						"end": true,
						"sort": 10
					}
				},
				plugin: {
					config: {
						"title": "",
						"description": "",
						"name": "",
						"app": "",
						"func_file": "",
						"func_name": "",
						"version": "1.0",
						"lang_path": "",
						"icon": "",
						"cmd": "",
						"end": true,
						"sort": 10,
					},
					"onOff": 1,
					"version_new": "1.0"
				}
			}
		},
		methods: {
			/**
			 * 初始化之后
			 */
			init_after(func) {
				this.get_app(func);
			},
			/**
			 * 获取应用详情前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				return {
					name: param.app
				}
			},
			get_obj_after(json){
				this.get_list_first();
			},
			/**
			 * 获取插件列表前
			 * @param {Object} param
			 */
			get_list_before(param) {
				return {
					scope: param.app
				}
			},
			send(cmd) {
				var str = cmd.replace(' >', this.obj.cmd);
			},
			keyup(e) {
				var arr = $('#cmd_code').children("div");
				var cmd = arr.eq(arr.length - 2).text();
				var tag = arr.eq(arr.length - 1);
				tag.text(' > ');
				$('#cmd_code').blur();
				this.send(cmd);
			},
			get_app(func) {
				var _this = this;
				this.$get(this.url_get_obj, function(json, status) {
					_this.events('get_app_after', json.result, func);
				});
			},
			get_app_after(res, func) {
				if (res && res.list) {
					this.app_list.addList(res.list);
					var app = this.query.app;
					if (this.list.length > 0) {
						if (!app) {
							app = this.list[0].name;
							this.set_app(app);
						}
					}
				}
				if (func) {
					func();
				}
			},
			set_plugin(name) {
				this.query.plugin = name;
				var o = this.list.getObj({
					name: name
				});
				if (o) {
					var url = "/api/dev/plugin?scope=" + this.query.app + "&name=" + name;

					var _this = this;
					this.$get(url, function(json, status) {
						var res = json.result;
						if (res) {
							$.push(_this.plugin, res);
							_this.plugin.onOff = res.onOff ? 1 : 0;
						}
					});
				} else {
					this.query.plugin = "";
				}
				if (this.query.tab === 'cmd' || this.query.tab === 'plugin') {
					this.query.tab = 'info'
				}
				$.route.push('?' + this.toUrl(this.query));
			},
			set_app(name) {
				this.show = false;
				this.query.app = name;
				this.query.plugin = "";
				$.route.push('?' + $.toUrl(this.query))
				this.get_obj();
			},
			set_width(width) {
				$('#app_dev_side .app_list').width(width);
			},
			set_tab(tab) {
				this.query.tab = tab;
				$.route.push('?' + this.toUrl(this.query));
			}
		},
		computed: {
			item() {
				return {
					title: "Current app",
					desc: this.query.app,
					icon: "<i class='fa-codepen'></i>"
				}
			}
		}
	}
</script>

<style>
	#app_dropdown .dropdown-modal {
		position: fixed;
		top: 2rem;
		left: 0;
		width: 100%;
		height: calc(100% - 3.75rem);
		/* background: rgba(0, 0, 0, 0.3); */
		z-index: 3;
	}

	#app_dropdown .app_list {
		width: 15rem;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		background: #fff;
		z-index: 5;
		color: #999;
	}

	#app_dropdown .app_list .state {
		border: 1px solid #e1e4e8;
		margin-bottom: -1px;
	}

	#app_dropdown .app_list .title {
		color: #333;
	}

	#app_dropdown .app_list .desc {
		color: #666;
	}

	#app_dropdown .description {
		display: none;
		position: absolute;
		left: calc(100% + 1px);
		top: 0;
		bottom: 0;
		min-height: calc(200% + 1px);
		font-size: 0.875rem;
		min-width: 15rem;
		background: #24292e;
		padding: 0.5rem;
		color: #DBDBDB;
	}

	#app_dropdown .app_list .state:hover {
		background: rgb(248, 248, 250)
	}

	#app_dropdown .app_list .state:hover .title {
		color: #000;
	}

	#app_dropdown .app_list .state:hover .desc {
		color: #333;
	}

	#app_dropdown .app_list .state:hover .description {
		display: block;
	}

	#app_dropdown .app_list .description:before {
		position: absolute;
		top: 25%;
		left: 0;
		transform: translate(-100%, -50%);
		content: "";
		display: block;
		width: 0;
		height: 0;
		border-top: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		border-right: 0.5rem solid #24292e;
	}

	.plugin_tip {
		text-align: center;
		padding: 2rem 1rem;
		color: #999;
	}

	.list .mm_item {
		padding: 0.5rem 1rem;
		border-top: 1px solid #DBDBDB;
		border-bottom: 1px solid #DBDBDB;
		margin-top: -1px;
		font-size: 0.875rem;
	}

	.list .mm_item:hover {
		color: #000;
		background: rgb(248, 248, 250);
	}

	.list .mm_item:active {
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

	.list .active {
		position: relative;
		color: #38f;
	}

	.list .active:before {
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

	.plugin_tabs {
		overflow: hidden;
	}

	.plugin_tabs .mm_item {
		overflow: hidden;
		text-align: center;
		height: 2rem;
		line-height: calc(2rem - 2px);
		padding: 0 1rem;
		border-bottom: 1px solid #DBDBDB;
		border-right: 1px solid #DBDBDB;
	}

	.plugin_tabs .mm_item:last-child {
		flex: auto;
		border-bottom: 1px solid #DBDBDB;
	}

	.plugin_tabs .active {
		border-bottom: 1px solid #fff;
		color: #38f;
	}

	#app_index .tabs_body {
		padding: 1rem;
	}

	#app_index .tabs_body>div {
		display: none;
	}

	#app_index .tabs_body .h3 {
		padding-bottom: .5rem;
		border-bottom: 1px solid #DBDBDB;
	}

	#app_index .tabs_body .desc {
		margin: 1rem 0;
		padding: 0.125rem 0;
		padding-left: 1rem;
		border-left: 3px solid #DBDBDB;
	}

	#app_index .tabs_body .onOff {
		float: right;
	}

	.plugin_info .mm_item {
		padding: 0.25rem 0;
	}

	.plugin_info .h5 {
		color: #999;
		margin-right: 1rem;
	}

	.plugin_info .mm_btn_warning {
		margin-left: 0.5rem;
	}

	.plugin_window {
		width: 100%;
	}

	.plugin_window .log {
		width: 100%;
		max-width: 50rem;
		height: 32rem;
		border: 1px solid #DBDBDB;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.plugin_window .h5 {
		padding: 0.25rem 0.5rem;
		border-bottom: 1px solid #DBDBDB;
	}

	.plugin_window .log i {
		margin-right: 0.5rem;
	}

	.plugin_window textarea {
		width: 100%;
		max-width: 50rem;
		min-height: 8rem;
	}

	#app_index .tabs_body a {
		color: #38f;
	}
</style>
