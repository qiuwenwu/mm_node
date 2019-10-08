<template>
	<!-- 文章列表 -->
	<mm_list col="1" class="mm_list_video">
		<mm_item v-for="(o, k) in list" :key="k" @click.native="click_fun(o)">
			<mm_side v-if="o[vm.icon]">
				<mm_icon :src="o[vm.icon]"></mm_icon>
			</mm_side>
			<mm_main>
				<div class="mm_title">{{ o[vm.title] }}</div>
				<mm_desc>
					<div class="collect" v-if="o.users && o.users.length > 0"><span class="fa fa-heart" v-bind:class="{ 'font_default': has_collect(o.users) }"></span><span>{{ o[vm.collect] }}</span></div>
				</mm_desc>
			</mm_main>
		</mm_item>
	</mm_list>
</template>

<script>
	import mixin from '/src/mixins/list'

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
	.mm_list_video .mm_main {
		padding: 0.625rem 0;
	}

	.mm_list_video .mm_side {
		width: 100%;
		padding: 0;
	}

	.mm_list_video .mm_main {
		width: calc(100% - 0.875rem);
		overflow: hidden;
		border: none;
	}

	.mm_list_video .mm_title {
		max-height: 3rem;
		line-height: 1.5rem;
		overflow: hidden;
		width: calc(100% - 4rem);
		text-overflow: ellipsis;
	}

	.mm_list_video .mm_icon {
		width: 100%;
		height: 10rem;
	}

	.mm_list_video .mm_item {
		background: #fff;
		margin-left: 2rem;
		margin-right: 2rem;
		border-radius: 0.325rem;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.mm_list_video .mm_desc {
		line-height: 1.5;
	}

	.mm_list_video .collect {
		position: absolute;
		right: 0.875rem;
		bottom: 0.625rem;
		text-align: right;
	}
</style>
