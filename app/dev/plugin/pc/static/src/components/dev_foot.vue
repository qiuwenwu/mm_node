<template>
	<!-- 页脚 -->
	<mm_foot id="foot">
		<dev_diy class="diy_left" :list="diy.bottom_left"></dev_diy>
		<dev_diy class="diy_right" :list="diy.bottom_right"></dev_diy>
		<div class="account">
			<div class="user" @click="show.menu = true">
				<mm_icon class="avatar" :src="user.avatar"></mm_icon>
				<span class="nickname">{{ user.nickName }}</span>
			</div>
		</div>
		<mm_nav class="dev_nav nav_bottom" :list="nav.bottom"></mm_nav>
	</mm_foot>
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
</style>
