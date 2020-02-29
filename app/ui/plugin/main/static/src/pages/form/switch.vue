<template>
	<mm_page id="page_btn">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>开关</span>
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
						<h5>样式一（PC）</h5>
						<mm_switch title="开关" v-model="value"></mm_switch>
					</mm_view>

					<mm_view class="pc">
						<h5>样式二（PC）</h5>
						<mm_switch title="开关" v-model="value" display="false"></mm_switch>
					</mm_view>

					<mm_view class="mobile">
						<h5>样式三（mobile）</h5>
						<mm_switch title="开关" v-model="value"></mm_switch>
					</mm_view>

					<mm_view class="mobile">
						<h5>样式四（mobile）</h5>
						<mm_switch title="开关" v-model="value" display="false"></mm_switch>
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
				value: 1
			}
		}
	}
</script>

<style>
</style>
