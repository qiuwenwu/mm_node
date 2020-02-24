<template>
	<main id="root_index">
		<mm_grid>
			<mm_col width="100">
				<mm_view>
					<header class="arrow">
						<span class="h5">超级美眉</span>
					</header>
					<div class="tencent_desc">

					</div>
				</mm_view>
			</mm_col>
		</mm_grid>
	</main>
</template>

<script>
	import Vue from 'Vue';

	export default {
		data: function() {
			return {
				web: this.$store.state.web
			}
		}
	};
</script>

<style>
	#root_index .tencent_desc {
		min-height: calc(100vh - 9.25rem);
	}
</style>
