<template>
	<dev_dropdown id="app_menu" v-model="show" :obj="item">
		<div class="app_list">
			<div class="state">
				<mm_icon :src="item.icon"></mm_icon>
				<div class="title">Current app</div>
				<div class="desc" v-html="item.desc"></div>
				<i class="btn fa-sort-desc"></i>
			</div>
			<div class="state" v-for="(o, idx) in list" :key="idx" @click="func(o.name); show = false">
				<mm_icon :src="o.icon ? o.icon : '<i class=\'fa-codepen\'></i>'"></mm_icon>
				<div class="title" v-html="o.title"></div>
				<div class="desc" v-html="o.name"></div>
				<div class="description" v-if="o.description" v-html="o.description"></div>
			</div>
		</div>
	</dev_dropdown>
</template>

<script>
	export default {
		model: {
			prop: "app",
			event: "input"
		},
		props: {
			app: {
				type: String,
				default: "dev"
			},
			func: {
				type: Function,
				default: function(app_name) {

				}
			}
		},
		data() {
			return {
				show: false,
				list: []
			}
		},
		computed: {
			item() {
				return {
					title: "Current app",
					desc: this.app,
					icon: "<i class='fa-codepen'></i>"
				}
			}
		},
		created() {
			var list = this.list;
			list.clear();
			var url = "/api/dev/app?scope=sys";
			this.$get(url, null, function(json, status) {
				if (json.result) {
					list.addList(json.result.list);
				}
			});
		}
	}
</script>

<style>
	#app_menu .dropdown-modal {
		position: fixed;
		top: 2rem;
		left: 0;
		width: 100%;
		height: calc(100% - 3.75rem);
		/* background: rgba(0, 0, 0, 0.3); */
		z-index: 3;
	}

	#app_menu .app_list {
		width: 15rem;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		height: 100%;
		background: #fff;
		z-index: 5;
		color: #999;
		overflow: scroll;
	}
	#app_menu .app_list::-webkit-scrollbar {display:none}

	#app_menu .app_list .state {
		border: 1px solid #e1e4e8;
		margin-top: -1px;

	#app_menu .app_list .title {
		color: #333;
	}

	#app_menu .app_list .desc {
		color: #666;
	}

	#app_menu .description {
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
		overflow-x: hidden;
		overflow-y: auto;
	}

	#app_menu .app_list .state:hover {
		background: rgb(248, 248, 250)
	}

	#app_menu .app_list .state:hover .title {
		color: #000;
	}

	#app_menu .app_list .state:hover .desc {
		color: #333;
	}

	#app_menu .app_list .state:hover .description {
		display: block;
	}

	#app_menu .app_list .description:before {
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
</style>
