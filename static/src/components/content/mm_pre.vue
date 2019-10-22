<template>
	<!-- 代码 -->
	<pre class="mm_code" contenteditable="true">
		<slot></slot>
	</pre>
</template>

<script>
	import hljs from '/highlight/highlight.pack.js';
	import hybrid from '/highlight/styles/hybrid.css';
	export default {
		template: __template__,
		props: {
			lang: {
				type: String,
				default: "JavaScript"
			}
		},
		mounted() {
			hljs.initHighlightingOnLoad();
		}
	}
</script>

<style>
</style>
