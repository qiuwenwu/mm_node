<template>
	<div class="my_transfer">
		<!-- 全部选项 -->
		<div class="option all">
			<div class="title myFlex">
				<my_checkbox type="checkbox" label="全部选项" v-model="leftAll" @change="leftAllChange" ref="allMark"></my_checkbox>
				<div class="number">
					{{ leftCount }}/
					<span>{{ leftOptions.length }}</span>
				</div>
			</div>
			<div class="info">
				<div class="my_transfer_item" v-if="leftOptions.length !== 0">
					<my_checkbox type="checkbox" v-for="(item, index) in leftOptions" @change="leftSingleChange" v-model="item.val"
					 :key="index + 'left'" :label="item.label"></my_checkbox>
				</div>
				<div class="noMessage" v-else>{{ noMessage }}</div>
			</div>
		</div>
		<!-- 中间穿梭按钮 -->
		<div class="marked_btn">
			<my_icon @chooseOption="goRight" :class="{ active: rightArrow }" :disabled="!rightArrow">
				<slot name="right"><i :class="'fa ' + rightIocn"></i></slot>
			</my_icon>
			<my_icon @chooseOption="goLeft" :class="{ active: leftArrow }" :disabled="!leftArrow">
				<slot name="left"><i :class="'fa ' + rightIocn"></i></slot>
			</my_icon>
		</div>
		<!-- 已选中选项 -->
		<div class="option marked">
			<div class="title myFlex">
				<my_checkbox type="checkbox" label="已选中选项" @change="rightAllChange" v-model="rightAll"></my_checkbox>
				<div class="number">
					{{ rightCount }}/
					<span>{{ rightOptions.length }}</span>
				</div>
			</div>
			<div class="info">
				<div class="my_transfer_item" v-if="rightOptions.length !== 0">
					<my_checkbox type="checkbox" v-for="(item, index) in rightOptions" @change="rightSingleChange" v-model="item.val"
					 :key="index + 'right'" :label="item.label"></my_checkbox>
				</div>
				<div class="noMessage" v-else>{{ noMessage }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leftOptions: JSON.parse(JSON.stringify(this.options)), //全部选项
				rightOptions: [],
				noMessage: '暂无数据',
				leftCount: 0,
				rightCount: 0,
				leftAll: false,
				rightAll: false
			};
		},
		computed: {
			// rightArrow() {
			// 	return this.leftOptions.some(_item => _item.val);
			// },
			// leftArrow() {
			// 	return this.rightOptions.some(_item => _item.val);
			// }
		},
		props: {
			options: {
				type: Array,
				default: function() {
					return [{
							label: '游泳',
							val: false
						},
						{
							label: '健身',
							val: false
						},
						{
							label: '下棋',
							val: false
						},
						{
							label: '游戏',
							val: false
						}
					];
				}
			},
			rightIocn: {
				type: String,
				default: 'fa-angle-double-right'
			},
			leftIocn: {
				type: String,
				default: 'fa-angle-double-left'
			}
		},
		methods: {
			// 点击左侧全部所有的都选中
			leftAllChange(val) {
				// this.leftOptions.forEach(item => {
				// 	item.val = val ? true : false;
				// });
				// this.leftCount = (this.leftOptions.filter(item => item.val) || []).length;
			},
			// 点击右侧全部所有的都选中
			rightAllChange(val) {
				// this.rightOptions.forEach(item => {
				// 	item.val = val ? true : false;
				// });
				// this.rightCount = (this.rightOptions.filter(item => item.val) || []).length;
			},
			// 点击左侧单个选项
			leftSingleChange(val) {
				// this.leftCount = (this.leftOptions.filter(item => item.val) || []).length;
				// this.leftAll = this.leftCount === this.leftOptions.length;
			},
			rightSingleChange(val) {
				// this.rightCount = (this.rightOptions.filter(item => item.val) || []).length;
				// this.rightAll = this.rightCount === this.rightOptions.length;
			},
			// 到右边
			goRight() {
				// this.leftOptions.forEach(item => {
				// 	if (item.val) {
				// 		this.rightOptions.push({
				// 			label: item.label,
				// 			val: false
				// 		});
				// 	}
				// });
				// this.leftOptions = this.leftOptions.filter(item => !item.val);
				// this.leftCount = 0;
				// this.leftAll = false;
			},
			// 到左边
			goLeft() {
				// this.rightOptions.forEach(item => {
				// 	if (item.val) {
				// 		this.leftOptions.push({
				// 			label: item.label,
				// 			val: false
				// 		});
				// 	}
				// });
				// this.rightOptions = this.rightOptions.filter(item => !item.val);
				// this.rightCount = 0;
				// this.rightAll = false;
			}
		}
	};
</script>

<style></style>
