<template>
	<div id="app_index">
		<mm_side id="side" :func="set_width">
			<mm_head class="dev_head">
				<!-- 应用下拉菜单 -->
				<app_menu v-model="query.app" :func="set_app"></app_menu>
			</mm_head>
			<mm_body class="dev_body">
				<!-- 插件列表 -->
				<plugin_list v-model="query.plugin" :app="query.app" :func="set_plugin"></plugin_list>
			</mm_body>
		</mm_side>
		<mm_main id="main">
			<div class="dev_head" v-once>
				<div class="button">
					<div class="state">
						<mm_icon src="<i class='fa-upload'></i>"></mm_icon>
						<div class="title">Upload to server</div>
						<div class="desc">上传到服务器</div>
					</div>
				</div>
				<div class="button">
					<div class="state">
						<mm_icon src="<i class='fa-github'></i>"></mm_icon>
						<div class="title">Submit to GitHub</div>
						<div class="desc">提交到 GitHub</div>
					</div>
				</div>
			</div>
			<div class="dev_body" v-show="query.plugin">
				<div class="mm_tabs" id="plugin_tabs">
					<div class="mm_tab_head">
						<div :class="{ 'active': 'info' === query.tab }" @click="set_tab('info')">简介</div>
						<div :class="{ 'active': 'plugin' === query.tab }" @click="set_tab('plugin')">插件</div>
						<div></div>
					</div>
					<div class="mm_tab_body">
						<!-- 应用信息 -->
						<div :class="{ 'show': 'info' === query.tab }"></div>
						<!-- 插件设置 -->
						<!-- <plugin_setting :class="{ 'show': 'set' === query.tab }"></plugin_setting> -->
					</div>
				</div>
			</div>
			<div class="dev_body" v-show="!query.plugin">
				<div class="mm_tabs" id="plugin_tabs">
					<div class="mm_tab_head">
						<div :class="{ 'active': 'info' === query.tab }" @click="set_tab('info')">简介</div>
						<div :class="{ 'active': 'plugin' === query.tab }" @click="set_tab('plugin')">插件</div>
						<div></div>
					</div>
					<div class="mm_tab_body">
						<!-- 应用信息 -->
						<div :class="{ 'show': 'info' === query.tab }"></div>
						<!-- 插件表 -->
						<div :class="{ 'show': 'plugin' === query.tab }"></div>
					</div>
				</div>
			</div>
		</mm_main>
	</div>
</template>

<script>
	import mixin from 'page';
	import app_menu from './app_menu.vue';
	import plugin_list from './plugin_list.vue';

	export default {
		mixins: [mixin],
		components: {
			app_menu,
			plugin_list
		},
		data: function() {
			return {
				url_get_obj: "/api/dev/app?scope=sys",
				url_get_list: "/api/dev/plugin?",
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
					"onOff": true,
					"version_new": "1.0"
				}
			}
		},
		methods: {
			set_plugin(name) {
				var query = this.query;
				query.plugin = name;
				$.route.push('?' + $.toUrl(query));
			},
			set_app(name) {
				var query = this.query;
				query.app = name;
				query.plugin = "";
				$.route.push('?' + $.toUrl(query));
			},
			set_width(width) {
				$('#side .app_list').width(width);
			},
			set_tab(tab) {
				this.query.tab = tab;
				$.route.push('?' + this.toUrl(this.query));
			}
		}
	}
</script>

<style>
	#app_index .mm_side .line {
		top: 4rem;
		height: calc(100% - 4rem);
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

	.plugin_info .btn_warning {
		margin-left: 0.5rem;
	}

	#app_index .tabs_body a {
		color: #38f;
	}
</style>
