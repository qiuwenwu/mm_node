<template>
	<div id="app">
		<mm_page v-if="is_sign">
			<router-view></router-view>
		</mm_page>
		<mm_page v-else>
			<header>
				<div class="logo" :style="'width: ' + width + 'px'" @click="$router.push('/')">
					<mm_icon src="/img/logo.png"></mm_icon>
					<span>超级美眉</span>
				</div>
				<nav_quick></nav_quick>
				<nav_top></nav_top>
			</header>
			<mm_side id="side" :func="set_width">
				<nav_main></nav_main>
			</mm_side>
			<mm_main id="main" :style="'margin-left: ' + (width || 200) + 'px;'">
				<!-- 页签组件 -->
				<div class="mm_tab_head" id="tabs">
					<div v-for="(o, idx) in nav_cache" :key="idx" :class="{ 'active': o.url === url_now }">
						<i class="fa-times-circle" v-if="o.name !== 'index'" @click="del_tab(o)"></i>
						<router-link :to="o.url">
							{{ o.title }}
						</router-link>
					</div>
					<div></div>
				</div>
				<router-view></router-view>
			</mm_main>
			<nav_float></nav_float>
		</mm_page>
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
				nav_cache: this.$store.state.web.nav_cache,
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
				var tabs = this.nav_cache;
				var keys = Object.keys(tabs);
				if (keys.length > 0) {
					this.$router.push(tabs[keys[keys.length - 1]].url);
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
			},
			is_sign() {
				var p = this.$route.path;
				if (p.indexOf('/sign') !== -1 || p.indexOf('/forgot') !== -1) {
					return true;
				} else {
					return false;
				};
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
	main {
		margin: .5rem;
		width: calc(100% - 1rem);
		height: calc(100% - 3rem);
	}
	
	.mm_side~.mm_main {
	    height: calc(100vh - 2.5rem);
	}

	.diy_left>div {
		float: left;
	}

	.diy_right>div {
		float: right;
	}

	.mm_page>header {
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
		width: 12.5rem;
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
		min-width: 12.5rem;
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
		background: #efeff4;
		border-bottom: 1px solid #efeff4;
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
		border-bottom: 1px solid rgba(125,125,125, 0.25);
		border-radius: 2px 2px 0 0;
		font-size: 14px;
	}

	.mm_card_body {
		position: relative;
		padding: 0.5rem 1rem 1rem 1rem;
	}

	.mm_col>.mm_view,
	[class*=mm_col_]>.mm_view {
		background: #fff;
		border-radius: .5rem;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(7,17,27,0.1);
	}

	.mm_view>.mm_title {
		line-height: 2.5rem;
		padding: 0 0 0 1.5rem;
		min-height: 2.5rem;
		border-bottom: 1px solid rgba(125,125,125,0.25);
		position: relative;
		background: #fdfdfd;
	}

	.mm_view>.mm_title .title {
		font-weight: 600;
		color: #38f;
	}

	.mm_view>.mm_title .arrow::after {
		right: 1.5rem;
		transform: translateY(-50%) rotate(45deg);
	}

	.mm_table .mm_btn {
		height: 1.5rem;
		line-height: 1.5rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		margin-right: .5rem;
	}

	.keywords {
		width: 100%;
		height: 1.25rem;
		display: block;
		overflow: hidden;
	}


	.mm_pager .active {
		border-color: #38f;
	}

	.form_search {
		float: right;
		margin-right: 1rem;
		text-align: right;
	}

	.form_search input {
		width: 12.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		border: 1px solid rgba(125,125,125,0.25);
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	.form_search .mm_btn {
		height: 1.5rem;
		line-height: 1.5rem;
	}

	.form_search #btn_add {
		margin-left: 1rem;
		min-width: 6.75rem;
	}

	.form_search #btn_search {
		border-radius: 1rem;
		margin-left: .25rem;
		padding: 0 0.5rem;
	}

	.form_search .mm_select {
		display: inline-block;
	}

	.form_search .mm_select select {
		height: 1.5rem;
		line-height: 1.5rem;
		padding-top: 0;
		padding-bottom: 0;
		font-size: 0.875rem;
		position: relative;
		top: 1px;
	}

	.form_search .mm_btn i {
		margin-right: 0.25rem;
	}

	.form_search input::-webkit-input-placeholder {
		/* line-height: 1.5rem; */
	}

	.form_search input::-moz-placeholder {
		/* line-height: 1.5rem; */
	}

	.form_search input:-ms-input-placeholder {
		/* line-height: 1.5rem; */
	}

	.mm_input .title,
	.mm_number .title {
		min-width: 6.5rem;
	}

	.pc>* {
		margin: .5rem 0;
	}

	textarea::placeholder {
		font-size: 0.875rem;
		color: #999;
	}

	input::placeholder {
		color: #999;
		font-family: ;
	}

	.mm_title .btn_link {
		font-size: 1rem;
		color: #999;
		float: right;
		margin-top: 0.25rem;
	}
	
	.pager_now {
		width: 2.5rem; text-align: center; height: 1.25rem; border-radius: .25rem; border: 1px solid rgba(125, 125, 125, 0.25);;
	}
</style>
