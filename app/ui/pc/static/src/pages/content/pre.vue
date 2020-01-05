<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">源代码<span>&lt; 返回</span></div>
				</mm_view>

				<div class="h5">带复制</div>
				<mm_view class="">
					<mm_pre :code="code">
						<code class="javascript"></code>
					</mm_pre>
				</mm_view>

				<div class="h5">不带复制</div>
				<mm_view class="">
					<mm_pre>
						<code class="typescript">
							{{ code }}
						</code>
					</mm_pre>
				</mm_view>
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
		},
		data() {
			return {
				code: `
var date = new Date();
export default {
template: __template__,
	components: {
		mm_pre
	}
}`
			}
		}
	}
</script>

<style>
</style>
