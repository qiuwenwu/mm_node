<template>
	<mm_page id="page_group">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>组合框</span>
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
						<h5>输入框组合</h5>
						<mm_group>
							<input type="text" />
							<mm_btn>按钮</mm_btn>
						</mm_group>
						<br />
						<mm_group>
							<span>介绍</span>
							<input type="text" />
							<mm_btn>按钮</mm_btn>
						</mm_group>
						<br />
						<mm_group>
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
					</mm_view>

					<mm_view>
						<h5>按钮组合</h5>
						<mm_group>
							<mm_btn>按钮</mm_btn>
							<mm_btn>按钮</mm_btn>
						</mm_group>
						<br />
						<mm_group class=" b-a">
							<mm_btn class="btn_warning">取消</mm_btn>
							<mm_btn class="btn_success">确定</mm_btn>
						</mm_group>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
</script>

<style>
	#page_group .btn-3 .mm_group {
		margin-bottom: 1rem;
	}
</style>
