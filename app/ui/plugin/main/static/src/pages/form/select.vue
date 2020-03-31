<template>
	<mm_page id="page_btn">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>选择框</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid class="pb">
				<mm_col width="100">
					<mm_view class="pc">
						<h5 @click="$copy(code_1)">样式一 (原生)</h5>
						<mm_select v-model="value" :options="options"></mm_select>
					</mm_view>

					<mm_view class="pc">
						<h5 @click="$copy(code_2)">样式二 (鼠标经过 hover)</h5>
						<mm_select v-model="value" :options="options" type="hover"></mm_select>
					</mm_view>

					<mm_view class="pc">
						<h5 @click="$copy(code_3)">样式三 (获取焦点 focus)</h5>
						<mm_select v-model="value" :options="options" type="focus"></mm_select>
					</mm_view>

					<mm_view class="pc">
						<h5 @click="$copy(code_4)">样式四 (点击 click)</h5>
						<mm_select v-model="value" :options="options" type="click"></mm_select>
					</mm_view>

					<mm_view class="pc">
						<h5 @click="$copy(code_5)">样式五 (带图标)</h5>
						<mm_select v-model="value" :options="options" type="click" class="select_diy">
							<mm_icon src="/img/avatar.png"></mm_icon>
						</mm_select>
					</mm_view>

					<mm_view>
						{{ value }}
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
				value: "3",
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
<mm_select v-model="value" :options="options"></mm_select>
`,
				code_2: `
<mm_select v-model="value" :options="options" type="hover"></mm_select>
`,
				code_3: `
<mm_select v-model="value" :options="options" type="focus"></mm_select>
`,
				code_4: `
<mm_select v-model="value" :options="options" type="click"></mm_select>
`,
				code_5: `
<mm_select v-model="value" :options="options" type="click" class="select_diy">
	<mm_icon src="/img/avatar.png"></mm_icon>
</mm_select>
`
			}
		}
	}
</script>

<style>
	.select_diy img {
		width: 2rem;
	}
</style>
