<template>
	<div id="nav_quick">
		<router-link v-for="(o, idx) in nav.quick" :key="idx" :to="o.url">
			<mm_icon :src="o.icon" v-if="o.icon"></mm_icon>
			<span>{{ o.title }}</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				nav: this.$store.state.web.nav
			}
		}
	}
</script>

<style>
	#nav_quick {
		margin-left: -1px;
	}

	#nav_quick a .mm_icon {
		float: left;
	}

	#nav_quick>a {
		padding: 0.5rem 0.75rem;
		line-height: 1.5rem;
		color: #fff;
		float: left;
		border-left: 1px solid #000000;
		border-right: 1px solid #000000;
		margin-right: -1px;
	}

	#nav_quick>a:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	#nav_quick>a:active {
		background: rgb(0, 0, 0);
	}
</style>
