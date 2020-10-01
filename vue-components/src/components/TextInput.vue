<template>
	<label :class="classes">
		<div class="wikit-TextInput__label">{{ label }}</div>
		<input
			type="text"
			class="wikit-TextInput__input"
			:value="value"
			:placeholder="placeholder"
			:disabled="disabled"
		>
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

/**
 *  Text input fields are form elements that let users input and edit values in the form of text.
 */
export default Vue.extend( {
	name: 'TextInput',
	props: {
		error: {
			type: Object,
			validator( error: object ): boolean {
				return error === null ||
					[ 'warning', 'error' ].includes( error.type ) && typeof error.message === 'string';
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

	computed: {
		classes(): string[] {
			const classes = [ 'wikit', 'wikit-TextInput', `wikit-TextInput--${this.width}` ];

			if ( this.error !== null ) {
				classes.push( `wikit-TextInput--${this.error.type}` );
			}

			return classes;
		},
	},

	components: {
		Icon,
	},
} );
</script>

<style lang="scss">
$base: ".wikit-TextInput";

#{$base} {
	display: block;

	& #{$base}__input {
		color: $wikit-TextInput-input-color;
		border-color: $wikit-TextInput-input-border-color;
		border-style: $wikit-TextInput-input-border-style;
		border-width: $wikit-TextInput-input-border-width;
		border-radius: $wikit-TextInput-input-border-radius;
		font-family: $wikit-TextInput-input-font-family;
		font-size: $wikit-TextInput-input-font-size;
		font-weight: $wikit-TextInput-input-font-weight;
		line-height: $wikit-TextInput-input-line-height;
		width: 100%;
		box-sizing: border-box;
		padding-inline: $wikit-TextInput-input-desktop-padding-inline;
		padding-block: $wikit-TextInput-input-desktop-padding-block;
		transition-duration: $wikit-TextInput-input-transition-duration;
		transition-timing-function: $wikit-TextInput-input-transition-timing-function;
		transition-property: $wikit-TextInput-input-transition-property;

		// Sets a basis for the inset box-shadow transition which otherwise doesn't work in Firefox.
		// https://stackoverflow.com/questions/25410207/css-transition-not-working-on-box-shadow-property/25410897
		// Can this be defined in a more generic way?
		box-shadow: inset 0 0 0 1px transparent;

		@media (max-width: $width-breakpoint-mobile) {
			padding-inline: $wikit-TextInput-input-mobile-padding-inline;
			padding-block: $wikit-TextInput-input-mobile-padding-block;
		}

		&:disabled {
			color: $wikit-TextInput-input-disabled-color;
			border-color: $wikit-TextInput-input-disabled-border-color;
			background-color: $wikit-TextInput-input-disabled-background-color;
		}

		// should ideally be taken care of by the globally applied style reset (ress)
		// https://github.com/filipelinhares/ress/pull/24
		&:focus {
			outline: none;
		}
	}

	&:not(#{$base}--error):not(#{$base}--warning) {
		#{$base}__input:not(:disabled) {
			&:hover {
				border-color: $wikit-TextInput-input-hover-border-color;
			}

			&:focus,
			&:active {
				border-color: $wikit-TextInput-input-active-border-color;
				box-shadow: $wikit-TextInput-input-active-box-shadow;
			}
		}
	}

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
		color: $wikit-TextInput-input-color;
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

	&--error #{$base}__input {
		border-color: $wikit-TextInput-input-error-border-color;
	}

	&--warning #{$base}__input {
		border-color: $wikit-TextInput-input-warning-border-color;
	}

	&--error #{$base}__error-message {
		color: $wikit-TextInput-error-message-error-color;
	}

	&--warning #{$base}__error-message {
		color: $wikit-TextInput-error-message-warning-color;
	}
}
</style>
