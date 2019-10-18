<template>
	<div class="my_input">
		<input :type="type" placeholder="请输入..." :name="name" v-model="inputValue" :value="inputValue" :id="id" :checked="checked"
		 :style="{ width: width, backgroundColor: backgroundColor, color: color }" />
		<!-- <i
      :class="'fa' + icon"
      :style="{'position':position,'left':iconWidth,'top':top,'transform':transform}"
    ></i> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: this.value,
				iconWidth: this.width + Number(this.left) + 'rem'
			};
		},
		// props的优先级 > data中的优先级 > menthods中的优先级
		props: {
			type: {
				type: String,
				default: 'text'
			},
			name: {
				type: String,
				default: 'name'
			},
			value: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: 'name'
			},
			width: {
				type: String,
				default: '100%'
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#333'
			},
			checked: {
				type: Boolean,
				default: true
			},
			icon: {
				type: String,
				default: 'fa-close'
			},
			position: {
				type: String,
				default: 'absolute'
			},
			top: {
				type: String,
				default: '50%'
			},
			transform: {
				type: String,
				default: 'translateY(-50%)'
			},
			left: {
				type: String,
				default: '100'
			}
		}
	};
</script>

<style></style>
