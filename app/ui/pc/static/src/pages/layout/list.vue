<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">列表<span>&lt; 返回</span></div>
				</mm_view>

				<div class="h5">通过父级改变列数 <mm_btn type="info" @click.native="add()">{{ col }}列</mm_btn>
				</div>
				<mm_list :col="col" class="center mm_list-x">
					<mm_item>
						<mm_view>1</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>2</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>3</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>4</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>5</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>6</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>7</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>8</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>9</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>10</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>11</mm_view>
					</mm_item>
					<mm_item>
						<mm_view>12</mm_view>
					</mm_item>
				</mm_list>

				<div class="h5">自适应列数 <mm_btn type="info" @click.native="add_num()">{{ num }}列</mm_btn>
				</div>
				<mm_list class="center mm_list-x mm_list-sm">
					<mm_item v-for="(o, idx) in num" :key="idx">
						<mm_view>{{ o }}</mm_view>
					</mm_item>
				</mm_list>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				idx: 3,
				num: 1
			}
		},
		methods: {
			add() {
				var idx = this.idx + 1;
				if (idx > 8) {
					idx = 0;
				}
				this.idx = idx;
			},
			add_num() {
				this.num += 1;
				if (this.num > 12) {
					this.num = 1;
				}
			}
		},
		computed: {
			col() {
				var arr = [1, 2, 3, 4, 5, 6, 8, 10, 12];
				var n = this.idx;
				if (n >= arr.length) {
					n = arr.length;
				}
				return arr[n].toString();
			}
		}
	}
</script>

<style>
</style>
