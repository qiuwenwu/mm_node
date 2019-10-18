<template>
	<div class="my_upload">
		<div class="upload" :style="{ width: width, height: height }">
			<i :class="'fa' + icon" :style="{ fontSize: fontSize }"></i>
			<img :src="imgSrc" alt="" />
			<input type="file" accept="image/*" @change="uploadImg" ref="refContent" />
			<my_loading message="最多只能上传4张图片" icon=" " v-show="imgLength > 5"></my_loading>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgLength: this.length,
				imgSrc: ''
			};
		},
		props: {
			width: {
				type: String,
				default: '5rem'
			},
			height: {
				type: String,
				default: '5rem'
			},
			icon: {
				type: String,
				default: 'fa-plus'
			},
			fontSize: {
				type: String,
				default: '1rem'
			},
			length: {
				type: Number,
				default: 4
			}
		},
		methods: {
			uploadImg() {
				var inputDom = this.$refs.refContent;
				if (inputDom.files.length > 0) {
					var file = inputDom.files[0];
					console.log(file)
					// var length = this.imgLength + this.file.length;
					// for(var i= 0;i<this.file.length ;i++){
					//   var size = Math.floor(this.file[i].size / 1024);
					//   if(size > 5 *1024* 1024){
					//     alert(请上传小于5M的图片);
					//     return false;
					//   }
					// }
					this.imgSrc = this.getObjectURL(file)
				}

			},
			getObjectURL(file) {
				var url = null;
				if (window.createObjectURL != undefined) {
					// basic
					url = window.createObjectURL(file);
				} else if (window.URL != undefined) {
					// mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if (window.webkitURL != undefined) {
					// webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			}
		}
	};
</script>

<style></style>
