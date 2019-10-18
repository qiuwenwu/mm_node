<template>
	<li class="my_footer_item">
		<router-link :to="{ path: path}">
			<slot><img :src="src" alt="" @click.stop="changeItem" /></slot>
		</router-link>
	</li>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			label: {
				type: String,
				default: '首页'
			},
			icon: {
				type: String,
				default: 'fa-home'
			},
			src: {
				type: String,
				default: ''
			},
			path: {
				type: String,
				default: ''
			}
		},
		mounted() {},
		methods: {
			changeItem(e) {
				this.$emit('changeItem', e);
			}
		}
	};
</script>

<style></style>
