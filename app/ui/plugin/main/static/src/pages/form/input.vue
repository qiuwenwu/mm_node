<template>
	<mm_page id="page_input">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>输入框</span>
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
						<mm_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名"></mm_input>
						<mm_input title="年龄" type="number" :min="min" :max="max" :max_length="max_length" v-model="num"></mm_input>
						<mm_input title="密码" type="password" v-model="pass" desc="请输入密码"></mm_input>
						<mm_input title="余额" type="number" v-model="money" unit="元"></mm_input>
					</mm_view>

					<mm_view class="mobile">
						<h5 @click="$copy(code_2)">样式二(mobile)</h5>
						<mm_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名"></mm_input>
						<mm_input title="年龄" type="number" :min="min" :max="max" :max_length="max_length" v-model="num"></mm_input>
						<mm_input title="密码" type="password" v-model="pass" desc="请输入密码"></mm_input>
						<mm_input title="余额" type="number" v-model="money" unit="元"></mm_input>
					</mm_view>

					<mm_view class="mt pt">
						<div>姓名：{{ str }}</div>
						<div>年龄：{{ num }}</div>
						<div>密码：{{ pass }}</div>
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
				pass: "",
				str: "",
				num: 1,
				min: 1,
				max: 150,
				min_length: 2,
				max_length: 8,
				money: 0,
				code_1: `
<mm_view class="pc">
<mm_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名" unit="元"></mm_input>
</mm_view>
`,
				code_2: `
<mm_view class="mobile">
<mm_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名" unit="元"></mm_input>
</mm_view>
`
			}
		}
	}
</script>

<style>
</style>
