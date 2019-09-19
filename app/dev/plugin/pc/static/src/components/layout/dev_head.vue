<template>
	<div class="dev_head">
		<slot></slot>
	</div>
</template>

<script>
</script>

<style>
	.dev_head {
		height: 4rem;
		background: #24292e;
		color: #fff;
		border-top: 1px solid #000000;
	}

	.dev_head a {
		color: #fff;
	}

	.dev_head>div {
		float: left;
		min-width: 14rem;
		height: calc(4rem - 1px);
		border-right: 1px solid #000000;
	}

	.dev_head>div:hover {
		background: #2f363d;
	}
</style>
