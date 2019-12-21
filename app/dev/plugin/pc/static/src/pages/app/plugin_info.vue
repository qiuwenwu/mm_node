<template>
	<div id="plugin_info">
		<div class="h3">
			<mm_switch class="onOff" v-model="plugin.onOff" type="bool"></mm_switch>
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
</template>

<script>
	export default {
		methods:{
			getList(){
				var o = this.list.getObj({
					name: name
				});
				var query = this.query;
				if (o) {
					var url = "/api/dev/plugin?scope=" + query.app + "&name=" + name;
				
					var _this = this;
					this.$get(url, null, function(json, status) {
						var res = json.result;
						if (res) {
							$.push(_this.plugin, res);
						}
					});
					query.plugin = name;
				} else {
					query.plugin = "";
				}
				if (query.tab === 'plugin') {
					query.tab = 'info'
				}
				$.route.push('?' + this.toUrl(query));
			}
		}
	}
</script>

<style>
</style>
