<template>
	<div id="plugin_table">
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
</template>

<script>
</script>

<style>
</style>
