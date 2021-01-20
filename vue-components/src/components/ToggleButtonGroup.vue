<template>
	<span class="wikit wikit-ToggleButtonGroup">
		<slot />
	</span>
</template>

<script lang="ts">
import Vue from 'vue';

export interface ToggleButtonGroupInjection {
	groupValue: ( () => string ) | null;
	toggleListener: ( ( value: string ) => void ) | null;
}

export default Vue.extend( {
	name: 'ToggleButtonGroup',
	provide(): ToggleButtonGroupInjection {
		return {
			groupValue: (): string => this.value,
			toggleListener: ( event: string ): void => {
				this.$emit( 'input', event );
			},
		};
	},
	props: {
		value: {
			required: true,
			type: String,
		},
	},
} );
</script>
