<template>
	<div class="my_table">
		<div class="my_thead">
			<slot></slot>
		</div>
		<div class="my_tbody">
			<slot>
				<tr>
					<th>
					<td></td>
					</th>
				</tr>
			</slot>
		</div>
		<div class="my_tfoot">
			<slot></slot>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>
