<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">栅格<span>&lt; 返回</span></div>
				</mm_view>

				<div class="h5">常见栅格布局</div>
				<mm_grid class="center mm_grid-x">
					<!-- 100% -->
					<mm_col width="100">100</mm_col>

					<!-- 1:3 -->
					<mm_col width="25">25</mm_col>
					<mm_col width="75">75</mm_col>

					<!-- 1:1 -->
					<mm_col width="50">50</mm_col>
					<mm_col width="50">50</mm_col>

					<!-- 1:1:1:1 -->
					<mm_col width="25">25</mm_col>
					<mm_col width="25">25</mm_col>
					<mm_col width="25">25</mm_col>
					<mm_col width="25">25</mm_col>

					<!-- 1:4 -->
					<mm_col width="20">20</mm_col>
					<mm_col width="80">80</mm_col>

					<!-- 1:2:1 -->
					<mm_col width="25">25</mm_col>
					<mm_col width="50">50</mm_col>
					<mm_col width="25">25</mm_col>

					<!-- 1:1:1 -->
					<mm_col width="33">33</mm_col>
					<mm_col width="33">33</mm_col>
					<mm_col width="33">33</mm_col>

					<!-- 1:2 -->
					<mm_col width="33">33</mm_col>
					<mm_col width="66">66</mm_col>

					<!-- 1:1:1:1:1 -->
					<mm_col width="20">20</mm_col>
					<mm_col width="20">20</mm_col>
					<mm_col width="20">20</mm_col>
					<mm_col width="20">20</mm_col>
					<mm_col width="20">20</mm_col>
				</mm_grid>

				<div class="h5">通过父级改变列数 <mm_btn type="info" @click.native="add()">{{ col }}列</mm_btn>
				</div>
				<mm_grid :col="col" class="center mm_grid-x">
					<mm_col>
						<mm_view>1</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>2</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>3</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>4</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>5</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>6</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>7</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>8</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>9</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>10</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>11</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>12</mm_view>
					</mm_col>
				</mm_grid>

				<div class="h5">自适应列数 <mm_btn type="info" @click.native="add_num()">{{ num }}列</mm_btn>
				</div>
				<mm_grid class="center mm_grid-x mm_grid-sm">
					<mm_col v-for="(o, idx) in num" :key="idx">
						<mm_view>{{ o }}</mm_view>
					</mm_col>
				</mm_grid>
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
