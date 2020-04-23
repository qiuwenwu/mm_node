<template>
	<main id="sys_config">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>商城配置</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="名称 / 标题 / 描述" @blur="search()" />
								</mm_col>
								<mm_col width="25">
									<mm_select v-model="query.type" title="类型" :options="type_group" @change="search()" />
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./config_form">添加</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_type">
										<mm_reverse title="类型" v-model="query.orderby" field="type" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_name">
										<mm_reverse title="名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_title">
										<mm_reverse title="标题" v-model="query.orderby" field="title" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_value">
										<mm_reverse title="变量值" v-model="query.orderby" field="value" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_description">
										<mm_reverse title="变量描述" v-model="query.orderby" field="description" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row">{{ o[field] }}</th>
									<td><span class="type">{{ name_type(o.type) }}</span></td>
									<td><span class="name">{{ o.name }}</span></td>
									<td><span class="name">{{ o.title }}</span></td>
									<td><span class="time">{{ o.value }}</span></td>
									<td><span class="email">{{ o.description }}</span></td>
									<td>
										<mm_btn class="btn_primary" :url="'./config_form?config_id=' + o[field]">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid col="4" class="mm_data_count">
							<mm_col>
								<mm_select v-model="query.size" :options="$to_size()" @change="search()" />
							</mm_col>
							<mm_col width="50">
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</mm_col>
							<mm_col>
								<div class="right plr">
									<span class="fl">共 {{ count }} 条</span>
									<span>当前</span>
									<input class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
							</mm_col>
						</mm_grid>
					</footer>
				</mm_view>
			</mm_col>
		</mm_grid>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "/apis/mall/config",
				url_del: "/apis/mall/config?method=del&",
				url_set: "/apis/mall/config?method=set&",
				field: "config_id",
				query_set: {
					"config_id": ""
				},
				type_group: [{name:"全部",value:""},{name:"文本型",value:"string"},{name:"数字型",value:"nnumber"},{name:"布尔型",value:"boolean"}],
				// 查询条件
				query: {
					// 排序
					orderby: "",
					// 页码
					page: 1,
					// 页面大小
					size: 10,
					// 关键词
					keyword: "",
				},
				form: {},
				colors: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			name_type(type){
				var tg = this.type_group;
				for(var i=0;i<tg.length;i++){
					if(tg[i].value == type){
						return tg[i].name;
					}
				}
			}
		}
		// created() {
		// 	var _this = this;
		// 	console.log(this.type);
		// 	this.$get('~/apis/mall/config?', null, function(json) {
		// 		if (json.result) {
		// 			_this.type.clear();
		// 			_this.type.addList(json.result.list)
		// 		}
		// 	});
		// }
	}
</script>

<style>
	/* 页面 */
	#sys_config {}

	/* 表单 */
	#sys_config .mm_form {}

	/* 筛选栏栏 */
	#sys_config .mm_filter {}

	/* 操作栏 */
	#sys_config .mm_action {}

	/* 模态窗 */
	#sys_config .mm_modal {}

	/* 表格 */
	#sys_config .mm_table {}

	/* 数据统计 */
	#sys_config .mm_data_count {}
</style>
