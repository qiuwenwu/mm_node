<template>
	<div class="my_detail">
		<div class="single myFlex">
			<div class="message">{{ message }}</div>
			<div class="declareBox">
				<div class="declare">{{ declare }}</div>
				<div class="time">{{ time }}</div>
			</div>
			<div class="money">+{{money}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				default: '挖'
			},
			declare: {
				type: String,
				default: '挖矿收益'
			},
			time: {
				type: String,
				default: '2019-06-05'
			},
			money: {
				type: Number,
				default: 12353
			}
		}
	};
</script>

<style></style>
