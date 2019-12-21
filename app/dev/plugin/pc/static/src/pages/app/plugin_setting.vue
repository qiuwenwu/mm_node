<template>
	<div id="plugin_setting">
		<iframe :src="plugin.url" v-if="plugin.url"></iframe>
		<div v-else>没有设置项</div>
	</div>
</template>

<script>
</script>

<style>
</style>
