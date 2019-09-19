<template>
	<ul class="dev_nav">
		<li v-for="(o, index) in list" :key="index">
			<a :href="o.url" v-if="o.url.indexOf('http:') === 0 || o.url.indexOf('https:') === 0">{{ o.title }}<span v-if="o.message > 0">{{ o.message }}</span></a>
			<router-link :to="o.url" v-else>{{ o.title }}<span v-if="o.message > 0">{{ o.message }}</span></router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			}
		}
	}
</script>

<style>
</style>
