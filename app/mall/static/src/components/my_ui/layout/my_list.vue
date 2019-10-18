<template>
	<div class="my_content">
		<div class="my_list myFlex" :style="'height:' + height">
			<my_icon>
				<slot name="left"><i :class="'fa' + icon"></i></slot>
			</my_icon>
			<div class="detail">
				<slot name="center">{{ label }}</slot>
			</div>
			<div class="icon">
				<slot name="right"><i class="fa fa-angle-right"></i></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'my_list',
		props: {
			label: {
				type: String,
				default: '账户管理'
			},
			height: {
				type: String,
				default: '3.75rem'
			},
			icon: {
				type: String,
				default: 'fa-th-large'
			}
		}
	};
</script>

<style></style>
