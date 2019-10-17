<template>
	<div class="page_app" id="app_index">
		<mm_side class="dev_side" id="app_dev_side" :func="set_width">
			<mm_head class="dev_head">
				<dev_dropdown v-model="show" :obj="obj" v-if="obj" id="app_dropdown">
					<div class="app_list">
						<div class="state">
							<mm_icon :src="obj.icon"></mm_icon>
							<div class="title" v-html="obj.title"></div>
							<div class="desc" v-html="obj.desc"></div>
							<i class="btn fa-sort-desc"></i>
						</div>
						<div class="state" v-for="(o, idx) in list" :key="idx" @click="selete(idx)">
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
				<mm_div>
					<mm_list class="list_plugin" col="1" v-if="list_plugin.length > 0">
						<mm_item v-for="(o, idx) in list_plugin" :key="idx" @click.native="go_plugin">{{ o.title }}</mm_item>
					</mm_list>
					<div class="plugin_tip" v-else>该应用下没有插件</div>
				</mm_div>
			</mm_body>
		</mm_side>
		<div class="dev_main">
			<mm_head class="dev_head">
				<div></div>
				<div></div>
			</mm_head>
			<mm_body class="dev_body"></mm_body>
		</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data: function() {
			return {
				url_get_list: "/api/dev/app?scope=sys",
				query: {
					// 执行方式
					"method": "",
					// 名称
					"name": ""
				},
				seleted: 0,
				list_plugin: [],
				width: 0,
				obj: {
					title: "Current app",
					desc: "",
					icon: ""
				}
			}
		},
		methods: {
			go_plugin(){
				
			},
			get_list_after(json) {
				if(json.result)
				{
					this.list.addList(json.result.list);
					this.selete(0);
				}
			},
			get_plugin(scope) {
				var url = "/api/dev/plugin?scope=" + scope;
				var _this = this;
				this.list_plugin.clear();
				this.$get(url, function(json, status) {
					if (json.result) {
						_this.list_plugin.addList(json.result.list);
					}
				});
			},
			selete(idx) {
				var len = this.list.length;
				if (idx >= len) {
					idx = len - 1;
				}
				this.seleted = idx;
				this.show = false;
				
				if (len) {
					var o = this.list[idx];
					this.obj.desc = o.name;
					if (o.icon) {
						this.obj.icon = o.icon;
					} else {
						this.obj.icon = "<i class='fa-codepen'></i>";
					}
					this.get_plugin(o.name);
				}
			},
			set_width(width) {
				$('#app_dev_side .app_list').width(width);
			}
		}
	};
</script>

<style>
	#app_dropdown .modal {
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
	
	.list_plugin .mm_item {
		padding: 0.5rem 1rem;
		border-top: 1px solid #DBDBDB;
		border-bottom: 1px solid #DBDBDB;
		margin-top: -1px;
		font-size: 0.875rem;
	}
	.list_plugin .mm_item:active {
		background: #FEFEFE;
	}
</style>
