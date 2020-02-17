<template>
	<mm_list id="nav_main" col="1">
		<mm_item v-for="(o, idx) in nav.main" :key="idx" :url="o.sub.length > 0 ? '' : o.url" :class="{'active': select == idx }">
			<div class="btn" @click="select = idx">
				<mm_icon :src="o.icon" v-if="o.icon"></mm_icon>
				<span>{{ o.title }}</span>
			</div>
			<div class="box">
				<router-link v-for="(item, i) in o.sub" :key="i" :to="item.url" @click.native="set_tab(item)">
					<mm_icon :src="item.icon" v-if="item.icon"></mm_icon>
					<span>{{ show_title(item) }}</span>
				</router-link>
			</div>
		</mm_item>
	</mm_list>
</template>

<script>
	export default {
		data: function() {
			return {
				nav: this.$store.state.web.nav,
				select: 0
			}
		},
		methods: {
			set_tab(o) {
				var _this = this;
				var url = _this.url_now;
				setTimeout(function() {
					if (o.url === url) {
						_this.$store.commit('set_nav_cache', o)
					}
				}, 200)
			},
			show_title(o) {
				if (o.title) {
					return o.title;
				} else {
					return this.$lang(o.name);
				}
			}
		},
		computed: {
			url_now() {
				var query = this.$route.query
				if (query.length > 0) {
					return this.$route.path + "?" + $.toUrl(query);
				}
				return this.$route.path;
			}
		}
	}
</script>

<style>
	#nav_main .mm_item>.btn {
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	}

	#nav_main .btn {
		line-height: 2.5rem;
		padding: 0 1rem;
		color: #999;
	}

	#nav_main a {
		display: block;
		color: inherit;
		line-height: 2.5rem;
		padding: 0 2rem;
		position: relative;
	}

	#nav_main .btn {
		position: relative;
		overflow: hidden;
	}

	#nav_main .btn:after {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
		content: "";
		padding: 3px;
		display: block;
		border: solid #999;
		border-width: 0 1px 1px 0;
		transition: all 0.2s;
	}

	#nav_main .btn:hover {
		color: #fff;
		background: rgba(3, 4, 29, 0.1);
	}

	#nav_main .active .btn {
		color: #fff;
		background: rgb(49, 131, 246);
		background: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 0.5) 0%, rgba(102, 188, 244, 0.42) 39%, rgba(49, 166, 247, 0.42) 40%, rgba(49, 131, 246, 0.3) 100%);
		/* FF3.6-15 */
		background: -webkit-linear-gradient(-45deg, rgba(255, 255, 255, 0.5) 0%, rgba(102, 188, 244, 0.42) 39%, rgba(49, 166, 247, 0.42) 40%, rgba(49, 131, 246, 0.3) 100%);
		/* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(102, 188, 244, 0.42) 39%, rgba(49, 166, 247, 0.42) 40%, rgba(49, 131, 246, 0.3) 100%);
	}

	#nav_main .active .btn:after {
		transform: translateY(-50%) rotate(45deg);
		border-color: #fff;
	}

	#nav_main a:hover {
		color: #fff;
	}

	#nav_main .router-link-active {
		color: #3388ff;
	}

	#nav_main .btn:hover:before {
		content: "";
		display: block;
		width: 2px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		background: #38f;
	}

	#nav_main .box {
		overflow: hidden;
		max-height: 0;
		-webkit-transition: max-height 0.2s;
		transition: max-height 0.2s;
		background: rgba(0, 0, 0, 0.4);
		color: #999;
		border-bottom: 1px solid #fff;
		border-color: rgba(255, 255, 255, 0.1);
	}

	#nav_main .active .box {
		max-height: 80vh;
		padding: 0.5rem 0;
	}
</style>
