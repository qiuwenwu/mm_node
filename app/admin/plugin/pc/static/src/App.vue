<template>
	<div id="app" class="mm_page">
		<mm_head id="head">
			<div class="logo" :style="'width: ' + width + 'px'" @click="$router.push('/')">
				<mm_icon src="/img/logo.png"></mm_icon>
				<span>超级美眉</span>
			</div>
			<nav_quick></nav_quick>
			<nav_top></nav_top>
		</mm_head>
		<mm_body id="body">
			<mm_side id="side" :func="set_width">
				<nav_main></nav_main>
			</mm_side>
			<mm_main :style="'margin-left: ' + (width || 192) + 'px;'">
				<div class="mm_tab_head" id="tabs">
					<div v-for="(o, idx) in nav.cache" :key="idx" :class="{ 'active': o.url === url_now }">
						<i class="fa-times-circle" v-if="idx > 0" @click="del_tab(o)"></i>
						<router-link :to="o.url">
							{{ o.title }}
						</router-link>
					</div>
					<div></div>
				</div>
				<router-view class="mm_grid"></router-view>
			</mm_main>
		</mm_body>
		<nav_float></nav_float>
	</div>
</template>

<script>
	import Vue from 'Vue';
	import nav_top from './components/nav_top.vue'
	import nav_main from './components/nav_main.vue'
	import nav_quick from './components/nav_quick.vue'
	import nav_float from './components/nav_float.vue'

	export default {
		components: {
			nav_top,
			nav_main,
			nav_quick,
			nav_float
		},
		data: function() {
			return {
				nav: this.$store.state.web.nav,
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
			select_item(o) {
				if (o.url === this.url_now) {
					return true;
				} else {
					return o.sub.has({
						url: this.url_now
					})
				}
			},
			set_width(width) {
				this.width = width;
			},
			del_tab(o) {
				this.$store.commit('del_nav_cache', o);
				var tabs = this.nav.cache;
				if (tabs.length > 0) {
					this.$router.push(tabs[tabs.length - 1].url);
				} else {
					this.$router.push('/');
				}
			}
		},
		computed: {
			url_now() {
				var query = this.$route.query
				if (query.length > 0) {
					return this.$route.path + "?" + $.toUrl(query);
				}
				return this.$route.path;
			}
		},
		created() {
			if (window.history && window.history.pushState) {
				history.pushState(null, null, document.URL);
			}
		},
		destroyed() {
			window.removeEventListener('popstate', this.goBack, flase)
		}
	};
</script>

<style>
	.mm_page {
		min-height: 100vh;
		position: relative;
	}

	.diy_left>div {
		float: left;
	}

	.diy_right>div {
		float: right;
	}

	#head {
		height: 2.5rem;
		min-height: 2.5rem;
		background: #24292e;
		color: #fff;
		font-size: 0.875rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}

	#side {
		height: calc(100vh - 2.5rem);
		background: #24292e;
		width: 12rem;
		color: #fff;
		font-size: 0.875rem;
	}

	#side .line {
		background: #24292e;
		border-right: 1px solid #000;
	}

	#app>.mm_body {
		background: #f6f8fa;
	}

	#main>.card_box {
		height: calc(100vh - 4.5rem);
		position: relative;
	}

	.logo {
		min-width: 12rem;
		height: 2.5rem;
		padding: 0 1rem;
		border-right: 1px solid rgba(0, 0, 0, 0.4);
		float: left;
		position: relative;
	}

	.logo:before {
		content: "";
		display: block;
		position: absolute;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		width: 100%;
		bottom: 0;
		left: 0;
	}

	.logo:after {
		content: "";
		display: block;
		position: absolute;
		height: 100%;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		right: 0;
		top: 0;
	}

	.logo span {
		line-height: 2.5rem;
	}
	
	.logo .mm_icon {
		float: left;
		width: 1.5rem;
		margin-top: 0.45rem;
		margin-right: 1rem;
	}

	#tabs {
		background: #fff;
	}

	#tabs>div {
		padding: 0;
	}

	#tabs>div:hover {
		background: rgba(0, 50, 128, 0.05);
	}
	#tabs>div:last-child {
		background: #fff;
	}
	#tabs>div a {
		height: 2rem;
		display: inline-block;
		padding: 0 1rem;
	}

	#tabs i {
		height: 2rem;
		line-height: 1.875rem;
		display: inline-block;
		padding-left: 0.5rem;
		padding-right: 0.75rem;
		float: right;
		color: #ccc;
	}

	#tabs i:hover {
		color: red;
		cursor: pointer;
	}

	#tabs i~a {
		padding-right: 0.25rem;
	}

	#tabs>.active {
		background: #f6f8fa;
		border-bottom: 1px solid #f6f8fa;
	}

	#body>.mm_main>.mm_grid {
		position: relative;
		overflow: hidden;
		padding: 0.5rem;
		min-height: calc(100vh - 4.5rem);
	}

	#body>.mm_main>.mm_grid>.mm_col,
	#body>.mm_main>.mm_grid>[class*=mm_col_] {
		padding: 0.5rem;
	}

	.mm_card {
		background: #fff;
		border-radius: 2px;
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
	}

	.mm_card_head {
		position: relative;
		height: 2.5rem;
		line-height: 2.5rem;
		padding: 0 1rem;
		border-bottom: 1px solid #f5f5f5;
		border-radius: 2px 2px 0 0;
		font-size: 14px;
	}

	.mm_card_body {
		position: relative;
		padding: 0.5rem 1rem 1rem 1rem;
	}
</style>
