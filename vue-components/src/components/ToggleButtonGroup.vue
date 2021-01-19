<template>
	<span class="wikit">
		<slot
			:selectedItem="value"
			:listener="listener"
		>
			Add Buttons here
		</slot>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'ToggleButtonGroup',
	methods: {
		listener( event: string ): void {
			this.$emit( 'input', event );
		},
	},
	props: {
		value: {
			required: true,
			type: String,
		},
	},
} );
</script>
