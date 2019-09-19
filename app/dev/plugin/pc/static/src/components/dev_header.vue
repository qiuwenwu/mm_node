<template>
	<div class="mm_header" id="dev_header">
		<div class="logo">
			<router-link to="/"><img src="./img/logo_gray.png" /></router-link>
		</div>
		<dev_nav class="nav_top" :list="list"></dev_nav>
		<dev_diy class="diy_left" :list="diy_left"></dev_diy>
		<dev_diy class="diy_right" :list="diy_right"></dev_diy>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				list: this.$store.state.web.nav_top,
				diy_left: this.$store.state.web.diy_head_left,
				diy_right: this.$store.state.web.diy_head_right
			}
		}
	};
</script>

<style>
	/* 页头 */
	#dev_header {
		min-height: 2rem;
		background: #24292e;
		color: #fff;
	}

	#dev_header a {
		color: #fff;
	}

	/* logo */
	#dev_header .logo {
		width: 3rem;
		height: 2rem;
		float: left;
		text-align: center;
	}

	#dev_header .logo img {
		margin-top: 0.35rem;
		width: 1.25rem;
		height: 1.25rem;
	}

	/* 导航 */
	#dev_header .nav_top {
		line-height: 2rem;
	}

	#dev_header .nav_top li {
		float: left;
		padding: 0 0.75rem;
	}

	#dev_header .nav_top li:hover {
		background: #2f363d;
	}

	#dev_header {
		min-width: 50rem;
	}
</style>
