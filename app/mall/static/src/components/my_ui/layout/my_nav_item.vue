<template>
	<li class="my_nav_item">
		<my_icon>
			<slot><i :class="'fa' + icon"></i></slot>
		</my_icon>
		<div class="title">
			<slot>{{label}}</slot>
		</div>
		<div class="number">
			<slot>{{number}}</slot>
		</div>
	</li>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			icon: {
				type: String,
				default: 'fa-fast-backward'
			},
			label: {
				type: String,
				default: '文章'
			},
			number: {
				type: Number,
				default: 10
			}
		},
		methods: {
			// change(){
			//   var num = (this.$attrs.value).replace(/[^0-9]/ig,"");
			//   console.log(num)
			// }
		}
	}
</script>

<style scoped>
</style>
