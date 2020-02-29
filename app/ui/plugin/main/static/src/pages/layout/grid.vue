<template>
	<mm_page id="page_grid">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>栅格</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_view>
						<h5>常见栅格布局</h5>
						<mm_grid class="center grid-x">
							<!-- 100% -->
							<mm_col width="100"><mm_view>100</mm_view></mm_col>

							<!-- 1:3 -->
							<mm_col width="25"><mm_view>25</mm_view></mm_col>
							<mm_col width="75"><mm_view>75</mm_view></mm_col>

							<!-- 1:1 -->
							<mm_col width="50"><mm_view>50</mm_view></mm_col>
							<mm_col width="50"><mm_view>50</mm_view></mm_col>

							<!-- 1:1:1:1 -->
							<mm_col width="25"><mm_view>25</mm_view></mm_col>
							<mm_col width="25"><mm_view>25</mm_view></mm_col>
							<mm_col width="25"><mm_view>25</mm_view></mm_col>
							<mm_col width="25"><mm_view>25</mm_view></mm_col>

							<!-- 1:4 -->
							<mm_col width="20"><mm_view>20</mm_view></mm_col>
							<mm_col width="80"><mm_view>80</mm_view></mm_col>

							<!-- 1:2:1 -->
							<mm_col width="25"><mm_view>25</mm_view></mm_col>
							<mm_col width="50"><mm_view>25</mm_view></mm_col>
							<mm_col width="25"><mm_view>25</mm_view></mm_col>

							<!-- 1:1:1 -->
							<mm_col width="33"><mm_view>33</mm_view></mm_col>
							<mm_col width="33"><mm_view>33</mm_view></mm_col>
							<mm_col width="33"><mm_view>33</mm_view></mm_col>

							<!-- 1:2 -->
							<mm_col width="33"><mm_view>33</mm_view></mm_col>
							<mm_col width="66"><mm_view>66</mm_view></mm_col>

							<!-- 1:1:1:1:1 -->
							<mm_col width="20"><mm_view>20</mm_view></mm_col>
							<mm_col width="20"><mm_view>20</mm_view></mm_col>
							<mm_col width="20"><mm_view>20</mm_view></mm_col>
							<mm_col width="20"><mm_view>20</mm_view></mm_col>
							<mm_col width="20"><mm_view>20</mm_view></mm_col>
						</mm_grid>
					</mm_view>
					<mm_view>
						<h5>通过父级改变列数 <mm_btn class="btn_info" @click.native="add()">{{ col }}列</mm_btn>
						</h5>
						<mm_grid :col="col" class="center grid-x">
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
					</mm_view>
					<mm_view>
						<h5>自适应列数 <mm_btn class="btn_info" @click.native="add_num()">{{ num }}列</mm_btn>
						</h5>
						<mm_grid class="center grid-x mm_grid-sm">
							<mm_col v-for="(o, idx) in num" :key="idx">
								<mm_view>{{ o }}</mm_view>
							</mm_col>
						</mm_grid>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
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
