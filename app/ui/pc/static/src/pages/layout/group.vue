<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_div url="/">
					<div class="h3">组合框<span>&lt; 返回</span></div>
				</mm_div>

				<div class="h5">输入框组合</div>
				<mm_div class="">
					<mm_group class="ba">
						<input type="text" />
						<mm_btn>按钮</mm_btn>
					</mm_group>
					<br />
					<mm_group class="ba">
						<span>介绍</span>
						<input type="text" />
						<mm_btn>按钮</mm_btn>
					</mm_group>
					<br />
					<mm_group class="ba">
						<select class="title">
							<optgroup label="分组一">
								<option>选项1</option>
								<option>选项2</option>
								<option>选项3</option>
							</optgroup>
							<optgroup label="分组二">
								<option>选项4</option>
								<option>选项5</option>
								<option>选项6</option>
							</optgroup>
						</select>
						<input type="text" />
						<mm_btn>按钮</mm_btn>
					</mm_group>
				</mm_div>

				<div class="h5">按钮组合</div>
				<mm_div class="">
					<mm_group class="ba">
						<mm_btn>按钮</mm_btn>
						<mm_btn>按钮</mm_btn>
					</mm_group>
					<br />
					<mm_group class="ba b-a">
						<mm_btn type="warning">取消</mm_btn>
						<mm_btn type="success">确定</mm_btn>
					</mm_group>
				</mm_div>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
</script>

<style>
	.btn_3 .mm_group {
		margin-bottom: 1rem;
	}
</style>
