<template>
	<mm_page class="page_btn">
		<mm_body>
			<mm_warp>
				<mm_view url="/">
					<div class="h3">表格<span>&lt; 返回</span></div>
				</mm_view>

				<mm_view>
					<mm_btn type="info" @click.native="small = !small">切换大小</mm_btn>
					<mm_btn type="info" @click.native="set_color()">反色</mm_btn>
				</mm_view>

				<div class="h5">样式一</div>
				<mm_view class="">

					<mm_table :type="type" class="table-hover" :class="{'table-sm': small }">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
							</tr>
						</tbody>
					</mm_table>
				</mm_view>

				<div class="h5">样式二</div>
				<mm_view class="">
					<mm_table :type="type" class="table-striped table-hover" :class="{'table-sm': small }">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
							</tr>
						</tbody>
					</mm_table>
				</mm_view>

				<div class="h5">样式三</div>
				<mm_view class="">
					<mm_table :type="type" class="table-bordered table-hover" :class="{'table-sm': small }">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
							</tr>
						</tbody>
					</mm_table>
				</mm_view>

				<div class="h5">样式四</div>
				<mm_view class="">
					<mm_table :type="type" class="table-bordered table-striped table-hover" :class="{'table-sm': small }">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Handle</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
							</tr>
						</tbody>
					</mm_table>
				</mm_view>
			</mm_warp>
		</mm_body>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				small: false,
				type: ""
			}
		},
		methods: {
			set_color() {
				this.type = this.type ? '' : 'dark'
			}
		}
	}
</script>

<style>
</style>
