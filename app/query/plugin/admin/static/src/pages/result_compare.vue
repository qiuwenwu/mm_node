<template>
	<div id="query_result_compare">
		<mm_col>
			<mm_view id="result_compare">
				<mm_title>
					<span class="title">查询结果对比</span>
					<mm_btn class="btn_link" @click.native="$router.go(-1)"><i class="fa-angle-left"></i> 返回</mm_btn>
				</mm_title>
				<mm_grid>
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
					<div class="side" id="query_engine">
						<div class="head">
						</div>
						<div class="mm_list">
							<button><span>baidu</span></button>
							<button class="active"><span>sogou</span></button>
							<button><span>360</span></button>
							<button><span>google</span></button>
						</div>
					</div>
					<div class="main">
						<div id="window_set">
							<div class="head">
								<div class="form_device">
									<mm_select :options="device_type_options" v-model="device.type" :func="set_device"></mm_select>
									<div class="mm_input">
										<input v-model="device.width" /> x <input v-model="device.height" />
									</div>
								</div>
							</div>
							<div class="list">
								<mm_btn class="btn_primary"><span>左边明显好</span></mm_btn>
								<mm_btn class="btn_primary"><span>左边较好</span></mm_btn>
								<mm_btn class="btn_primary"><span>两边差不多</span></mm_btn>
								<mm_btn class="btn_primary"><span>右边较好</span></mm_btn>
								<mm_btn class="btn_primary"><span>右边明显好</span></mm_btn>
							</div>
						</div>
						<div id="window_panel">
							<div id="window">
								<div class="warp">
									<iframe id="frame" :style="'width: ' + device.width + 'px;height: ' + device.height + 'px;'" src="/query/result_compare?article_id=1"></iframe>
								</div>
							</div>
							<div id="window">
								<div class="warp">
									<iframe id="frame" :style="'width: ' + device.width + 'px;height: ' + device.height + 'px;'" src="/query/result_compare?article_id=1"></iframe>
								</div>
							</div>
						</div>
					</div>
					
					<div id="pannel_appraise">
						<mm_title>
							<span class="title">好在哪？</span>
							<a href="javascript:void(0)"><i class="fa-star-o"></i></a>
						</mm_title>
						<div class="list pc">
							<mm_checkbox v-model="appraise_value" :options="appraise_options" :disabled="true"></mm_checkbox>
						</div>
					</div>
				</mm_grid>
				<div id="vs">
					<span>VS</span>
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
				appraise_value: "",
				appraise_options: [
					{
						name: "时效性好",
						value: "1"
					},
					{
						name: "地域性好",
						value: "2"
					},
					{
						name: "相关性好",
						value: "3"
					},
					{
						name: "权威性好",
						value: "4"
					},
					{
						name: "多样性好",
						value: "5"
					},
					{
						name: "形态丰富",
						value: "6"
					}
				],
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
	#query_result_compare #result_compare {
		display: inline-block;
	}

	#query_result_compare #pannel_appraise {
		position: absolute;
		right: -11rem;
		background: #fff;
		border-radius: .25rem;
		box-shadow: 0 1px 0.125rem 0 rgba(0, 0, 0, .1);
	}

	#query_result_compare #pannel_appraise .mm_title {
		padding: 0;
		height: 2rem;
		min-height: 2rem;
		line-height: 2rem;
		font-size: 0.75rem;
		position: relative;
		border-bottom: 1px solid #DBDBDB;
	}

	#query_result_compare #pannel_appraise .mm_title .title {
		color: #333;
	}

	#query_result_compare #pannel_appraise {
		text-align: center;
		width: 10rem;
		overflow: hidden;
		float: left;
		top: 15rem;
	}

	#query_result_compare #pannel_appraise .mm_title i {
		position: absolute;
		right: 0.5rem;
		color: #999;
		top: 50%;
		transform: translate(0, -50%);
		font-size: 1rem;
	}

	#query_result_compare #pannel_appraise i:hover {
		cursor: hand;
		color: #ff5000;
	}

	#query_result_compare #pannel_appraise .mm_title .active {
		color: #ff9000;
	}

	#query_result_compare #pannel_appraise .list {
		padding: 0.75rem 0;
	}

	#query_result_compare #pannel_appraise label:hover {
		-webkit-filter: opacity(70%);
		filter: opacity(70%);
	}

	#query_result_compare #pannel_appraise label {
		display: block;
		width: calc(100% - 4rem);
		height: 1.5rem;
		line-height: 1.5rem;
		font-size: 0.75rem;
		border-radius: 2rem;
		margin: 0.75rem auto;
		overflow: hidden;
		position: relative;
		background: #38f;
		color: #fff;
	}
	
	#query_result_compare #pannel_appraise .name {
		position: relative;
		top: -1px;
	}
	
	#query_result_compare #pannel_appraise .figure:before {
		border-color: #44b549;
	}
	
	#query_result_compare #pannel_appraise .figure {
		background: #fff;
		margin-left: -.5rem;
	}
	
	#query_result_compare #pannel_appraise .mm_btn i {
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		background: #fff;
		border-radius: 50%;
		margin-left: -1rem;
		margin-right: .5rem;
		position: relative;
		top: -1px;
	}

	#query_result_compare #window_panel .side {
		width: 7.5rem;
		min-height: calc(100vh - 14.25rem);
		float: left;
	}

	#query_result_compare #window_panel .head {
		height: 2rem;
	}

	#query_result_compare #window_panel {
		display: flex;
		align-items: stretch;
		min-height: calc(100vh - 14.25rem);
	}

	#query_result_compare #query_keywords {
		width: 7.5rem;
		background: #666666;
		text-align: center;
	}

	#query_result_compare #query_keywords .title {
		color: #fff;
		line-height: 2rem;
		border-bottom: 1px solid #DBDBDB;
	}

	#query_result_compare #query_keywords button {
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

	#query_result_compare #query_keywords .active {
		background: #38f;
	}

	#query_result_compare #query_keywords .active::after {
		content: "";
		display: block;
		width: 0;
		height: 0;
		border-width: 0.5rem;
		border-style: solid;
		border-color: transparent #F6F8FA transparent transparent;
		position: absolute;
		right: 0;
		top: 52%;
		transform: translate(0, -50%) rotate(0deg);
	}
	#query_result_compare .side {
		width: 7.5rem;
	}
	#query_result_compare #query_engine button {
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

	#query_result_compare #query_engine .active {
		border: 1px solid #38f;
		color: #38f;
	}

	#query_result_compare #query_engine {
		background: #F6F8FA;
	}
	
	#query_result_compare #query_engine .head {
		height: 2.125rem;
	}

	#query_result_compare #window .head, #query_result_compare #window_set .head {
		background: #F0F0FA;
		text-align: center;
	}

	#query_result_compare #window .mm_select, #query_result_compare #window_set .mm_select  {
		float: left;
	}

	#query_result_compare #window .mm_select select, #query_result_compare #window_set .mm_select select {
		border: none;
	}

	#query_result_compare #window .mm_input, #query_result_compare #window_set .mm_input {
		float: left;
		padding: .125rem 0 .125rem 1rem
	}

	#query_result_compare #window input, #query_result_compare #window_set input {
		width: 2.625rem;
		height: 1.25rem;
		color: #666;
		text-align: center;
		padding: 0;
	}

	#query_result_compare .form_device {
		display: inline-block;
	}

	#query_result_compare #window #frame {
		border: 1px solid #DBDBDB;
		margin: auto;
		background: #fff;
	}
	
	#query_result_compare #window .warp {
		padding: 0.5rem;
	}
	
	#query_result_compare #window_set {
		text-align: center;
	}
	
	#query_result_compare #window_set .head {
		background: #F0F0FA;
		height: 2rem;
	}
	
	#query_result_compare #window_set .list {
		padding-top: 0.75rem;
		padding-bottom: 0.25rem;
	}
	
	#query_result_compare #window_set .list .mm_btn {
		border-radius: 10rem;
		margin: 0 .25rem;
	}
	
	#query_result_compare #vs {
		width: 2.5rem;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size: 1.5rem;
		border: 1px solid #dbdbdb;
		background: #fff;
		position: absolute;
		top: 52%;
		left: calc(50% + 7.625rem);
		transform: translate(-50%, -50%);
		border-radius: 50%;
		text-align: center;
		color: #DBDBDB;
	}
</style>
