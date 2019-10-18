<template>
	<div class="my_tab_list">
		<div class="list myClearfix">
			<div class="textBox myFl">
				<div class="title">{{title}}</div>
				<div class="info myFlex">
					<slot>
						<span class="time">{{time}}</span>
						<div class="grade">
							<span class="xingxing fa fa-heart-o"></span>
							<span class="number">{{number}}</span>
						</div>
						<span class="recommend">{{recommend}}</span>
					</slot>
				</div>
			</div>
			<div class="imgBox myFr">
				<div class="img"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: "差旅发快递师傅发电量是否多福多寿范德萨发明的顺丰快递发的发来的发的范德萨发生的方法是对方的时刻发快递师傅发送到"
			},
			time: {
				type: String,
				default: "2019-06-05"
			},
			recommend: {
				type: String,
				default: "推荐"
			},
			number: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style>
</style>
