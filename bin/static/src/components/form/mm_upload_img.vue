<template>
	<!-- 图片上传器 -->
	<div class="mm_upload_img" @click="choose()" v-bind:class="{ 'upload_add': !bg && !value }">
		<mm_icon :src="value" :style="'width:' + width + other"></mm_icon>
		<slot></slot>
		<input type="file" hidden @change="addImg" :id="name" accept="image/*"/>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},
			value: {
				type: String,
				default: ''
			},
			// 显示方式
			display: {
				type: String,
				default: '1'
			},
			// 显示隐藏
			show: {
				type: Boolean,
				default: false
			},
			func: {
				type: Function,
				default: function(obj) {}
			},
			width: {
				type: String,
				default: '5rem'
			},
			height: {
				type: String,
				default: ''
			},
			bg: {
				type: String,
				default: ''
			}
		},
		data(){
			var other = this.bg ? '; background: url(' + this.bg + ') center center no-repeat; background-size:100%' : '';
			if(this.height){
				other += ';height:' + this.height
			}
			return {
				other
			}
		},
		methods: {
			choose() {
				this.$('.mm_upload_img #' + this.name).click();
			},
			addImg(e) {
				var _this = this;
				var src, url = window.URL || window.webkitURL || window.mozURL,
					files = e.target.files;
				if (files.length > 0) {
					var file = files[0];
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						src = this.result;
						_this.$emit('input', src);
						if (_this.func) {
							_this.func(src, file);
						}
					}
				}
			}
		}
	};
</script>

<style>
	.mm_upload_img {
		text-align: center;
	}
	.mm_upload_img .mm_btn {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>