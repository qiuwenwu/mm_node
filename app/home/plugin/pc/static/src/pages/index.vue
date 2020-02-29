<template>
	<div id="root_index">
		<mm_col>
			<mm_view>
				<mm_title>
					<span class="h5">超级美眉</span>
					<span class="arrow"></span>
				</mm_title>
				<div class="tencent_desc"></div>
			</mm_view>
		</mm_col>
	</div>
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
