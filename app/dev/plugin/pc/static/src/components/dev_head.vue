<template>
	<!-- 页头 -->
	<header>
		<div class="logo">
			<router-link to="/"><img src="./img/logo_gray.png" /></router-link>
		</div>
		<mm_nav class="nav_top" :list="nav.top" :value="$route.path"></mm_nav>
		<dev_diy class="diy_left" :list="diy.top_left"></dev_diy>
		<dev_diy class="diy_right" :list="diy.top_right"></dev_diy>
	</header>
</template>

<script>
	import dev_diy from './expand/dev_diy.vue';
	
	export default {
		components: {
			dev_diy
		},
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
	/* dev_head 按钮 */
	.dev_head .button {
		position: relative;
		overflow-x: hidden;
	}
	
	.dev_head .button .mask {
		width: 100%;
		height: 100%;
		z-index: 4;
	}
	
	.dev_head .button .mm_icon {
		height: calc(4rem - 1px);
		line-height: 4rem;
		float: left;
		width: auto;
		min-width: 2.5rem;
		text-align: center;
	}
	
	.dev_head .button .mm_icon img {
		width: 2rem;
		border-radius: 0.325rem;
	}
	
	.dev_head .button .state {
		position: relative;
	}
	
	.dev_head .button .state:before,
	.dev_head .button .state:after {
		content: "";
		display: block;
		clear: both;
	}
	
	.dev_head .button .title {
		padding-top: 0.75rem;
		font-size: 0.75rem;
		color: rgb(209, 213, 218);
	}
	
	.dev_head .button .desc {
		font-size: 0.875rem;
		color: #fff;
	}
	
	.dev_head .button .btn {
		position: absolute;
		top: 45%;
		right: 0.75rem;
		transform: translateY(-50%);
	}
</style>
