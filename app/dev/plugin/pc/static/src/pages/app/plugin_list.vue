<template>
	<div id="plugin_list">
		<div v-show="list.length > 0">
			<div class="plugin_count">共<span>{{ list.length }}</span>个插件</div>
			<mm_list class="list" col="1">
				<mm_item v-for="(o, idx) in list" :key="idx" :class="{'active': plugin === o.name }" @click.native="func(o.name)">{{ o.title }}</mm_item>
			</mm_list>
		</div>
		<div class="plugin_tip" v-show="list.length === 0">该应用下没有插件</div>
	</div>
</template>

<script>
	export default {
		model: {
			prop: "plugin",
			event: "input"
		},
		props: {
			app: {
				type: String,
				default: "dev"
			},
			plugin: {
				type: String,
				default: ""
			},
			func: {
				type: Function,
				default: function(plugin_name) {}
			}
		},
		data() {
			return {
				show: false,
				list: []
			}
		},
		methods: {
			get_list(){
				var list = this.list;
				var url = "/api/dev/plugin?scope=" + this.app;
				this.$get(url, null, function(json, status) {
					if (json.result) {
						list.clear();
						list.addList(json.result.list);
					}
				});
			}
		},
		watch: {
			app() {
				this.get_list()
			}
		},
		created(){
			this.get_list()
		}
	}
</script>

<style>
</style>
