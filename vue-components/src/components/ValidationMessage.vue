<template>
	<div :class="[ 'wikit', 'wikit-ValidationMessage', `wikit-ValidationMessage--${type}` ]">
		<Icon
			class="wikit-ValidationMessage__icon"
			:type="type === 'error' ? 'error' : 'alert'"
			:color="type"
			size="medium"
		/>
		{{ message }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

/**
 * This is an internal component which is intended to be shared between system components that contain a feedback
 * message element, e.g. for displaying validation errors.
 *
 * Uses the following components internally: Icon
 */
export default defineComponent( {
	name: 'ValidationMessage',
	props: {
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			validator( value: string ): boolean {
				return [ 'warning', 'error' ].includes( value );
			},
		},
	},

	components: {
		Icon,
	},

	compatConfig: {
		MODE: 3,
	},
} );
</script>

<style lang="scss">
.wikit-ValidationMessage {
	font-family: $wikit-ValidationMessage-font-family;
	font-size: $wikit-ValidationMessage-font-size;
	font-weight: $wikit-ValidationMessage-font-weight;
	line-height: $wikit-ValidationMessage-line-height;
	padding-block-start: $wikit-ValidationMessage-padding-block-start;
	display: inline-flex;
	align-items: flex-start;

	&--error {
		color: $wikit-ValidationMessage-error-color;
	}

	&--warning {
		color: $wikit-ValidationMessage-warning-color;
	}

	&__icon {
		//TODO: only introducing the following variable to work around exceeding stylelint max-len.
		//`stylelint-disable` is also not working for some reason. Fixing this in a follow-up.
		$padding-top: ( $wikit-ValidationMessage-line-height - $wikit-ValidationMessage-font-size ) / 2;
		padding-block-start: $padding-top;
		margin-inline-end: $wikit-ValidationMessage-icon-margin-right;
	}
}
</style>
