<template>
	<div id="admin_side">
		<slot></slot>
		<div id="line"></div>
	</div>
</template>

<script>
	import $ from 'jquery';

	function bindResize(tag, target) {
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
		template: __template__,
		mounted() {
			//绑定需要拖拽改变大小的元素对象 
			bindResize('#line', '#admin_side');
		}
	}
</script>

<style>
	#admin_side {
		position: relative;
		width: 15rem;
		height: calc(100vh - 3.75rem);
		overflow: hidden;
		float: left;
		z-index: 2;
	}

	#admin_side #line {
		position: absolute;
		top: 4rem;
		right: 0;
		width: 3px;
		background: #f6f8fa;
		border-right: 1px solid #e1e4e8;
		height: 100%;
	}

	#admin_side #line:hover {
		cursor: w-resize;
	}
	
	#admin_side .dev_head>div { width: 100%; }
</style>
