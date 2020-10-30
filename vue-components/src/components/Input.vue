<template>
	<!-- re-emits the input event so that parent components can use `@input` instead of `@input.native` -->
	<input
		type="text"
		:class="classes"
		@input="$emit( 'input', $event.target.value )"
		:value="value"
	>
</template>

<script lang="ts">
import Vue from 'vue';

/**
 * This is an internal component, not to be confused with the TextInput system component, which is intended to be shared
 * between system components such as TextInput and Lookup that have an input field which should look and behave
 * identical.
 */
export default Vue.extend( {
	name: 'Input',
	props: {
		feedbackType: {
			type: String,
			validator( value: string|null ): boolean {
				return value === null ||
					[ 'warning', 'error' ].includes( value );
			},
			default: null,
		},
		value: {
			type: String,
			default: '',
		},
	},

	computed: {
		classes(): string[] {
			const classes = [ 'wikit', 'wikit-Input' ];

			if ( this.feedbackType ) {
				classes.push( `wikit-Input--${this.feedbackType}` );
			}

			return classes;
		},
	},
} );
</script>

<style lang="scss">
.wikit-Input {
	color: $wikit-Input-color;
	background-color: $wikit-Input-background-color;
	border-color: $wikit-Input-border-color;
	border-style: $wikit-Input-border-style;
	border-width: $wikit-Input-border-width;
	border-radius: $wikit-Input-border-radius;
	font-family: $wikit-Input-font-family;
	font-size: $wikit-Input-font-size;
	font-weight: $wikit-Input-font-weight;
	line-height: $wikit-Input-line-height;
	width: 100%;
	box-sizing: border-box;
	padding-inline: $wikit-Input-desktop-padding-inline;
	padding-block: $wikit-Input-desktop-padding-block;
	transition-duration: $wikit-Input-transition-duration;
	transition-timing-function: $wikit-Input-transition-timing-function;
	transition-property: $wikit-Input-transition-property;

	// Sets a basis for the inset box-shadow transition which otherwise doesn't work in Firefox.
	// https://stackoverflow.com/questions/25410207/css-transition-not-working-on-box-shadow-property/25410897
	// Can this be defined in a more generic way?
	box-shadow: inset 0 0 0 1px transparent;

	@media (max-width: $width-breakpoint-mobile) {
		padding-inline: $wikit-Input-mobile-padding-inline;
		padding-block: $wikit-Input-mobile-padding-block;
	}

	&:disabled {
		color: $wikit-Input-disabled-color;
		border-color: $wikit-Input-disabled-border-color;
		background-color: $wikit-Input-disabled-background-color;
	}

	// should ideally be taken care of by the globally applied style reset (ress)
	// https://github.com/filipelinhares/ress/pull/24
	&:focus {
		outline: none;
	}

	&:not(&--error):not(&--warning) {
		&:not(:disabled) {
			&:hover {
				border-color: $wikit-Input-hover-border-color;
			}

			&:focus,
			&:active {
				border-color: $wikit-Input-active-border-color;
				box-shadow: $wikit-Input-active-box-shadow;
			}
		}
	}

	&--error {
		border-color: $wikit-Input-error-border-color;
	}

	&--warning {
		border-color: $wikit-Input-warning-border-color;
	}
}
</style>
