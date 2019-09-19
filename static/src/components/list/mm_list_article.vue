<template>
	<!-- 文章列表 -->
	<mm_list col="1" class="mm_list_article">
		<mm_item v-for="(o, k) in list" :key="k" @click.native="click_fun(o)">
			<mm_side v-if="o[vm.icon]">
				<mm_icon :src="o[vm.icon]"></mm_icon>
			</mm_side>
			<mm_main>
				<mm_title>{{ o[vm.title] }}</mm_title>
				<mm_desc>{{ o[vm.desc] }}
					<span class="time">{{ $toTime(o.createTime, 'yyyy-MM-dd') }}</span>
					<div class="collect" v-if="o.users && show"><span class="fa fa-heart" v-bind:class="{ 'font_default': has_collect(o.users) }"></span><span>{{ o[vm.collect] }}</span></div>
					<span v-if="o.top" class="top">推荐</span>
				</mm_desc>
			</mm_main>
		</mm_item>
	</mm_list>
</template>

<script>
	import mixin from '@/mixins/list'

	export default {
		mixins: [mixin],
		props: {
			uid: {
				type: Number,
				default: 0
			},
			show: {
				type: Boolean,
				default: true
			},
			field: {
				type: String,
				default: "id"
			}
		},
		methods: {
			click_fun(o) {
				var u = o[this.vm.url];
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
	.mm_list_article .top {
		display: inline-block;
		position: absolute;
		bottom: 0.15rem;
		right: 1rem;
		font-size: 0.625rem;
		border: 1px solid #ff5a6a;
		padding: 0.1rem 0.25rem 0 0.25rem;
		border-radius: 0.25rem;
		color: #ff5a6a;
	}

	.mm_list_article .mm_side {
		float: right;
	}

	.mm_list_article .mm_main {
		width: calc(100% - 6.75rem);
		height: 6.25rem;
		padding-top: 0.625rem;
		padding-right: 1.5rem;
		border: none;
	}

	.mm_list_article .mm_title {
		max-height: 3rem;
		line-height: 1.5rem;
		overflow-y: hidden;
	}

	.mm_list_article .mm_icon {
		width: 5rem;
		height: 5rem;
		border-radius: 0.325rem;
	}

	.mm_list_article .mm_item {
		background: #fff;
		margin-left: 2rem;
		margin-right: 2rem;
		border-radius: 0.325rem;
		margin-bottom: 1rem;
	}

	.mm_list_article .mm_desc {
		width: 100%;
		line-height: 1.5;
		position: absolute;
		bottom: 0.625rem;
		left: 0rem;
	}

	.mm_list_article .time {
		float: left;
		margin-right: 1.25rem;
	}
</style>
