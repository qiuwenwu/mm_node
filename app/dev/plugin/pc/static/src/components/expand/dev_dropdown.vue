<template>
	<div class="dev_dropdown" :id="drop_id">
		<div class="state" @click="run">
			<mm_icon :src="obj.icon"></mm_icon>
			<div class="title" v-html="obj.title"></div>
			<div class="desc" v-html="obj.desc"></div>
			<i class="btn fa-sort-desc" v-if="display === '1'"></i>
		</div>
		<div class="dropdown-modal" v-show="show">
			<div class="warp" :style="'width:' + width">
				<slot></slot>
			</div>
			<div class="mask" @click="$emit('input', false)" v-if="$slots['default']"></div>
		</div>
	</div>
</template>

<script>
	export default {
		model: {
			prop: 'show',
			event: 'input' // 设置$emit通知，当为input时发起通知v-model
		},
		props: {
			id: {
				type: String,
				default: ""
			},
			width: {
				type: Number,
				default: 194
			},
			display: {
				type: String,
				default: "1"
			},
			obj: {
				type: Object,
				default: function() {
					return {
						title: "",
						desc: "",
						icon: ""
					};
				}
			},
			show: {
				type: Boolean,
				default: false
			},
			func: {
				type: Function,
				default: null
			}
		},
		data() {
			var drop_id = "";
			if (this.id) {
				drop_id = this.id;
			} else {
				drop_id = "drop_" + parseInt(Math.random() * 1000 + 1, 10);
			}

			return {
				drop_id: drop_id
			}
		},
		methods: {
			run() {
				if (this.func) {
					this.func(this.show);
				} else {
					this.$emit('input', !this.show);
				}
			}
		}
	}
</script>

<style>
	.dev_dropdown {
		position: relative;
		overflow-x: hidden;
	}

	.dev_dropdown .mask {
		width: 100%;
		height: 100%;
		z-index: 4;
	}

	.dev_dropdown .mm_icon {
		height: calc(4rem - 1px);
		line-height: 4rem;
		float: left;
		width: auto;
		min-width: 2.5rem;
		text-align: center;
	}

	.dev_dropdown .mm_icon img {
		width: 2rem;
		border-radius: 0.325rem;
	}

	.dev_dropdown .state {
		position: relative;
	}

	.dev_dropdown .state:before,
	.dev_dropdown .state:after {
		content: "";
		display: block;
		clear: both;
	}

	.dev_dropdown .title {
		padding-top: 0.75rem;
		font-size: 0.75rem;
		color: rgb(209, 213, 218);
	}

	.dev_dropdown .desc {
		font-size: 0.875rem;
		color: #fff;
	}

	.dev_dropdown .btn {
		position: absolute;
		top: 45%;
		right: 0.75rem;
		transform: translateY(-50%);
	}
</style>
