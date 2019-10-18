<template>
	<div class="my_header myFlex" :style="{'height':height}">
		<my_icon>
			<slot name="left"><i class="fa fa-arrow-left"></i></slot>
		</my_icon>
		<my_title>
			<slot name="center">{{label}}</slot>
		</my_title>
		<div class="text">
			<slot name="right">{{rightText}}</slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: '导航栏'
			},
			rightText: {
				type: String,
				default: '文字'
			},
			height: {
				type: String,
				default: '6.25rem'
			}
		}
	}
</script>

<style scoped>
	.my_header {
		/* position: absolute;
    top:0;
    left:0;
    right:0;
    margin-bottom: 100px; */
	}
</style>
