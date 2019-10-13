<template>
	<div class="mm_page app">
		<!-- 页头 -->
		<div class="mm_head" id="dev_header">
			<div class="logo">
				<router-link to="/"><img src="./img/logo_gray.png" /></router-link>
			</div>
			<mm_nav class="dev_nav nav_top" :list="nav.top"></mm_nav>
			<dev_diy class="diy_left" :list="diy.top_left"></dev_diy>
			<dev_diy class="diy_right" :list="diy.top_right"></dev_diy>
		</div>
		<div class="dev_bodyer">
			<router-view></router-view>
		</div>
		<!-- 页脚 -->
		<div class="mm_foot" id="dev_footer">
			<dev_diy class="diy_left" :list="diy.bottom_left"></dev_diy>
			<dev_diy class="diy_right" :list="diy.bottom_right"></dev_diy>
			<div class="account">
				<div class="user" @click="show.menu = true">
					<mm_icon class="avatar" :src="user.avatar"></mm_icon>
					<span class="nickname">{{ user.nickName }}</span>
				</div>
			</div>
			<mm_nav class="dev_nav nav_bottom" :list="nav.bottom"></mm_nav>
		</div>
		<!-- 浮动栏 -->
		<div class="mm_float" id="dev_float" v-show="user.token"></div>
	</div>
</template>

<script>
	import Vue from 'Vue';

	// 全局组件
	import dev_dropdown from './components/expand/dev_dropdown.vue';
	import dev_diy from './components/expand/dev_diy.vue';
	
	Vue.component('dev_diy', dev_diy);
	Vue.component('dev_dropdown', dev_dropdown);


	export default {
		template: __template__,
		components: {},
		data: function() {
			return {
				show: {
					menu: false
				},
				user: this.$store.state.user,
				nav: this.$store.state.web.nav,
				diy: this.$store.state.web.diy
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
	
	/* #c9def2 蓝  #e1e4e8 灰  #24292e 黑 #2f363d 经过黑  #000 描边 */
	#dev_footer {
		min-height: 1.75rem;
		background: #fff;
		border-top: 1px solid #e1e4e8;
		font-size: 0.875rem;
		color: #666;
	}
	
	#dev_footer a {
		color: #26d2ff;
	}
	
	/* 导航 */
	#dev_footer .nav_bottom {
		line-height: 1.75rem;
	}
	
	#dev_footer .nav_bottom li {
		float: left;
		padding: 0 0.75rem;
	}
	
	#dev_footer .nav_bottom li:hover {
		background: #f6f8fa;
	}
	
	#dev_footer .account {
		white-space: nowrap;
		float: left;
		padding: 0 1rem;
	}
	
	#dev_footer .user {
		height: 1.75rem;
		line-height: 1.75rem;
		color: #666;
		display: block;
	}
	
	#dev_footer .avatar {
		float: left;
		width: 1rem;
		height: 1rem;
		font-size: 0.625rem;
		border-radius: 50%;
		border: 2px solid #666;
		line-height: 1rem;
		text-align: center;
		margin-right: 0.5rem;
		margin-top: 0.35rem;
	}
</style>
