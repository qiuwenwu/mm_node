<template>
	<div class="my_toast" :data-type="dataType" :style="{ width: minWidth, height: height, lineHeight: lineHeight, backgroundColor: backgroundColor, color: color }"
	 ref="refContent">
		{{ label }}
		<div class="model" v-show="model">
			<!-- 提示框 -->
			<div class="shadowAlert" v-show="toastAlert">
				<div class="shadow_title">{{ alertTitle }}</div>
				<div class="shadow_con">{{ alertCon }}</div>
				<div class="shadow_btn">
					<button @click.stop="closeAlert">{{ alertBtn }}</button>
				</div>
			</div>
			<!-- 确认框 -->
			<div class="shadowAlert shadowConfim" v-show="toastConfim">
				<div class="shadow_title">{{ confimTitle }}</div>
				<div class="shadow_con">{{ confimCon }}</div>
				<div class="shadow_btn myFlex">
					<button @click.stop="enterAlert" class="enterAlert">{{ confimEnter }}</button>
					<button @click.stop="cancleAlert" class="cancleAlert">{{ confimCancle }}</button>
				</div>
			</div>
			<!-- 对话框 -->
			<div class="shadowAlert shadowConfim shadowPrompt" v-show="toastPrompt">
				<div class="shadow_title">{{ promptTitle }}</div>
				<div class="shadow_con">{{ promptCon }}</div>
				<div class="shadow_prompt">
					<input v-model="message" placeholder="请输入...">
				</div>
				<div class="shadow_btn myFlex">
					<button @click.stop="enterAlertPrompt" class="enterAlert">{{ confimEnter }}</button>
					<button @click.stop="cancleAlertPrompt" class="cancleAlert">{{ confimCancle }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: false,
				toastAlert: false, //提示框
				toastConfim: false, //确认框
				toastPrompt: false, //对话框
				toastType: '',
				message: ''
			};
		},
		props: {
			dataType: {
				type: String,
				default: 'confim'
			},
			callBackFun: {
				type: Function,
				default: function(option) {

				}
			},
			label: {
				type: String,
				default: '警告框'
			},
			minWidth: {
				type: String,
				default: '6.25rem'
			},
			height: {
				type: String,
				default: '2.5rem'
			},
			lineHeight: {
				type: String,
				default: '2.5rem'
			},
			backgroundColor: {
				type: String,
				default: 'rgb(255, 255, 255)'
			},
			color: {
				type: String,
				default: '#333'
			},
			alertTitle: {
				type: String,
				default: '提示'
			},
			alertCon: {
				type: String,
				default: '欢迎使用my-ui迎使用my-ui迎使用my-ui迎使用my-ui迎使用my-ui迎使用my-ui'
			},
			alertBtn: {
				type: String,
				default: '确定'
			},
			confimTitle: {
				type: String,
				default: '我是标题'
			},
			confimCon: {
				type: String,
				default: '你觉得my-ui好用吗你觉得my-ui好用吗你觉得my-ui好用吗你觉得my-ui好用吗？'
			},
			confimEnter: {
				type: String,
				default: '确定'
			},
			confimCancle: {
				type: String,
				default: '取消'
			},
			promptTitle: {
				type: String,
				default: '标题'
			},
			promptCon: {
				type: String,
				default: '请输入您对my-ui的评价'
			}
		},
		created() {
			var _this = this;
			this.$nextTick(function() {
				_this.currentDom = this.$refs.refContent;
				_this.toastType = this.$refs.refContent.dataset.type;
				if (_this.toastType == 'alert') {
					_this.currentDom.addEventListener('click', this.showAlert);
				} else if (_this.toastType == 'confim') {
					_this.currentDom.addEventListener('click', this.showConfim);
				} else {
					_this.currentDom.addEventListener('click', this.showPrompt);
				}
			});
		},
		methods: {
			// 弹出警告框
			showAlert() {
				this.model = true;
				this.toastAlert = true;
			},
			closeAlert() {
				this.model = false;
				this.toastAlert = false;
			},
			// 弹出确认框
			showConfim() {
				this.model = true;
				this.toastConfim = true;
			},
			enterAlert() {
				this.model = false;
				this.toastConfim = false;
				var _this = this;
				if (this.callBackFun) {
					this.callBackFun("yes")
				}
			},
			cancleAlert() {
				this.model = false;
				this.toastConfim = false;
				if (this.callBackFun) {
					this.callBackFun("no")
				}

			},
			// 弹出对话框
			showPrompt() {
				this.model = true;
				this.toastPrompt = true;
			},
			enterAlertPrompt() {
				this.model = false;
				this.toastPrompt = false;
				var _this = this;
				if (this.callBackFun) {
					this.callBackFun(this.message)
				}
			},
			cancleAlertPrompt() {
				this.model = false;
				this.toastPrompt = false;
				if (this.callBackFun) {
					this.callBackFun("")
				}
			},

		}
	};
</script>

<style></style>
