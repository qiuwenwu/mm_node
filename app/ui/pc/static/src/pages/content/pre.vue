<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">源代码<span>&lt; 返回</span></div>
				</mm_div>
				
				<div class="h5">按钮颜色——带背景</div>
				<mm_div class="">
					<mm_pre>
						<code class="javascript">
							var date = new Date(); <br>
							export default {
								template: __template__,
								components: {
									mm_pre
								}
							}
						</code>
					</mm_pre>
				</mm_div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	// import vs from '/highlight/styles/vs.css';

	import mm_pre from '/src/components/content/mm_pre.vue';
	
	export default {
		template: __template__,
		components: {
			mm_pre
		}
	}
</script>

<style>
</style>
