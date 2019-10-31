<template>
	<!-- 代码 -->
	<pre class="mm_code" v-highlightjs>
		<slot></slot>
	</pre>
</template>

<script>
	import hljs from '/highlight/vue-highlight.js';
	import hybrid from '/highlight/styles/vs2015.css';

	export default {
		template: __template__
	}
</script>

<style>
</style>
