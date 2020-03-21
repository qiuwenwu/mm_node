<template>
	<div id="query_test">
		<mm_col>
			<mm_view id="task_main">
				<mm_title>
					<span class="title">任务 — 列表</span>
					<div class="form_search">
						<input type="test" placeholder="输入关键词" />
						<mm_btn class="btn_primary-x" id="btn_search"><i class="fa-search"></i><span>搜索</span></mm_btn>
					</div>
				</mm_title>
				<div class="table_task">
					<mm_table type="hover" class="table_bordered table_striped">
						<thead>
							<tr>
								<th class="th_id">#</th>
								<th class="th_name">任务名称</th>
								<th class="th_time">创建时间</th>
								<th class="th_state">进度</th>
								<th class="th_handle">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>1</th>
								<td>外伤类批测</td>
								<td><span class="time">2020-01-19</span></td>
								<td><span class="font_warning">0%</span></td>
								<td><mm_btn class="btn_primary" :url="'./article_appraise?task_id=' + 1">单评</mm_btn><mm_btn class="btn_success"  :url="'./result_compare?task_id=' + 1">对比</mm_btn></td>
							</tr>
							<tr>
								<th>2</th>
								<td>感冒类批测</td>
								<td><span class="time">2020-01-19</span></td>
								<td><span class="font_danger">15%</span></td>
								<td><mm_btn class="btn_primary" :url="'./article_appraise?task_id=' + 1">单评</mm_btn><mm_btn class="btn_success"  :url="'./result_compare?task_id=' + 1">对比</mm_btn></td>
							</tr>
							<tr>
								<th>3</th>
								<td>流行病批测</td>
								<td><span class="time">2020-01-19</span></td>
								<td><span class="font_success">100%</span></td>
								<td><mm_btn class="btn_primary" :url="'./article_appraise?task_id=' + 1">单评</mm_btn><mm_btn class="btn_success"  :url="'./result_compare?task_id=' + 1">对比</mm_btn></td>
							</tr>
							<tr>
								<th>4</th>
								<td>癌症类批测</td>
								<td><span class="time">2020-01-19</span></td>
								<td><span class="font_info">65%</span></td>
								<td><mm_btn class="btn_primary" :url="'./article_appraise?task_id=' + 1">单评</mm_btn><mm_btn class="btn_success"  :url="'./result_compare?task_id=' + 1">对比</mm_btn></td>
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
				web: this.$store.state.web
			}
		}
	};
</script>

<style>
	#query_test #task_main {
		display: inline-block;
	}
	#query_test .table_task {
		min-height: calc(100vh - 9.25rem);
	}
</style>
