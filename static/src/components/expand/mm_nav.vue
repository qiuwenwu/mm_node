<template>
	<ul class="mm_nav">
		<li v-for="(o, index) in list" :key="index">
			<a :href="o.url" v-if="o.url.indexOf('http:') === 0 || o.url.indexOf('https:') === 0">
			{{ o.title }}
			<span class="message" v-show="o.message > 0">{{ o.message }}</span></a>
			<router-link :to="o.url" v-else>
			{{ o.title }}
			<span class="message" v-show="o.message > 0">{{ o.message }}</span>
			</router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			// 视图模型
			vm: {
				type: Object,
				default: function() {
					return {
						// 图标
						icon: 'icon',
						// 标题
						title: 'title',
						// 描述
						desc: 'desc',
						// 链接
						url: 'url',
						// 名称
						name: 'name',
						// 提示
						tip: 'tip',
					}
				}
			}
		}
	}
</script>

<style>
</style>
