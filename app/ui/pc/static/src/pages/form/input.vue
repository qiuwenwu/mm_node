<template>
	<mm_page class="page_input">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">输入框<span>&lt; 返回</span></div>
				</mm_div>

				<div class="h5">样式一(PC)</div>
				<mm_div class="pc">
					<mm_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名"></mm_input>
					<mm_input title="年龄" type="number" :min="min" :max="max" :max_length="max_length" v-model="num"></mm_input>
					<mm_input title="密码" type="password" v-model="pass" desc="请输入密码"></mm_input>
					<mm_input title="余额" type="number" v-model="money" unit="元"></mm_input>
				</mm_div>

				<div class="h5">样式二(mobile)</div>
				<mm_div class="mobile">
					<mm_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名"></mm_input>
					<mm_input title="年龄" type="number" :min="min" :max="max" :max_length="max_length" v-model="num"></mm_input>
					<mm_input title="密码" type="password" v-model="pass" desc="请输入密码"></mm_input>
					<mm_input title="余额" type="number" v-model="money" unit="元"></mm_input>
				</mm_div>
				
				<mm_div class="mt pt">
					<div>姓名：{{ str }}</div>
					<div>年龄：{{ num }}</div>
					<div>密码：{{ pass }}</div>
				</mm_div>
			</mm_warp>
		</mm_body>
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
				money: 0
			}
		}
	}
</script>

<style>
</style>
