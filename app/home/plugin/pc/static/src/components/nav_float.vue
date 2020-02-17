<template>
	<nav id="nav_float">
		<router-link v-for="(o, idx) in nav.float" :key="idx" :to="o.url">
			<mm_icon :src="o.icon" v-if="o.icon"></mm_icon>
			<span>{{ o.title }}</span>
		</router-link>
	</nav>
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
</style>
