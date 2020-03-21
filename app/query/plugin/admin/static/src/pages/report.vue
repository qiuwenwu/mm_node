<template>
	<div id="query_report">
		<mm_col>
			<mm_view id="report_main">
				<mm_title>
					<span class="title">测评报告</span>
					<div class="form_search">
						<mm_select :options="options" v-model="query.task_id"></mm_select>
						<input type="test" placeholder="输入关键词" />
						<mm_btn class="btn_primary-x" id="btn_search"><i class="fa-search"></i><span>搜索</span></mm_btn>
						<mm_btn class="btn_primary" id="btn_add"><span>导出 csv</span></mm_btn>
					</div>
				</mm_title>
				<div class="table_report">
					<mm_table type="hover" class="table_bordered table_striped">
						<thead>
							<tr>
								<th class="th_id">#</th>
								<th class="th_name">任务名称</th>
								<th>查询词条</th>
								<th class="th_num">参与人数</th>
								<th class="th_score">单评得分</th>
								<th class="th_score">对比得分</th>
								<th class="th_handle">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>1</th>
								<td>外伤类批测</td>
								<td><span class="keywords">脚擦伤了怎么办？</span></td>
								<td><span class="num">90</span><span> / 100</span></td>
								<td><span class="font_warning">-1</span></td>
								<td><span class="font_warning">-5</span></td>
								<td>
									<mm_btn class="btn_danger" :url="'/'">明细</mm_btn>
								</td>
							</tr>
							<tr>
								<th>2</th>
								<td>感冒类批测</td>
								<td><span class="keywords">感冒了能和冷饮吗？</span></td>
								<td><span class="num">90</span><span> / 100</span></td>
								<td><span class="font_success">1</span></td>
								<td><span class="font_success">3</span></td>
								<td>
									<mm_btn class="btn_danger" :url="'/'">明细</mm_btn>
								</td>
							</tr>
							<tr>
								<th>3</th>
								<td>流行病批测</td>
								<td><span class="keywords">如何预防流感病毒？</span></td>
								<td><span class="num">90</span><span> / 100</span></td>
								<td><span class="font_warning">-1</span></td>
								<td><span class="font_warning">-5</span></td>
								<td>
									<mm_btn class="btn_danger" :url="'/'">明细</mm_btn>
								</td>
							</tr>
							<tr>
								<th>4</th>
								<td>癌症类批测</td>
								<td><span class="keywords">脱臼如何处理？</span></td>
								<td><span class="num">90</span><span> / 100</span></td>
								<td><span class="font_success">1</span></td>
								<td><span class="font_success">3</span></td>
								<td>
									<mm_btn class="btn_danger" :url="'/'">明细</mm_btn>
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
				query: {
					task_id: ""
				},
				options: [
					{
						name: "全部",
						value: ""
					},
					{
						name: "外伤类批测",
						value: "1"
					}
				]
			}
		}
	};
</script>

<style>
	#query_report .table_report {
		min-height: calc(100vh - 9.25rem);
	}
</style>
