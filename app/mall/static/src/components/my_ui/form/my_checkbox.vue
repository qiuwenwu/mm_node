<template>
	<div class="my_checkbox">
		<label>
			<input :type="type" :checked="checked" :style="{ width: width, height: height }" @change="$emit('change', $event.target.checked)" />
			<span>{{ label }}</span>
		</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		model: {
			prop: 'checked',
			event: 'change'
		},
		props: {
			checked: Boolean,
			type: {
				type: String,
				default: 'checkbox'
			},
			label: {
				type: String,
				default: '健身'
			},
			width: {
				type: String,
				default: '1.5rem'
			},
			height: {
				type: String,
				default: '1.5rem'
			}
		}
	};
</script>

<style></style>
