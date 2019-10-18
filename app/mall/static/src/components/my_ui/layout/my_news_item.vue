<template>
	<li class="my_news_item" :style="'height:' + height">
		<slot>{{ label }}</slot>
	</li>
</template>

<script>
	export default {
		props: {
			height: {
				type: String,
				default: '1.875rem'
			},
			label: {
				type: String,
				default: '1111123232'
			}
		}
	};
</script>

<style></style>
