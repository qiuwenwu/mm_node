<template>
	<div class="page_cmd" id="cmd_index">
		<div class="plugin_window">
			<mm_grid col="1">
				<mm_col>
					<div class="log">
						<div class="h5"><i class="fa-sticky-note"></i>命令提示符</div>
						<mm_pre id="cmd_code" :code="code" @keyup.enter.native="keyup" :edit="true"></mm_pre>
					</div>
				</mm_col>
				<mm_col>
					<textarea></textarea>
				</mm_col>
			</mm_grid>
		</div>
	</div>
</template>

<script>
	import mm_pre from '/src/components/content/mm_pre.vue';
	export default {
		template: __template__,
		components: {
			mm_pre
		},
		data: function() {
			return {
				code: "欢迎使用 超级美眉\r\n"
			}
		},
		methods: {
			send(cmd) {

			},
			keyup(e) {
				var arr = $('#cmd_code').children("div");
				var cmd = arr.eq(arr.length - 2).text();
				var tag = arr.eq(arr.length - 1);
				tag.text(' > ');
				// $('#cmd_code').blur();
				this.send(cmd);
			}
		}
	};
</script>

<style>
	#cmd_index .hljs li:before {
		content: ">";
	}

	#cmd_index .plugin_window {
		margin: auto;
		max-width: 50rem;
		margin-top: 3rem;
	}

	#cmd_index .plugin_window .log {
		width: 100%;
		
		border: 1px solid #DBDBDB;
		overflow-x: hidden;
		overflow-y: auto;
	}

	#cmd_index #cmd_code {
		height: 32rem;
	}

	#cmd_index #cmd_code code {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	#cmd_index .plugin_window .h5 {
		padding: 0.25rem 0.5rem;
		border-bottom: 1px solid #DBDBDB;
	}

	#cmd_index .plugin_window .log i {
		margin-right: 0.5rem;
	}

	#cmd_index .plugin_window textarea {
		width: 100%;
		max-width: 50rem;
		min-height: 8rem;
		padding: 0.5rem;
	}
</style>
