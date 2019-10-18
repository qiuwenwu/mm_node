<template>
	<div class="my_stepper">
		<ul class="myClearfix">
			<li @click="cutNumber" ref="refContent"><span>-</span></li>
			<li><input type="text" v-model="inputVal" /></li>
			<li @click="addNumber"><span>+</span></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inputVal: this.value
			};
		},
		props: {
			value: {
				type: Number,
				default: 1
			},
			step: {
				type: Number,
				default: 1
			}
		},
		mounted() {
			this.$refs.refContent.style.cursor = 'not-allowed';
		},
		// computed: {
		//   isAllowed: function() {
		//     return this.inputVal;
		//     console.log(this.inputVal);
		//   }
		// },
		methods: {
			isAllow() {
				var _this = this;
				if (this.inputVal == '1') {
					_this.$refs.refContent.style.cursor = 'not-allowed';
				} else {
					_this.$refs.refContent.style.cursor = 'pointer';
				}
			},
			cutNumber() {
				this.isAllow();
				if (this.inputVal > 1) {
					this.inputVal = Number(this.inputVal) - this.step;
				}
			},
			addNumber() {
				this.inputVal = Number(this.inputVal) + this.step;
			}
		}
	};
</script>

<style></style>
