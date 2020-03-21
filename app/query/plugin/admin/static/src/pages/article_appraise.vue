<template>
	<div id="query_article_appraise">
		<mm_col>
			<mm_view id="article_appraise">
				<mm_title>
					<span class="title">文章页评价</span>
					<mm_btn class="btn_link" @click.native="$router.go(-1)"><i class="fa-angle-left"></i> 返回</mm_btn>
				</mm_title>
				<div id="window_panel">
					<div class="side" id="query_keywords">
						<div class="head">
							<div class="title"><span>查询词条</span></div>
						</div>
						<div class="body">
							<mm_list>
								<button><span>擦伤</span></button>
								<button class="active"><span>刀伤</span></button>
								<button><span>烧伤</span></button>
								<button><span>冻伤</span></button>
							</mm_list>
						</div>
					</div>
					<div class="side" id="query_article">
						<div class="head">
						</div>
						<div class="mm_list">
							<button><span>文章1</span></button>
							<button class="active"><span>文章2</span></button>
							<button><span>文章3</span></button>
							<button><span>文章4</span></button>
						</div>
					</div>
					<div id="window">
						<div class="head">
							<div class="form_device">
								<mm_select :options="device_type_options" v-model="device.type" :func="set_device"></mm_select>
								<div class="mm_input">
									<input v-model="device.width" /> x <input v-model="device.height" />
								</div>
							</div>
						</div>
						<div class="warp">
							<iframe id="frame" :style="'width: ' + device.width + 'px;height: ' + device.height + 'px;'" src="/query/article_appraise?article_id=1"></iframe>
						</div>
					</div>
				</div>
				<div id="pannel_appraise">
					<mm_title>
						<span class="title">评价</span>
						<a href="javascript:void(0)"><i class="fa-star-o"></i></a>
					</mm_title>
					<div class="list">
						<mm_btn class="btn_primary"><span>完美</span></mm_btn>
						<mm_btn class="btn_primary"><span>优秀</span></mm_btn>
						<mm_btn class="btn_primary"><span>良好</span></mm_btn>
						<mm_btn class="btn_primary"><span>一般</span></mm_btn>
						<mm_btn class="btn_primary"><span>差劲</span></mm_btn>
					</div>
				</div>
			</mm_view>
		</mm_col>
	</div>
</template>

<script>
	import mixin_form from '/src/mixins/form.js';

	export default {
		mixins: [mixin_form],
		data() {
			return {
				device_type_options: [{
						name: "iPhone5",
						value: "iPhone5"
					},
					{
						name: "iPhone6",
						value: "iPhone6"
					},
					{
						name: "iPhoneX",
						value: "iPhoneX"
					}
				],
				device: {
					type: "iPhone6",
					width: 375,
					height: 667
				},
				side_height: $('#side'),
				web: this.$store.state.web
			}
		},
		methods: {
			set_device(value) {
				var d = this.device;
				switch (value) {
					case "iPhone5":
						d.width = 320;
						d.height = 568;
						break;
					case "iPhone6":
						d.width = 375;
						d.height = 667;
						break;
					case "iPhoneX":
						d.width = 375;
						d.height = 812;
						break;
					default:
						break;
				}
				setTimeout(function() {
					$('#side').height($('#main').height());
				}, 400);
			}
		}
	};
</script>

<style>
	#query_article_appraise #article_appraise {
		display: inline-block;
	}

	#query_article_appraise #pannel_appraise {
		position: absolute;
		right: -11rem;
		background: #fff;
		border-radius: .25rem;
		box-shadow: 0 1px 0.125rem 0 rgba(0, 0, 0, .1);
	}

	#query_article_appraise #pannel_appraise .mm_title {
		padding: 0;
		height: 2rem;
		min-height: 2rem;
		line-height: 2rem;
		font-size: 0.75rem;
		position: relative;
		border-bottom: 1px solid #DBDBDB;
	}

	#query_article_appraise #pannel_appraise .mm_title .title {
		color: #333;
	}

	#query_article_appraise #pannel_appraise {
		text-align: center;
		width: 10rem;
		overflow: hidden;
		float: left;
		top: 15rem;
	}

	#query_article_appraise #pannel_appraise i {
		position: absolute;
		right: 0.5rem;
		color: #999;
		top: 50%;
		transform: translate(0, -50%);
		font-size: 1rem;
	}

	#query_article_appraise #pannel_appraise i:hover {
		cursor: hand;
		color: #ff5000;
	}

	#query_article_appraise #pannel_appraise .active {
		color: #ff9000;
	}

	#query_article_appraise #pannel_appraise .list {
		padding: 0.75rem 0;
	}

	#query_article_appraise #pannel_appraise .mm_btn:hover {
		-webkit-filter: opacity(70%);
		filter: opacity(70%);
	}

	#query_article_appraise #pannel_appraise .mm_btn {
		display: block;
		width: calc(100% - 5rem);
		height: 1.5rem;
		line-height: 1.5rem;
		font-size: 0.75rem;
		border-radius: 2rem;
		margin: 0.75rem auto;
		overflow: hidden;
	}

	#query_article_appraise #window_panel {
		min-height: calc(100vh - 9.25rem);
		display: flex;
		align-items: stretch;
	}

	#query_article_appraise #window_panel .side {
		width: 7.5rem;
		min-height: calc(100vh - 9.25rem);
		float: left;
	}

	#query_article_appraise #window_panel .head {
		height: 2rem;
	}

	#query_article_appraise #query_keywords {
		background: #666666;
		text-align: center;
	}

	#query_article_appraise #query_keywords .title {
		color: #fff;
		line-height: 2rem;
		border-bottom: 1px solid #DBDBDB;
	}

	#query_article_appraise #query_keywords button {
		height: 2.25rem;
		width: 100%;
		border: none;
		border-top-left-radius: 5rem;
		border-bottom-left-radius: 5rem;
		margin-top: 0.5rem;
		background: none;
		color: #fff;
		position: relative;
	}

	#query_article_appraise #query_keywords .active {
		background: #38f;
	}

	#query_article_appraise #query_keywords .active::after {
		content: "";
		display: block;
		width: 0;
		height: 0;
		border-width: 0.5rem;
		border-style: solid;
		border-color: transparent #F6F8FA transparent transparent;
		position: absolute;
		right: 0;
		top:50%;
		transform: translate(0, -50%) rotate(0deg);
	}

	#query_article_appraise #query_article button {
		height: 2rem;
		width: calc(100% - 2rem);
		margin: auto;
		border: 1px solid #DBDBDB;
		background: #fff;
		border-radius: 5rem;
		margin-top: 0.75rem;
		color: #999999;
		position: relative;
	}

	#query_article_appraise #query_article .active {
		border: 1px solid #38f;
		color: #38f;
	}

	#query_article_appraise #query_article {
		background: #F6F8FA;
	}

	#query_article_appraise #window .head {
		background: #F0F0FA;
		text-align: center;
	}

	#query_article_appraise #window .mm_select {
		float: left;
	}

	#query_article_appraise #window .mm_select select {
		border: none;
	}

	#query_article_appraise #window .mm_input {
		float: left;
		padding: .125rem 0 .125rem 1rem
	}

	#query_article_appraise #window input {
		width: 2.625rem;
		height: 1.25rem;
		color: #666;
		text-align: center;
		padding: 0;
	}

	#query_article_appraise #window .form_device {
		display: inline-block;
	}

	#query_article_appraise #window #frame {
		border: 1px solid #DBDBDB;
		margin: auto;
	}

	#query_article_appraise #window .warp {
		padding: 1rem;
	}
</style>
