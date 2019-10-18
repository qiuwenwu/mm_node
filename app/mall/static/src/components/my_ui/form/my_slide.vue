<template>
	<div class="my_slide myFlex">
		<div class="progress" :style="{ 'width': progresswidth + '%','height':progressHeight,'backgroundColor':progressbackgroundColor }">
			<div class="leftRess" :style="{'width': wh,'height':height,'backgroundColor':backgroundColor}">
			</div>
		</div>
		<div class="range">{{currentSlide + '%'}} </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentSlide: this.width
			};
		},
		props: {
			progresswidth: {
				type: Number,
				default: 100
			},
			progressHeight: {
				type: String,
				default: '0.625rem'
			},
			progressbackgroundColor: {
				type: String,
				default: '#DFDFDF'
			},
			width: {
				type: Number,
				default: 10
			},
			height: {
				type: String,
				default: '0.625rem'
			},
			backgroundColor: {
				type: String,
				default: '#ffe06e'
			}
		},
		computed: {
			wh() {
				var step = this.currentSlide;
				if (step < 0) {
					step = 0
				} else if (step > 100) {
					step = 100
				}
				return step + "%";
			}
		}
	};
</script>

<style></style>
