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
<style lang="scss">
.wikit-ToggleButtonGroup {
	:not(:last-child) {
		border-inline-end: none;
		border-start-end-radius: 0;
		border-end-end-radius: 0;
	}

	:not(:first-child) {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
	}

	:not(:first-child) {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
	}

	:disabled {
		border-block: none;
	}

	:focus {
		outline: none;
	}

	:not(:first-child):disabled {
		border-inline-start-color: $color-base-100;
	}
}

</style>
