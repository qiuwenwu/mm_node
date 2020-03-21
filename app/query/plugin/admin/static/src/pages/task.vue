<template>
	<div id="query_task">
		<mm_col>
			<mm_view id="task_main">
				<mm_title>
					<span class="title">任务 — 列表</span>
					<div class="form_search">
						<input type="test" v-model="query.keyword" placeholder="输入关键词" @keydown.enter="search()" />
						<mm_btn class="btn_primary-x" id="btn_search" @click.native="search()"><i class="fa-search"></i><span>搜索</span></mm_btn>
						<mm_btn class="btn_primary" id="btn_add" :url="'./task_edit'"><span>添加任务</span></mm_btn>
					</div>
				</mm_title>
				<div class="table_task">
					<mm_table type="hover" class="table_bordered table_striped">
						<thead>
							<tr>
								<th class="th_id">#</th>
								<th class="th_name">任务名称</th>
								<th class="th_state">状态</th>
								<th class="th_time">创建时间</th>
								<th class="th_num">参与人数</th>
								<th>查询词条</th>
								<th class="th_handle">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(o, k) in list" :key="k">
								<th>{{ o.task_id }}</th>
								<td>{{ o.name }}</td>
								<td>
									<span class="font_warning" v-if="o.state === 1">待抓取</span>
									<span class="font_danger" v-else-if="o.state === 2">抓取中</span>
									<span class="font_info" v-else-if="o.state === 3">测评中</span>
									<span class="font_success" v-else-if="o.state === 4">已完成</span>
								</td>
								<td><span class="time">{{ $toTime(o.create_time, 'yyyy-MM-dd') }}</span></td>
								<td><span class="num">90</span><span> / {{ o.people_num }}</span></td>
								<td><span class="keywords">{{ o.query }}</span></td>
								<td>
									<mm_btn class="btn_danger" :url="'./task_edit?task_id=' + o.task_id">编辑</mm_btn><mm_btn class="btn_warning" @click.native="del(o)">删除</mm_btn>
								</td>
							</tr>
						</tbody>
					</mm_table>
						
					<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
				</div>
			</mm_view>
		</mm_col>
	</div>
</template>

<script>
	import mixin_page from '/src/mixins/page.js';
	
	export default {
		mixins: [mixin_page],
		data() {
			return {
				web: this.$store.state.web,
				url_get_list: "/api/query/task",
				query: {
					keyword: "",
					page: 1,
					size: 10
				}
			}
		},
		methods: {
			del(o){
				var _this = this;
				$.confirm('"' + o.name  + '"删除后将不能恢复！<br>确定是否要删除？', '删除任务', function(tag){
					_this.$get('/apis/query/task?method=del&task_id=' + o.task_id, null, function(res){
						if(res.result.bl){
							_this.get_first(_this.query)
						}
					})
				});
			}
		}
	};
</script>

<style>
	#query_task .table_task {
		min-height: calc(100vh - 9.25rem);
	}
</style>
