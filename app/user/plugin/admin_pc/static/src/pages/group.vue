<template>
	<main id="user_group">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow"><h5>用户组</h5></header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="2">
								<mm_col><mm_input v-model="query.keyword" title="关键词" desc="名称 / 描述" @blur="search()" /></mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./group_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ disabled: !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id">#</th>
									<th scope="col" class="th_name"><mm_reverse title="应用" v-model="query.orderby" field="app" :func="search"></mm_reverse></th>
									<th scope="col" class="th_name"><mm_reverse title="名称" v-model="query.orderby" field="name" :func="search"></mm_reverse></th>
									<th scope="col" class="th_icon">图标</th>
									<th scope="col" class="th_level"><mm_reverse title="等级" v-model="query.orderby" field="level" :func="search"></mm_reverse></th>
									<th scope="col" class="th_exp"><mm_reverse title="升级所需" v-model="query.orderby" field="exp" :func="search"></mm_reverse></th>
									<th scope="col" class="th_discount"><mm_reverse title="折扣" v-model="query.orderby" field="discount" :func="search"></mm_reverse></th>
									<th scope="col" class="th_bonus"><mm_reverse title="奖励比例" v-model="query.orderby" field="bonus" :func="search"></mm_reverse></th>
									<th scope="col" class="th_description">描述</th>
									<th scope="col" class="th_handle">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(o, idx) in list" :key="idx">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<th scope="row">{{ o[field] }}</th>
									<td>
										<span class="name">{{ o.app }}</span>
									</td>
									<td>
										<span class="name">{{ o.name }}</span>
									</td>
									<td><mm_icon :src="o.icon" style="width:1.5rem;" v-if="o.icon"></mm_icon></td>
									<td>
										<span class="level">{{ o.level }}</span>
									</td>
									<td>
										<span class="exp">{{ o.exp }}</span>
									</td>
									<td>
										<span class="discount">{{ o.discount }}</span>
									</td>
									<td>
										<span class="bonus">{{ o.bonus }}</span>
									</td>
									<td>
										<span class="description">{{ o.description }}</span>
									</td>
									<td>
										<mm_btn class="btn_primary" :url="'./group_form?group_id=' + o[field]">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
									</td>
								</tr>
							</tbody>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid col="4" class="mm_data_count">
							<mm_col><mm_select v-model="query.size" :options="$to_size()" @change="search()" /></mm_col>
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
		<mm_modal v-model="show" mask="true">
			<mm_view class="card bg_no">
				<header class="bg_white"><h5>批量修改</h5></header>
				<mm_body>
					<dl>
						<dt>等级划分</dt>
						<dd><mm_number v-model="form.level"></mm_number></dd>
						<dt>下级用户组ID</dt>
						<dd><mm_number v-model="form.next_group_id"></mm_number></dd>
						<dt>升级所需经验</dt>
						<dd><mm_number v-model="form.exp"></mm_number></dd>
						<dt>折扣</dt>
						<dd><mm_number v-model="form.discount"></mm_number></dd>
						<dt>奖励比例</dt>
						<dd><mm_number type="text" v-model="form.bonus"></mm_number></dd>
					</dl>
				</mm_body>
				<footer>
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show = false">取消</button>
						<button class="btn_primary" type="button" @click="set_bath()">提交</button>
					</div>
				</footer>
			</mm_view>
		</mm_modal>
	</main>
</template>

<script>
import mixin from '/src/mixins/page.js';

export default {
	mixins: [mixin],
	data() {
		return {
			// 列表请求地址
			url_get_list: '/apis/user/group',
			url_del: '/apis/user/group?method=del&',
			url_set: '/apis/user/group?method=set&',
			field: 'group_id',
			query_set: {
				group_id: ''
			},
			user_group: [],
			// 查询条件
			query: {
				// 排序
				orderby: '',
				// 页码
				page: 1,
				// 页面大小
				size: 10,
				// 关键词
				keyword: ''
			},
			form: {},
			// 状态
			states: ['', '正常', '异常', '已冻结', '已注销'],
			colors: ['', 'font_success', 'font_warning', 'font_yellow', 'font_default'],
			// 视图模型
			vm: {}
		};
	},
	methods: {},
	created() {
		var _this = this;
		this.$get('~/apis/user/group?', null, function(json) {
			if (json.result) {
				_this.user_group.clear();
				_this.user_group.addList(json.result.list);
			}
		});
	}
};
</script>

<style>
/* 页面 */
#user_group {
}

/* 表单 */
#user_group .mm_form {
}

/* 筛选栏栏 */
#user_group .mm_filter {
}

/* 操作栏 */
#user_group .mm_action {
}

/* 模态窗 */
#user_group .mm_modal {
}

/* 表格 */
#user_group .mm_table {
}

/* 数据统计 */
#user_group .mm_data_count {
}
</style>
