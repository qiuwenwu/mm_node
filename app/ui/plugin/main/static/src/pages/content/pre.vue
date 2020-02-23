<template>
	<mm_page id="page_pre">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>源代码</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_view>
						<h5>带复制</h5>
						<mm_pre :code="code">
							<code class="javascript"></code>
						</mm_pre>
					</mm_view>

					<mm_view>
						<h5>不带复制</h5>
						<mm_pre>
							<code class="typescript">
								{{ code }}
							</code>
						</mm_pre>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
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
