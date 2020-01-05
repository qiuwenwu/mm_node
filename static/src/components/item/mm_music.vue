<template>
	<!-- 文章 -->
	<div class="mm_video">
		<mm_icon :src="obj[vm.icon]"></mm_icon>
		<div class="title">{{ obj[vm.title] }}</div>
		<div class="desc">
			<div class="collect" v-if="obj.users && obj.users.length > 0"><span class="fa fa-heart" v-bind:class="{ 'font-default': has_collect(obj.users) }"></span><span>{{ obj[vm.collect] }}</span></div>
		</div>
	</div>
</template>

<script>
	import mixin from '/src/mixins/item.js'

	export default {
		mixins: [mixin],
		props: {
			uid: {
				type: Number,
				default: 0
			}
		},
		methods: {
			click_fun(o) {
				var u = obj[this.vm.url];
				if (this.func) {
					if (!this.func(o)) {
						return;
					}
				}
				if (u) {
					this.$nav(u);
				}
			},
			has_collect(arr) {
				if (arr) {
					if (this.uid && arr) {
						return arr.has(this.field, this.uid);
					}
				}
				return false;
			}
		}
	}
</script>

<style>
	.mm_video .mm_main {
		padding: 0.625rem 0;
	}

	.mm_video .mm_side {
		width: 100%;
		padding: 0;
	}

	.mm_video .mm_main {
		width: calc(100% - 0.875rem);
		overflow: hidden;
		border: none;
	}

	.mm_video .div {
		max-height: 3rem;
		line-height: 1.5rem;
		overflow: hidden;
		width: calc(100% - 4rem);
		text-overflow: ellipsis;
	}

	.mm_video .mm_icon {
		width: 100%;
		height: 10rem;
	}

	.mm_video .mm_item {
		background: #fff;
		margin-left: 2rem;
		margin-right: 2rem;
		border-radius: 0.325rem;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.mm_video .mm_desc {
		line-height: 1.5;
	}

	.mm_video .collect {
		position: absolute;
		right: 0.875rem;
		bottom: 0.625rem;
		text-align: right;
	}
</style>
