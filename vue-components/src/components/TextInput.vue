<template>
	<label :class="classes">
		<div class="wikit-TextInput__label">{{ label }}</div>
		<Input
			:value="value"
			@input.native="emitInputEvent"
			:feedback-type="feedbackType"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<div class="wikit-TextInput__error-message" v-if="error">
			<Icon
				class="wikit-TextInput__error-message__icon"
				:type="error.type === 'error' ? 'error' : 'alert'"
				:color="error.type"
				size="medium"
			/>
			{{ error.message }}
		</div>
	</label>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from './Icon.vue';
import Input from './Input.vue';

/**
 * Text input fields are form elements that let users input and edit values in the form of text.
 *
 * Uses the following components internally: Input, Icon
 */
export default Vue.extend( {
	name: 'TextInput',
	props: {
		error: {
			type: Object,
			validator( error: { type?: string; message?: string } ): boolean {
				return error === null ||
					typeof error.message === 'string' &&
					typeof error.type === 'string' &&
					[ 'warning', 'error' ].includes( error.type );
			},
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
		width: {
			type: String,
			validator( value: string ): boolean {
				return [ 'small', 'medium', 'large', 'full-width' ].includes( value );
			},
			default: 'medium',
		},
	},

	methods: {
		emitInputEvent( e: InputEvent ): void {
			/**
			 * contains user input, i.e. the contents of the input value
			 */
			this.$emit( 'input', ( e.target as HTMLInputElement ).value );
		},
	},

	computed: {
		classes(): string[] {
			const classes = [ 'wikit', 'wikit-TextInput', `wikit-TextInput--${this.width}` ];

			// TODO this will no longer be needed once FeedbackMessage is extracted too
			if ( this.error !== null ) {
				classes.push( `wikit-TextInput--${this.error.type}` );
			}

			return classes;
		},

		feedbackType(): string|null {
			return this.error && this.error.type || null;
		},
	},

	components: {
		Icon,
		Input,
	},
} );
</script>

<style lang="scss">
$base: ".wikit-TextInput";

#{$base} {
	display: block;

	#{$base}__error-message {
		font-family: $wikit-TextInput-error-message-font-family;
		font-size: $wikit-TextInput-error-message-font-size;
		font-weight: $wikit-TextInput-error-message-font-weight;
		line-height: $wikit-TextInput-error-message-line-height;
		padding-block-start: $wikit-TextInput-error-message-padding-block-start;
		display: inline-flex;
		align-items: flex-start;

		#{$base}__error-message__icon {
			// TODO: only introducing the following variable to work around exceeding stylelint max-len.
			// `stylelint-disable` is also not working for some reason. Fixing this in a follow-up.
			$padding-top: ( $wikit-TextInput-error-message-line-height - $wikit-TextInput-error-message-font-size ) / 2;

			padding-block-start: $padding-top;
			margin-inline-end: $wikit-TextInput-error-message-icon-margin-right;
		}
	}

	& #{$base}__label {
		color: $wikit-TextInput-label-font-color;
		padding-block-end: $wikit-TextInput-label-padding-block-end;
		font-family: $wikit-TextInput-label-font-family;
		font-size: $wikit-TextInput-label-font-size;
		font-weight: $wikit-TextInput-label-font-weight;
		line-height: $wikit-TextInput-label-line-height;
	}

	&--small {
		width: $wikit-TextInput-small-width;
	}

	&--medium {
		width: $wikit-TextInput-medium-width;
	}

	&--large {
		width: $wikit-TextInput-large-width;
	}

	&--full-width {
		width: $wikit-TextInput-full-width;
	}

	&--error #{$base}__error-message {
		color: $wikit-TextInput-error-message-error-color;
	}

	&--warning #{$base}__error-message {
		color: $wikit-TextInput-error-message-warning-color;
	}
}
</style>
