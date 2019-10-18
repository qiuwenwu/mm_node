<template>
	<div class="my_pager" ref="pager">
		<div class="current">当前第{{ current }}页</div>
		<div class="pager_box myClearfix">
			<div :class="[{ disabled: current === 1 }, 'left','start']" @click="setCurrent(1)">首页</div>
			<div :class="[{ disabled: current === 1 }, 'left','prev']" @click="setCurrent(current - 1)">
				<slot><i class="fa fa-angle-left"></i></slot>
			</div>
			<div class="center">
				<div v-for="(item,index) in grouplist" :key="index" @click="setCurrent(item.val)" :class="['number', { active: current == item.val }]">{{ item.num }}</div>
			</div>
			<div :class="[{ disabled: current === page }, 'right','next']" @click="setCurrent(current + 1)">
				<slot><i class="fa fa-angle-right"></i></slot>
			</div>
			<div :class="[{ disabled: current === page }, 'right','end']" @click="setCurrent(page)">尾页</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				current: this.currentPage
			};
		},
		props: {
			// 数据总条数
			total: {
				type: Number,
				default: 100
			},
			// 当前页数
			currentPage: {
				type: Number,
				default: 1
			},
			// 每页显示条数
			display: {
				type: Number,
				default: 3
			},
			// 分页条数
			pagegroup: {
				type: Number,
				default: 3,
				// 转换函数 ，在设置值之前转换
				coerce: function(res) {
					res = res > 0 ? res : 5;
					return res % 2 === 1 ? res : res + 1;
				}
			}
		},
		computed: {
			// 数据总页数(数据总条数/每页显示数据条数)
			page: function() {
				return Math.ceil(this.total / this.display);
			},
			// 获取分页页码
			grouplist: function() {
				var len = this.page, //数据总分页数
					temp = [],
					list = [],
					count = Math.floor(this.pagegroup / 2),
					center = this.current; //分页页码的中间数
				if (len <= this.pagegroup) {
					while (len--) {
						temp.push({
							num: this.page - len,
							val: this.page - len
						});
					}
					return temp;
				}
				while (len--) {
					temp.push(this.page - len);
				}
				var idx = temp.indexOf(center);
				idx < count && (center = center + count - idx);
				this.current > this.page - count && (center = this.page - count);
				temp = temp.splice(center - count - 1, this.pagegroup);
				do {
					var t = temp.shift();
					list.push({
						num: t,
						val: t
					});
				} while (temp.length);
				if (this.page > this.pagegroup) {
					this.current > count + 1 && list.unshift({
						num: '...',
						val: list[0].val - 1
					});
					this.current < this.page - count && list.push({
						num: '...',
						val: list[list.length - 1].val + 1
					});
				}
				return list;
			}
		},
		methods: {
			setCurrent(idx) {
				if (this.current != idx && idx > 0 && idx < this.page + 1) {
					this.current = idx;
					this.$emit('pagechange', this.current);
				}
			}
		}
	};
</script>

<style></style>
