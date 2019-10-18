<template>
	<mm_page id="${name}">
		${template}
	</mm_page>
</template>

<script>
	import mixin from 'mm_page';

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_obj: "${url_get_obj}",
				url_submit: "${url_submit}",
				query: {
					${id}: 0
				},
				form: ${form},
				vm: ${vm}
			}
		},
		methods: {
			get_obj_after(json, status) {
				if (json.default) {
					$.push(this.form, json.default.obj);
					return {};
				}
			},
			submit_check(param) {
				$.check();
			}
		}
	}
</script>

<style>
	${style}
</style>
