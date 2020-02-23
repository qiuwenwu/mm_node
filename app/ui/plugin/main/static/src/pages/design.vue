<template>
	<!-- 文章 -->
	<mm_page id="page_design">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>设计规范</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid col="3" class="grid_min-1">
				<mm_col>
					<mm_view>
						<h5>字体大小</h5>
						<table>
							<tr>
								<td>
									<h1><span>标题一</span></h1>
								</td>
								<td><span class="unit">1.75rem</span></td>
							</tr>
							<tr>
								<td>
									<h2><span>标题二</span></h2>
								</td>
								<td><span class="unit">1.5rem</span></td>
							</tr>
							<tr>
								<td>
									<h3><span>标题三</span></h3>
								</td>
								<td><span class="unit">1.25rem</span></td>
							</tr>
							<tr>
								<td>
									<h4><span>标题四</span></h4>
								</td>
								<td><span class="unit">1.125rem</span></td>
							</tr>
							<tr>
								<td>
									<h5><span>标题五</span></h5>
								</td>
								<td><span class="unit">1rem</span></td>
							</tr>
							<tr>
								<td>
									<h6><span>标题六</span></h6>
								</td>
								<td><span class="unit">0.875rem</span></td>
							</tr>
							<tr>
								<td>
									<p><span>正文</span></p>
								</td>
								<td><span class="unit">1rem</span></td>
							</tr>
							<tr>
								<td>
									<p><span class="font-small">正文小</span></p>
								</td>
								<td><span class="unit">0.75rem</span></td>
							</tr>
						</table>
					</mm_view>
				</mm_col>
				<mm_col>
					<mm_view>
						<h5>图标大小</h5>
						<table>
							<tr>
								<td>
									<img src="/img/logo.png" class="img-1" />
								</td>
								<td><span class="unit">4rem</span></td>
							</tr>
							<tr>
								<td>
									<img src="/img/logo.png" class="img-2" />
								</td>
								<td><span class="unit">3rem</span></td>
							</tr>
							<tr>
								<td>
									<img src="/img/logo.png" class="img-3" />
								</td>
								<td><span class="unit">2rem</span></td>
							</tr>
							<tr>
								<td>
									<img src="/img/logo.png" class="img-4" />
								</td>
								<td><span class="unit">1.5rem</span></td>
							</tr>
							<tr>
								<td>
									<img src="/img/logo.png" class="img-5" />
								</td>
								<td><span class="unit">1.25rem</span></td>
							</tr>
						</table>
					</mm_view>
				</mm_col>
				<mm_col>
					<mm_view>
						<h5>字体颜色</h5>
						<table>
							<tr>
								<td>
									<span class="font_primary">主要</span>
								</td>
								<td><span class="unit font_primary">#38f</span></td>
							</tr>
							<tr>
								<td>
									<span class="font_info">信息</span>
								</td>
								<td><span class="unit font_info">#26d2ff</span></td>
							</tr>
							<tr>
								<td>
									<span class="font_warning">错误</span>
								</td>
								<td><span class="unit font_warning">#f12f04</span></td>
							</tr>
							<tr>
								<td>
									<span class="font_danger">警告</span>
								</td>
								<td><span class="unit font_danger">#ff9000</span></td>
							</tr>
							<tr>
								<td>
									<span class="font_success">成功</span>
								</td>
								<td><span class="unit font_success">#44b549</span></td>
							</tr>
							<tr>
								<td>
									<span class="title">标题</span>
								</td>
								<td><span class="unit title">#333</span></td>
							</tr>
							<tr>
								<td>
									<span class="desc">描述</span>
								</td>
								<td><span class="unit desc">#666</span></td>
							</tr>
							<tr>
								<td>
									<span class="note">注释</span>
								</td>
								<td><span class="unit note">#999</span></td>
							</tr>
						</table>
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
				list: [{
					title: "",

				}]
			}
		}
	}
</script>

<style>
	#page_design .mm_col {
		min-width: 18rem;
	}
	#page_design .mm_view>h5 {
		margin-bottom: 1rem;
	}

	#page_design table {
		width: 100%;
	}

	#page_design table tr td:last-child {
		text-align: right;
		color: #999;
		font-size: 1rem;
		width: 6rem;
	}

	#page_design .font_color td {
		height: 2rem;
		line-height: 2rem;
	}
</style>
