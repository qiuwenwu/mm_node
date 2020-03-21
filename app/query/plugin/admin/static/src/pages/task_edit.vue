<template>
	<div id="query_task_edit">
		<mm_col>
			<mm_view id="task_main">
				<mm_title>
					<span class="title">任务 — 编辑</span>
					<mm_btn class="btn_link" @click.native="$router.go(-1)"><i class="fa-angle-left"></i> 返回</mm_btn>
				</mm_title>
				<div class="form_task pc">
					<mm_input title="任务名称" type="text" :min_length="range.min_length" :max_length="range.max_length" v-model="form.name"
					 desc="请输入2-16个中英文"></mm_input>
					<mm_number title="参与人数" v-model="form.people_num" :min="range.min" :max="range.max" :num="10"></mm_number>
					<mm_input title="截止时间" type="date" v-model="form.end_time"></mm_input>
					<div class="mm_input">
						<div class="title">查询词条</div>
						<div class="value">
							<textarea v-model="form.query" minlength="0" maxlength="65535" placeholder="多个词条用换行分隔"></textarea>
						</div>
					</div>
					<mm_btn class="btn_primary" id="btn_save" @click.native="submit()"><span v-if="query.task_id">保存修改</span><span
						 v-else>添加任务</span></mm_btn>
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
				range: {
					min: 10,
					max: 100000,
					min_length: 2,
					max_length: 16
				},
				form: {
					name: "",
					end_time: "",
					people_num: 100,
					query: ""
				},
				web: this.$store.state.web,
				url_get_obj: "~/api/query/task?",
				query: {
					task_id: 0
				},
				mode: "obj",
				url_submit: "~/apis/query/task?method="
			}
		},
		methods: {
			get_obj_after(res) {
				$.push(this.form, this.obj);
				this.form.end_time = new Date(this.obj.end_time).toStr('yyyy-MM-dd');
			}
		},
		created() {
			var id = this.query.task_id;
			if (id) {
				this.url_submit += 'set&task_id=' + id
			} else {
				this.url_submit += 'add'
			}
		}
	};
</script>

<style>
	#query_task_edit #btn_save {
		width: 10rem;
		display: block;
		margin: 1rem auto 3rem auto;
	}

	#query_task_edit .mm_view {
		display: inline-block;
		min-width: 35rem;
	}

	#query_task_edit .form_task {
		padding: 1rem;
		padding-right: 2rem;
	}

	#query_task_edit textarea {
		width: 100%;
		min-height: 12.5rem;
		border: 1px solid #DBDBDB;
		border-radius: .25rem;
		padding: .5rem;
	}

	#query_task_edit textarea::placeholder {
		font-size: 0.875rem;
		color: #999;
	}
</style>
