<template>
	<!-- 代码 -->
	<div class="mm_code">
		<button class="copy_btn" @click="$copy(code)" v-if="code">复制</button>
		<pre v-highlightjs="code"><slot><code :lang="lang" :contenteditable="edit"></code></slot></pre>
	</div>
</template>

<script>
	import hljs from '/highlight/vue-highlight.js';
	import hybrid from '/highlight/styles/vs2015.css';

	export default {
		props: {
			code: {
				type: String,
				default: ""
			},
			lang: {
				type: String,
				default: "javascript"
			},
			edit: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
	.mm_code {
		position: relative;
	}

	.mm_code .copy_btn {
		position: absolute;
		right: 0.75rem;
		top: 0.75rem;
		padding: 0.25rem 0.75rem;
		border-radius: 0.25rem;
		border: none;
		background: #fff;
		font-size: 0.625rem;
		display: none;
	}
	.mm_code:hover .copy_btn {
		display: block;
	}
	
	.mm_code .copy_btn:active {
		background: #f5f5f5;
	}

	.hljs li {
		line-height: 1.75;
	}

	.hljs li:before {
		float: left;
		content: attr(data-line-number);
		min-width: 2.25rem;
		border-right: 1px solid #c5c5c5;
		word-wrap: normal;
		text-align: right;
		padding-right: 0.5rem;
		margin-right: 0.5rem;
	}
</style>
