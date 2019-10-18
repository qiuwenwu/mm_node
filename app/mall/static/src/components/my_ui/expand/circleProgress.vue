<template>
	<div class="circleProgress">
		<div :id="id" :style="{ width: width, height: height }"></div>
		<span>{{value}}%</span>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import pie from '/mall/js/pie.js'
	export default {
		props: {
			value: {
				type: Number,
				default: 0
			},
			width: {
				type: String,
				default: '3rem'
			},
			height: {
				type: String,
				default: '3rem'
			}
		},
		data() {
			var num = this.value;
			if (num < 0) {
				num = 0;
			} else if (num > 100) {
				num = 100;
			}
			var id = 'circleProgress' + Math.random(0, 1) * 1000;
			return {
				id: id,
				option: {
					series: [{
						type: 'pie',
						radius: ['78%', '100%'],
						labelLine: {
							normal: {
								position: 'inside', //隐藏引导线
								show: false //隐藏标识文字
							}
						},
						data: [{
							value: num,
							name: '已售'
						}, {
							value: 100 - num,
							name: '库存'
						}]
					}]
				}
			};
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById(this.id), 'pie');
			myChart.setOption(this.option);
		}
	};
</script>

<style>
	.circleProgress {
		position: relative;
	}

	.circleProgress span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.75rem;
		color: #333;
		font-weight: 700;
	}
</style>
