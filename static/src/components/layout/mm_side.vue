<template>
	<div class="mm_side" :id="side_id">
		<slot></slot>
		<div class="line"></div>
	</div>
</template>

<script>
	function bindResize(tag, target, func) {
		var width_init = $(target).width();
		var el = $(tag);

		//鼠标的 X 和 Y 轴坐标 
		var x = 0;
		var y = 0;
		//邪恶的食指 
		el.mousedown(function(e) {
			//按下元素后，计算当前鼠标与对象计算后的坐标 
			x = e.clientX - el.offset().left;
			//在支持 setCapture 做些东东 
			el.setCapture ? (
				//捕捉焦点 
				el.setCapture(),
				//设置事件 
				el.onmousemove = function(ev) {
					mouseMove(ev || event)
				},
				el.onmouseup = mouseUp
			) : (
				//绑定事件 
				$(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
			)
			//防止默认事件发生 
			e.preventDefault()
		});
		//移动事件 
		function mouseMove(e) {
			var width = e.clientX - x;
			if (width >= width_init) {
				$(target).width(width + 'px');
				if(func){
					func(width);
				}
			}
		}
		//停止事件 
		function mouseUp() {
			//在支持 releaseCapture 做些东东 
			el.releaseCapture ? (
				//释放焦点 
				el.releaseCapture(),
				//移除事件 
				el.onmousemove = el.onmouseup = null
			) : (
				//卸载事件 
				$(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
			)
		}
	}
	export default {
		props: {
			id: {
				type: String,
				default: ""
			},
			func: {
				type: Function,
				default: function(width) {}
			}
		},
		data() {
			var id = this.id;
			if (!id) {
				id = "mm_side" + parseInt(Math.random() * 1000 + 1, 10);
			}
			return {
				side_id: id
			}
		},
		mounted() {
			//绑定需要拖拽改变大小的元素对象 
			var target = '#' + this.id;
			bindResize(target + ' .line', target, this.func);
		}
	}
</script>

<style>
</style>
