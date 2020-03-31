<template>
	<mm_page id="page_radio">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>单选框</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_view class="pc">
						<h5 @click="$copy(code_1)">样式一(PC)</h5>
						<mm_radio v-model="value" :options="options"></mm_radio>
					</mm_view>
					<mm_view class="mobile">
						<h5 @click="$copy(code_2)">样式二(mobile)</h5>
						<mm_radio v-model="value" :options="options"></mm_radio>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				options: [{
						name: "选项一",
						value: "1",
					},
					{
						name: "选项二",
						value: "2",
					},
					{
						name: "选项三",
						value: "3",
					}
				],
				code_1: `
<mm_view class="pc">
	<mm_radio v-model="value" :options="options"></mm_radio>
</mm_view>
`,
				code_2: `
<mm_view class="mobile">
	<mm_radio v-model="value" :options="options"></mm_radio>
</mm_view>
`
			}
		}
	}
</script>

<style>
</style>
