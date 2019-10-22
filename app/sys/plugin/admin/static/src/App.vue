<template>
	<div class="app" id="app">
		<mm_head>
			<div class="logo_box" :style="'width: ' + width + 'px'">
				<mm_icon class="logo" src="/img/logo.png"></mm_icon>
				<span>超级美眉</span>
			</div>
			<div class="nav_quick">
				<router-link v-for="(o, idx) in web.nav.quick" :key="idx" :to="o.url">
					<mm_icon :src="o.icon" v-if="o.icon"></mm_icon>
					<span>{{ o.title }}</span>
				</router-link>
			</div>
			<div class="nav_top">
				<a href="javascript:void(0)">
					<mm_icon src="<i class='fa-search'></i>"></mm_icon>
					<span>搜索</span>
				</a>
				<router-link to="/">
					<span>消息</span>
					<span class="msg">{{ msg_count }}</span>
				</router-link>
				<mm_select class="user_box" v-model="option" :options="options" type="click">
					<mm_icon class="avatar" :src="user.avatar"></mm_icon>
				</mm_select>
				<router-link to="/">
					<mm_icon src="<i class='fa-ellipsis-v'></i>"></mm_icon>
				</router-link>
			</div>
		</mm_head>
		<mm_body>
			<mm_side id="mm_side" :func="set_width">
				<mm_list class="nav_main" col="1">
					<mm_item v-for="(o, idx) in web.nav.main" :key="idx" :url="o.sub.length > 0 ? '' : o.url">
						<div class="btn">
							<mm_icon :src="o.icon" v-if="o.icon"></mm_icon>
							<span>{{ o.title }}</span>
						</div>
						<div class="box">
							<router-link v-for="(item, i) in o.sub" :key="i" :to="item.url">
								<mm_icon :src="item.icon" v-if="item.icon"></mm_icon>
								<span>{{ show_title(item) }}</span>
							</router-link>
						</div>
					</mm_item>
				</mm_list>
			</mm_side>
			<div class="mm_main">
				<router-view></router-view>
			</div>
		</mm_body>
	</div>
</template>

<script>
	import Vue from 'Vue';

	export default {
		data: function() {
			return {
				web: this.$store.state.web,
				user: this.$store.state.user,
				width: 0,
				msg_count: 19,
				option: "",
				options: [{
						name: "基本资料",
						value: "/info"
					},
					{
						name: "修改密码",
						value: "/password"
					},
					{
						name: "退出",
						value: "/logout"
					}
				]
			}
		},
		methods: {
			set_width(width) {
				this.width = width;
			},
			show_title(o) {
				if (o.title) {
					return o.title;
				} else {
					return this.$lang(o.name);
				}
			}
		},
		computed: {
			nav_side() {
				return;
			}
		}
	};
</script>

<style>
	[class^=page_] {
		min-height: 100vh;
		padding: 2rem 0 1.75rem 0;
		position: relative;
	}

	.diy_left>div {
		float: left;
	}

	.diy_right>div {
		float: right;
	}

	#app>.mm_head {
		min-height: 2.5rem;
		background: #24292e;
		color: #fff;
		font-size: 0.875rem;
		border-bottom: 1px solid #000;
	}

	#app>.mm_body>.mm_side {
		height: calc(100vh - 2.5rem - 1px);
		background: #24292e;
		width: 12rem;
		color: #fff;
	}

	#app>.mm_body>.mm_side .line {
		background: #24292e;
		border-right: 1px solid #000;
	}

	#app>.mm_body {
		background: #f6f8fa;
	}

	#app>.mm_head>div {
		float: left;
	}

	#app>.mm_head>.nav_top {
		float: right;
	}

	#app>.mm_head>div>a {
		padding: 0.5rem 0.75rem;
		line-height: 1.5rem;
		color: #fff;
		float: left;
		border-left: 1px solid #000000;
		border-right: 1px solid #000000;
		margin-right: -1px;
	}

	#app>.mm_head>div>a:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	#app>.mm_head>div>a:active {
		background: rgb(0, 0, 0);
	}

	#app>.mm_head>.nav_quick {
		margin-left: -1px;
	}

	#app>.mm_head .msg {
		text-align: center;
		display: inline-block;
		border-radius: 0.15rem;
		min-width: 1rem;
		font-size: 0.625rem;
		height: 1rem;
		line-height: 1.425;
		padding: 0 0.25rem 0 0.2rem;
		background: #ff9000;
	}

	.nav_top .mm_icon {
		width: 1.5rem;
		height: 1.5rem;
		text-align: center;
	}

	.nav_top .mm_icon img {
		width: 1.5rem;
		height: 1.5rem;
	}

	.logo_box {
		min-width: 12rem;
		height: 2.5rem;
		padding: 0 1rem;
		border-right: 1px solid #000000;
	}

	.logo_box span {
		line-height: 2.5rem;
	}

	.logo {
		float: left;
		width: 1.5rem;
		margin-top: 0.45rem;
		margin-right: 1rem;
	}

	.logo img {
		width: 1.5rem;
		height: 1.5rem;
	}

	.mm_head a .mm_icon {
		float: left;
	}

	.user_box {
		float: left;
		padding: 0 .5rem;
		height: 2.5rem;
	}

	.user_box .avatar {
		margin-top: 0.5rem;
		border-radius: 50%;
	}

	.user_box .mm_box {
		top: 2.55rem;
		left: -50%;
	}

	.user_box a {
		color: #666;
	}
	
	.mm_side .btn {
		line-height: 2.5rem;
		padding: 0 1rem;
		color: #999;
	}
	.mm_side a {
		display: block;
		color: inherit;
		line-height: 2rem;
		padding: 0 2rem;
	}
</style>
