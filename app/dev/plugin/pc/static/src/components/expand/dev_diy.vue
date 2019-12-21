<template>
	<div>
		<div v-for="(o, index) in list" :key="index" :class="o.class_name" v-html="o.html"></div>
	</div>
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
	};
</script>

<style>
</style>
