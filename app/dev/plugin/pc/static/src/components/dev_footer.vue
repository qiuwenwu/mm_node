<template>
	<div class="mm_footer" id="dev_footer">
		<dev_diy class="diy_left" :list="diy_left"></dev_diy>
		<dev_diy class="diy_right" :list="diy_right"></dev_diy>
		<div class="account">
			<div class="user" @click="show.menu = true">
				<mm_icon class="avatar" :src="user.avatar"></mm_icon>
				<span class="nickname">{{ user.nickName }}</span>
			</div>
		</div>
		<dev_nav class="nav_bottom" :list="list"></dev_nav>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				show: {
					menu: false
				},
				user: this.$store.state.user,
				list: this.$store.state.web.nav_bottom,
				diy_left: this.$store.state.web.diy_foot_left,
				diy_right: this.$store.state.web.diy_foot_right
			}
		}
	};
</script>

<style>
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
