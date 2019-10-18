<template>
	<div class="my_search">
		<label for="" class="myFlex">
			<div class="inputBox">
				<slot><i :class="'fa fa-search' + icon"></i></slot>
				<input type="text" :placeholder="placeholder" v-model="value" @blur="getValue">
				<slot><i :class="'fa fa-close' + close" v-show="value != ''" @click="clearValue"></i></slot>
			</div>
			<slot>
				<div class="cancle">{{rightText}}</div>
			</slot>
		</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		props: {
			icon: {
				type: String,
				default: "fa-search"
			},
			close: {
				type: String,
				default: "fa-close"
			},
			placeholder: {
				type: String,
				default: "请搜索..."
			},
			rightText: {
				type: String,
				default: "搜索"
			}
		},
		methods: {
			getValue() {
				console.log(this.value)
			},
			clearValue() {
				this.value = ''
			}
		}
	}
</script>

<style>
</style>
