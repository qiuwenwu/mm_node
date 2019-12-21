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
				query: {
					${id}: 0
				},
				obj: ${obj},
				vm: ${vm}
			}
		},
		methods: {
			next() {
				var query = this.query;
				var id = query.id;
				if (id > 2) {
					query.id -= 1;
					this.$router.push(this.toUrl(query, this.url_get_obj));
					window.scrollTo(0, 0);
				}
			},
			last() {
				var query = this.query;
				var id = query.id;
				query.id += 1;
				$.push(this.toUrl(query, this.url_get_obj));
				window.scrollTo(0, 0);
			},
			get_obj_after(json, status) {
				if (json.default) {
					var list = json.default.list;
					if (list.length === 0) {
						this.$router.push('/404');
						return {};
					} else {
						return list[0];
					}
				}
			}
		}
	}
</script>

<style>
	/* ${style} */
</style>
