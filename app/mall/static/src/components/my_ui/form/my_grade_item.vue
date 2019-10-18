<template>
	<div class="my_grade_item myFl">
		<slot><i v-for="(star, index) in stars" :key="index" :class="`fa ${star.src}`" :style="{ color: color, fontSize: fontSize + 'px' }"
			 @click="changeGrade(index)"></i></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				starNum: 0, //点亮星星的个数
				huixing: this.icon,
				hongxing: this.fillIcon,
				stars: [{
						src: this.icon,
						active: false
					},
					{
						src: this.icon,
						active: false
					},
					{
						src: this.icon,
						active: false
					},
					{
						src: this.icon,
						active: false
					},
					{
						src: this.icon,
						active: false
					}
				]
			};
		},
		props: {
			icon: {
				type: String,
				default: 'fa-heart-o'
			},
			fillIcon: {
				type: String,
				default: 'fa-heart'
			},
			color: {
				type: String,
				default: '#ff5a6a'
			},
			fontSize: {
				type: Number,
				default: 20
			}
		},

		methods: {
			//评分
			changeGrade(index) {
				var total = this.stars.length; //星星总数
				var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量

				//进入if说明页面为初始状态
				if (this.starNum == 0) {
					this.starNum = idx;
					var _this = this;
					for (var i = 0; i < idx; i++) {
						this.stars[i].src = _this.hongxing;
						this.stars[i].active = true;
					}
				} else {
					//如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
					if (idx == this.starNum) {
						var _this = this;
						for (var i = index; i < total; i++) {
							this.stars[i].src = _this.huixing;
							this.stars[i].active = false;
						}
					}
					//如果小于当前最高星级，则直接保留当前星级
					if (idx < this.starNum) {
						var _this = this;
						for (var i = idx; i < this.starNum; i++) {
							this.stars[i].src = _this.huixing;
							this.stars[i].active = false;
						}
					}
					//如果大于当前星级，则直接选到该星级
					if (idx > this.starNum) {
						var _this = this;
						for (var i = 0; i < idx; i++) {
							this.stars[i].src = _this.hongxing;
							this.stars[i].active = true;
						}
					}

					var count = 0; //计数器-统计当前有几颗星
					for (var i = 0; i < total; i++) {
						if (this.stars[i].active) {
							count++;
						}
					}
					this.starNum = count;
				}
			}
		}
	};
</script>

<style></style>
