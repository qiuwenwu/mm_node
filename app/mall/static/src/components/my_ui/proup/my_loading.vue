<template>
	<div class="my_loading">
		<i :class="'fa' + icon" v-show="icon !== ''"></i>
		<p>{{ message }}</p>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				toastModel: false
			};
		},
		props: {
			message: {
				type: String,
				default: '加载中..'
			},
			icon: {
				type: String,
				default: ''
			}
		},
		methods: {
			showToast() {
				this.toastModel = true;
				var _this = this;
				setInterval(function() {
					_this.toastModel = false;
				}, 5000);
			}
		}
	};
</script>

<style scoped>
	.my_loading .fa {
		animation: loading 2s infinite linear;
	}

	@keyframes loading {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	[data-component-active="true"] {
		box-shadow: none !important
	}

	.my_loading {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		box-shadow: none !important;
	}
</style>
